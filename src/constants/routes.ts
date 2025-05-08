export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT: "/auth/forgot-password",
  },
  DASHBOARD: "/dashboard",
  PROFILE: (userId: string) => `/users/${userId}`,
  PRODUCTS: {
    LIST: () => "/products",
    DETAIL: (productId: string) => `/products/${productId}`,
  },
};
