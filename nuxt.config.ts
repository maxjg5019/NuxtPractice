// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro:{
    plugins:['@/server/index']
  },
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URL,
  },
  typescript: { typeCheck: true },
});
