import { API_ROUTES } from "../../constants/api-routes";
import { apiClient } from "../api-client";
import { Product, ProductListResponse } from "./products.types";

export interface GetProductsParams {
  q?: string;
  limit?: number;
  skip?: number;
}

export const getProducts = async (params: Required<GetProductsParams>) => {
  const searchParams = new URLSearchParams();

  if (params?.q) {
    searchParams.append("q", params.q);
  } else {
    searchParams.delete("q");
  }
  if (params?.limit) {
    searchParams.append("limit", params.limit.toString());
  }
  if (params?.skip) {
    searchParams.append("skip", params.skip.toString());
  }

  const queryString = searchParams.toString();
  const url = queryString
    ? API_ROUTES.PRODUCTS.SEARCH(params)
    : API_ROUTES.PRODUCTS.LIST(params);

  const response = await apiClient.get(url).json<ProductListResponse>();

  return response;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await apiClient
    .get(API_ROUTES.PRODUCTS.DETAIL(id.toString()))
    .json<Product>();
  return response;
};
