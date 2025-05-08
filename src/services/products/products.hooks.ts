import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_KEYS } from "./products.keys";
import { Product, ProductListResponse } from "./products.types";
import {
  getProduct,
  getProducts,
  GetProductsParams,
} from "./products.requests";
import { normalizeProductParams } from "./products.utils";

export const useGetProducts = (params?: GetProductsParams) => {
  const normalizedParams = normalizeProductParams(params);
  // console.log("normalizedParams useGetProducts ", normalizedParams);
  return useQuery<ProductListResponse, Error, ProductListResponse>({
    queryKey: PRODUCTS_KEYS.LIST(normalizedParams),
    queryFn: () => getProducts(normalizedParams),
  });
};

export const useGetProduct = (
  id: number,
  options?: { initialData?: Product }
) => {
  return useQuery<Product, Error, Product>({
    queryKey: PRODUCTS_KEYS.DETAIL(id),
    queryFn: () => getProduct(id),
    ...(options?.initialData ? { initialData: options.initialData } : {}),
  });
};
