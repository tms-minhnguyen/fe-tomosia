import './assets/styles/index.css'
import { createApp } from 'vue'
import 'dayjs/locale/ja'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store/loading'
import Store from './store/index'
const app = createApp(App)
app.use(router).use(Store).use(ElementPlus).mount('#app')
app.config.devtools = true;