// const path  = require('path')
// @ts-ignore
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-icon",
    "nuxt-aos",
    "@vueuse/motion/nuxt",
    "@vueuse/sound/nuxt",
  ],
  app: {
    baseURL: "/w-blog/",
    buildAssetsDir:'nuxt_assets',
    head: {
      title: "凪.Blog",
      link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
    },
  },
  devtools: { enabled: false },
  // nitro:{
  //   output:{
  //     publicDir: path.join(__dirname,'docs')
  //   }
  // },
  devServer: {
    port: 5527,
  },
  vite: {
    optimizeDeps: {
      include: ["howler"],
    },
  },
  experimental: {
    payloadExtraction: false
  },
});
