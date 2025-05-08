import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { PRODUCTS_KEYS } from "../../services/products/products.keys";
import {
  getProduct,
  getProducts,
} from "../../services/products/products.requests";
import { useGetProduct } from "../../services/products/products.hooks";
import { Product } from "../../services/products/products.types";
import { formatCurrency } from "../../utils/format";

interface ProductDetailPageProps {
  data: Product;
}

export default function ProductDetailPage({
  data: initialData,
}: ProductDetailPageProps) {
  const { data: product } = useGetProduct(initialData.id, {
    initialData,
  });

  if (!product) return null;

  return (
    <>
      <Head>
        <title>{product.title} | Your Company Name</title>
        <meta name="description" content={product.description} />
        <meta
          property="og:title"
          content={`${product.title} | Your Company Name`}
        />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        {product.images[0] && (
          <meta property="og:image" content={product.images[0]} />
        )}
      </Head>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <div className="flex flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <div
                      key={image}
                      className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        src={image}
                        alt={`${product.title} - Additional view`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main image */}
              <div className="aspect-square w-full">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {formatCurrency(product.price)}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className={`h-5 w-5 flex-shrink-0 ${
                          product.rating > rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {product.rating} out of 5 stars
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base text-gray-700">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    Category:
                  </h3>
                  <p className="ml-2 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <h3 className="text-sm font-medium text-gray-900">Brand:</h3>
                  <p className="ml-2 text-sm text-gray-500">{product.brand}</p>
                </div>
                <div className="flex items-center mt-2">
                  <h3 className="text-sm font-medium text-gray-900">Stock:</h3>
                  <p className="ml-2 text-sm text-gray-500">
                    {product.stock} units
                  </p>
                </div>
              </div>

              <div className="mt-10 flex">
                <button
                  type="button"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all product IDs at build time
  const products = await getProducts({ limit: 100, q: "", skip: 0 }); // Adjust limit based on your needs

  const paths = products.products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // Show a loading state while generating new pages
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const productId = params?.id as string;

  try {
    // Prefetch product data
    await queryClient.prefetchQuery({
      queryKey: PRODUCTS_KEYS.DETAIL(Number(productId)),
      queryFn: () => getProduct(Number(productId)),
    });

    // Get the dehydrated state
    const dehydratedState = dehydrate(queryClient);

    // Get the product data
    const data = queryClient.getQueryData(
      PRODUCTS_KEYS.DETAIL(Number(productId))
    ) as Product;

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        dehydratedState,
        data,
      },
      // Revalidate the page every hour
      revalidate: 3600,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
