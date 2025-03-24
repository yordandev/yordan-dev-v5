// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      title: "Yordan Atanasov",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "icon", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", sizes: "16x16", href: "/favicon-16x16.png" },
      ],
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
  ],
  fonts: {
    families: [
      {
        name: "Inter",
        provider: "bunny",
      },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
  },
});
