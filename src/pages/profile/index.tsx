import { getSession } from "next-auth/react";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { GetServerSideProps } from "next";
import { ROUTES } from "../../constants/routes";
import { getMyProfile } from "../../services/auth/auth.requests";
import { Profile } from "../../services/auth/auth.types";

export default function ProfilePage({ profile }: { profile: Profile }) {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Username</div>
              <p className="mt-1">{profile?.firstName}</p>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Email</div>
              <p className="mt-1">{profile?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: ROUTES.AUTH.LOGIN,
        permanent: false,
      },
    };
  }

  const profile = await getMyProfile(session.user.accessToken);

  return {
    props: {
      session,
      profile,
    },
  };
};
