import { GetProductsParams } from "./products.requests";
import { normalizeProductParams } from "./products.utils";

export const PRODUCTS_KEYS = {
  BASE: "products",
  LIST: (params?: Required<GetProductsParams>) => [
    "products",
    "list",
    normalizeProductParams(params),
  ],
  DETAIL: (id: number) => ["products", "detail", id],
} as const;
