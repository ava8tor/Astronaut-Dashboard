import './assets/main.css'
// Variable overrides first

// Then import Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/chart.js"

import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios';

import { createPinia } from 'pinia'

const app = createApp(App);

const pinia = createPinia();

app.use(VueAxios, axios);
app.use(pinia);
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.mount('#app')
