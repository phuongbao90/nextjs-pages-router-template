import { GetProductsParams } from "../services/products/products.requests";
import qs from "qs";

export const API_ROUTES = {
  PRODUCTS: {
    BASE: "products",
    LIST: (params?: Required<GetProductsParams>) =>
      `${API_ROUTES.PRODUCTS.BASE}?${qs.stringify(params)}`,
    SEARCH: (params?: Required<GetProductsParams>) =>
      `${API_ROUTES.PRODUCTS.BASE}/search?${qs.stringify(params)}`,
    DETAIL: (id: string) => `${API_ROUTES.PRODUCTS.BASE}/${id}`,
    REVIEWS: (id: string) => `${API_ROUTES.PRODUCTS.BASE}/${id}/reviews`,
  },

  AUTH: {
    BASE: "auth",
    LOGIN: () => `${API_ROUTES.AUTH.BASE}/login`,
    REFRESH: () => `${API_ROUTES.AUTH.BASE}/refresh`,
  },

  USER: {
    BASE: "user",
    ME: () => `${API_ROUTES.USER.BASE}/me`,
  },
};
