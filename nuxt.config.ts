export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@ant-design-vue/nuxt', '@pinia/nuxt'],
  nitro: {
    plugins: ['@/server/index'],
  },
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URL,
  },
  typescript: { typeCheck: true },
});
