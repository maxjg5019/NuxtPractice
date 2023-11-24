// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  typescript: { typeCheck: true },
});
