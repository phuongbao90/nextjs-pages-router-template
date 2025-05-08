import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, refreshToken } from "../../../services/auth/auth.requests";
import { tryCatch } from "../../../utils/try-catch";

const EXPIRES_IN_MINUTES = 10;

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const [error, user] = await tryCatch(
          login({
            username: credentials.username,
            password: credentials.password,
            expiresInMins: EXPIRES_IN_MINUTES,
          })
        );

        if (error) {
          throw new Error("Failed to authenticate");
        }

        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpiresTimestamp:
            Date.now() + EXPIRES_IN_MINUTES * 60 * 1000,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days => will logout no matter what
    maxAge: 1000 * 60 * 10, // 10 minutes
    updateAge: 1000 * 60 * 5, // 5 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.accessTokenExpiresTimestamp = (
          user as any
        ).accessTokenExpiresTimestamp;
      }

      // 2) If we’re still before expiry, just return token
      if (Date.now() < token.accessTokenExpiresTimestamp) {
        return token;
      }

      // 3) If we’re past expiry, refresh the token
      const [error, refreshedToken] = await tryCatch(
        refreshToken({
          refreshToken: token.refreshToken,
          expiresInMins: EXPIRES_IN_MINUTES,
        })
      );

      if (error) {
        console.error("Failed to refresh token", error);
        throw new Error("Failed to refresh token");
      }

      token.accessToken = refreshedToken.accessToken;
      token.refreshToken = refreshedToken.refreshToken;
      token.accessTokenExpiresTimestamp =
        Date.now() + EXPIRES_IN_MINUTES * 60 * 1000;

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.accessTokenExpiresTimestamp =
        token.accessTokenExpiresTimestamp;
      return session;
    },
  },
};

export default NextAuth(authOptions);
