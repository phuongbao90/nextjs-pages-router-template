import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return router.pathname === path;
    }
    return router.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div
        className={`bg-indigo-600 text-white transition-all duration-300 ${
          isScrolled ? "h-0 overflow-hidden" : "h-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <p className="text-sm font-medium">Welcome to our platform! 🎉</p>
        </div>
      </div>

      {/* Header */}
      <header
        className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              passHref
              prefetch={false}
              className="flex items-center"
            >
              <span className="text-xl font-bold text-gray-900">
                {/* <a>Your Logo</a> */}
                Your Logo
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href={ROUTES.DASHBOARD}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(ROUTES.DASHBOARD)
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href={ROUTES.PRODUCTS.LIST()}
                passHref
                prefetch={false}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(ROUTES.PRODUCTS.LIST())
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Products
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <Link
                    href="/profile"
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive("/profile")
                        ? "text-indigo-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Profile
                  </Link>
                  <span className="text-sm text-gray-700">
                    Welcome, {session.user?.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={ROUTES.AUTH.LOGIN}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(ROUTES.AUTH.LOGIN)
                        ? "text-indigo-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Sign in
                  </Link>
                  <Link
                    href={ROUTES.AUTH.REGISTER}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
