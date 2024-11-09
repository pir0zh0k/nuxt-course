// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "dayjs-nuxt",
    "nuxt-typed-router",
    "nuxt-file-storage",
    "nuxt-auth-utils",
    "@nuxt/icon",
  ],
  fonts: {
    families: [{ name: "montserrat", provider: "google" }],
  },
  fileStorage: {
    mount: "public/files/",
  },
  css: ["~/assets/scss/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_vars.scss" as *;
            @use "~/assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
  },
});
