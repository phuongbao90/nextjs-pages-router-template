import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    // Redirect to login page after 5 seconds
    const timeout = setTimeout(() => {
      router.replace("/auth/login");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error || "An error occurred during authentication"}
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Redirecting to login page...
          </p>
        </div>
      </div>
    </div>
  );
}
