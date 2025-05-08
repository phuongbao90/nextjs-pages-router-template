import { GetProductsParams } from "./products.requests";

const DEFAULT_PARAMS: Required<GetProductsParams> = {
  q: "",
  limit: 10,
  skip: 0,
};

export function normalizeProductParams(
  params?: GetProductsParams
): Required<GetProductsParams> {
  if (!params) return DEFAULT_PARAMS;

  return {
    q: params.q ?? DEFAULT_PARAMS.q,
    limit: params.limit ?? DEFAULT_PARAMS.limit,
    skip: params.skip ?? DEFAULT_PARAMS.skip,
  };
}
