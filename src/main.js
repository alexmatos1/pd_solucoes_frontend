import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/main.css'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8000/api/';

app.use(router)

app.mount('#app')
