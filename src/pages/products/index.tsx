import { GetServerSideProps } from "next";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { PRODUCTS_KEYS } from "../../services/products/products.keys";
import { useGetProducts } from "../../services/products/products.hooks";
import { ProductListResponse } from "../../services/products/products.types";
import { useDebounce } from "../../hooks/use-debounce";
import { getProducts } from "../../services/products/products.requests";
import { normalizeProductParams } from "../../services/products/products.utils";
import { ProductCard } from "../../components/products/product-card";
import { useQueryState } from "nuqs";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });
  const debouncedSearch = useDebounce(searchQuery, 800);
  const { data, isLoading, error } = useGetProducts({
    q: debouncedSearch,
    limit: 10,
    skip: 0,
  });

  return (
    <>
      <Head>
        <title>Our Products | Your Company Name</title>
        <meta
          name="description"
          content="Browse our collection of high-quality products. Find the perfect item for your needs."
        />
        <meta property="og:title" content="Our Products | Your Company Name" />
        <meta
          property="og:description"
          content="Browse our collection of high-quality products. Find the perfect item for your needs."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Products
              </h1>
              <p className="mt-4 text-base text-gray-500">
                Browse our collection of high-quality products. Find the perfect
                item for your needs.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search products..."
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <span className="text-gray-400 hover:text-gray-500">×</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data?.products?.map((product) => (
              <ProductCard key={product.id} href={`/products/${product.id}`}>
                <ProductCard.Image
                  src={product.images[0]}
                  alt={product.title}
                />
                <ProductCard.Content>
                  <ProductCard.Title>{product.title}</ProductCard.Title>
                  <ProductCard.Price>
                    ${product.price.toFixed(2)}
                  </ProductCard.Price>
                  <ProductCard.Description>
                    {product.description}
                  </ProductCard.Description>
                </ProductCard.Content>
              </ProductCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
  const queryClient = new QueryClient();

  console.log("locale getServerSideProps ", locale);

  const normalizedParams = normalizeProductParams({
    q: query.search as string,
    limit: query.limit ? Number(query.limit) : undefined,
    skip: query.skip ? Number(query.skip) : undefined,
  });

  // console.log("normalizedParams getserver ", normalizedParams);

  // Prefetch products data with search parameters
  await queryClient.prefetchQuery({
    queryKey: PRODUCTS_KEYS.LIST(normalizedParams),
    queryFn: () => getProducts(normalizedParams),
  });

  // Get the dehydrated state
  const dehydratedState = dehydrate(queryClient);

  // Get the products data
  const data = queryClient.getQueryData(
    PRODUCTS_KEYS.LIST(normalizedParams)
  ) as ProductListResponse;

  return {
    props: {
      dehydratedState,
      data,
    },
  };
};
