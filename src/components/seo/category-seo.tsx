import Head from "next/head";
import { useRouter } from "next/router";

interface CategorySEOProps {
  title?: string;
  description?: string;
  image?: string;
  category: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  region?: string;
  dataPlans?: string[];
}

export function CategorySEO({
  title,
  description,
  image = "/images/category-og-image.jpg",
  category,
  keywords = [],
  noindex = false,
  nofollow = false,
  region,
  dataPlans = [],
}: CategorySEOProps) {
  const router = useRouter();
  const canonicalUrl = `https://yourdomain.com${router.asPath}`;

  // Generate default title and description if not provided
  const defaultTitle = `${category} eSIM Plans${region ? ` for ${region}` : ""} - Global Data Coverage`;
  const defaultDescription = `Explore our ${category.toLowerCase()} eSIM plans${region ? ` for ${region}` : ""}. Instant activation, reliable coverage, and competitive prices for your travel needs.`;

  // Construct structured data for category page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title || defaultTitle,
    description: description || defaultDescription,
    image,
    url: canonicalUrl,
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
    about: {
      "@type": "Thing",
      name: category,
      description: description || defaultDescription,
    },
  };

  // Combine default keywords with provided ones
  const defaultKeywords = [
    "eSIM",
    "data plans",
    category.toLowerCase(),
    ...(region ? [region.toLowerCase()] : []),
    ...dataPlans,
  ];
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={allKeywords.join(", ")} />

      {/* Robots Meta */}
      <meta
        name="robots"
        content={`${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
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
