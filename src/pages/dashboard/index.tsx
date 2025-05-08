import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { ProtectedRoute } from "../../components/auth/protected-route";

export default function Dashboard() {
  const { data: session } = useSession();

  const { t } = useTranslation();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-4 text-gray-600">
            {t("hello")} {session?.user?.name}!
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
