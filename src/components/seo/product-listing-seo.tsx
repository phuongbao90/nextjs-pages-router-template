import Head from "next/head";
import { useRouter } from "next/router";

interface ProductListingSEOProps {
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  totalProducts?: number;
  currentPage?: number;
  totalPages?: number;
}

export function ProductListingSEO({
  title = "eSIM Data Plans - Global Coverage",
  description = "Browse our comprehensive collection of eSIM data plans for global travel. Find the perfect plan for your destination with instant activation and competitive prices.",
  image = "/images/esim-listing-og-image.jpg",
  category = "eSIM Plans",
  keywords = [
    "eSIM plans",
    "global data plans",
    "travel internet",
    "international data",
    "roaming plans",
  ],
  noindex = false,
  nofollow = false,
  totalProducts,
  currentPage = 1,
  totalPages = 1,
}: ProductListingSEOProps) {
  const router = useRouter();
  const canonicalUrl = `https://yourdomain.com${router.asPath}`;

  // Construct structured data for product listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    image,
    url: canonicalUrl,
    numberOfItems: totalProducts,
    isPartOf: {
      "@type": "WebSite",
      name: "Your eSIM Store",
      url: "https://yourdomain.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://yourdomain.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category,
          item: canonicalUrl,
        },
      ],
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

      {/* Pagination Meta Tags */}
      {currentPage > 1 && (
        <link rel="prev" href={`${canonicalUrl}?page=${currentPage - 1}`} />
      )}
      {currentPage < totalPages && (
        <link rel="next" href={`${canonicalUrl}?page=${currentPage + 1}`} />
      )}

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

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
