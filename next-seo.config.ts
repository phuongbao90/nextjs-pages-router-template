import { DefaultSeoProps } from "next-seo";

export const SEO: DefaultSeoProps = {
  titleTemplate: "%s | MySite",
  defaultTitle: "MySite",
  description: "Your go-to site for …",
  canonical: "https://www.mysite.com",
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://www.mysite.com",
    site_name: "MySite",
    images: [
      { url: "/og-default.jpg", width: 1200, height: 630, alt: "MySite" },
    ],
  },
  twitter: {
    handle: "@mysite",
    site: "@mysite",
    cardType: "summary_large_image",
  },
};
