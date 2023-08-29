// https://nuxt.com/docs/api/configuration/nuxt-config
import { env } from 'process';
import appconfig from './env.json';

export default defineNuxtConfig({
  components: {
    global: false
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'SP App - экосистема сервисов для #СП',
      htmlAttrs: {
        lang: 'ru'
      },
      link: [
        { rel: 'preconnect', href: appconfig.production.backendUrl },
        { rel: 'dns-prefetch', href: appconfig.production.backendUrl }
      ]
    },
    meta: [
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'SP App' }
    ]
  },

  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'dayjs-nuxt'],

  dayjs: {
    locales: ['ru'],
    plugins: ['relativeTime', 'utc', 'timezone', 'customParseFormat', 'localizedFormat', 'duration'],
    defaultLocale: 'ru'
  },

  css: ['primevue/resources/primevue.css', 'primeicons/primeicons.css', 'normalize.css/normalize.css', '@/assets/style/main.scss'],

  build: {
    transpile: ['primevue']
  },

  runtimeConfig: {
    public: process.env.NODE_ENV === 'production' ? appconfig.production : appconfig.development
  },

  experimental: {
    headNext: true
  },

  devtools: {
    enabled: false
  }
});
