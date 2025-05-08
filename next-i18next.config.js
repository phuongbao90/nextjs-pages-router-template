const commonEn = require("./public/locales/en/common.json");
const commonVi = require("./public/locales/vi/common.json");
const productsEn = require("./public/locales/en/products.json");
const productsVi = require("./public/locales/vi/products.json");
const checkoutEn = require("./public/locales/en/checkout.json");
const checkoutVi = require("./public/locales/vi/checkout.json");
const accountEn = require("./public/locales/en/account.json");
const accountVi = require("./public/locales/vi/account.json");
const supportEn = require("./public/locales/en/support.json");
const supportVi = require("./public/locales/vi/support.json");

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "vi",
    localeDetection: false,
  },
  fallbackLng: "vi",
  debug: process.env.NODE_ENV === "development",
  ns: ["common", "products", "checkout", "account", "support"],
  resources: {
    en: {
      common: commonEn,
      products: productsEn,
      checkout: checkoutEn,
      account: accountEn,
      support: supportEn,
    },
    vi: {
      common: commonVi,
      products: productsVi,
      checkout: checkoutVi,
      account: accountVi,
      support: supportVi,
    },
  },

  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
};
