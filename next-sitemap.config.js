/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.mysite.com",
  generateRobotsTxt: true, // (robots.txt)
  sitemapSize: 7000, // split if >10k URLs
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/secret/*"],
};
