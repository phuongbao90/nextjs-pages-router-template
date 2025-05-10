import Head from "next/head";
import { useRouter } from "next/router";

interface ProductSEOProps {
  title?: string;
  description?: string;
  image?: string;
  price?: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  brand?: string;
  sku?: string;
  category?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export function ProductSEO({
  title = "eSIM Products - Global Data Plans",
  description = "Discover our range of eSIM products offering global data plans for seamless connectivity worldwide. Instant activation, competitive prices, and reliable coverage.",
  image = "/images/esim-og-image.jpg", // Default OG image
  price,
  currency = "USD",
  availability = "InStock",
  brand = "Your Brand Name",
  sku,
  category = "eSIM",
  keywords = [
    "eSIM",
    "global data",
    "travel internet",
    "mobile data",
    "international roaming",
  ],
  noindex = false,
  nofollow = false,
}: ProductSEOProps) {
  const router = useRouter();
  const canonicalUrl = `https://yourdomain.com${router.asPath}`;

  // Construct structured data for product
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    category,
    sku,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: canonicalUrl,
    },
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Robots Meta */}
      <meta
        name="robots"
        content={`${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="product:price:amount" content={price?.toString()} />
      <meta property="product:price:currency" content={currency} />
      <meta property="product:availability" content={availability} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
}
