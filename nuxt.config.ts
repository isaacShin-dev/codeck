// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable devtools
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  modules: [
    '@invictus.codes/nuxt-vuetify',
  ],
  vuetify: {
    vuetifyOptions: {
    },
    moduleOptions: {
      treeshaking: true,
      useIconCDN: true,
      autoImport: true
    }
  },
})
