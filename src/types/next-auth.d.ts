import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken: string;
      refreshToken: string;
      image?: string | null;
      accessTokenExpiresTimestamp: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string; // built‐in, maps to user.id
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresTimestamp: number;
  }
}
