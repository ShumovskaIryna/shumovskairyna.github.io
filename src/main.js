import { createApp } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import { languages, defaultLocale } from './i18n/index.js'
import App from './App.vue'
import router from './router'

import store from './store'

const messages = Object.assign(languages)
const localeStorageLang = localStorage.getItem('lang')

const i18n = createI18n({
  legacy: false,
  locale: localeStorageLang || defaultLocale,
  fallbackLocale: 'uk',
  messages
})

createApp(App,
  {
    setup () {
      const { t } = useI18n()
      return { t }
    }
  })
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
