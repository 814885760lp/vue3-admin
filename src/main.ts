import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import registerApp from '@/global/index'
import { setupStore } from '@/store/index'
import './assets/css/index.less'
import 'normalize.css'

const app = createApp(App)
app.use(registerApp)
app.use(store)
setupStore()
app.use(router)
app.mount('#app')
