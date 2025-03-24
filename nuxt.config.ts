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
      title: "Yordan Atanasov - Software Engineer",
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
        { rel: "canonical", href: "https://yordan.dev" },
        { rel: "alternate", hreflang: "en", href: "https://yordan.dev" },
      ],
      meta: [
        {
          name: "description",
          content:
            "Software engineer building web and mobile apps, focusing on user experience. Currently at GetAccept, passionate about technology, design, and continuous learning.",
        },
        {
          name: "keywords",
          content:
            "Yordan Atanasov, software engineer, web development, mobile apps, user experience, product design, technology, Sweden, GetAccept, cycling, coffee, infrastructure",
        },
        { name: "author", content: "Yordan Atanasov" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Yordan Atanasov",
            jobTitle: "Software Engineer",
            worksFor: {
              "@type": "Organization",
              name: "GetAccept",
            },
            sameAs: [
              "https://bsky.app/profile/yordan.dev",
              "https://github.com/yordandev",
              "https://www.linkedin.com/in/yordandev/",
            ],
            interests: [
              "Web Development",
              "Mobile Apps",
              "User Experience",
              "Product Design",
              "Coffee",
              "Cats",
              "Cycling",
              "Infrastructure Systems",
            ],
          }),
        },
      ],
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "@nuxt/scripts",
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
  $production: {
    scripts: {
      registry: {
        umamiAnalytics: {
          websiteId: "b9cd43b2-a85a-497f-aaf9-09507cb06e8d",
        },
      },
    },
  },
});
