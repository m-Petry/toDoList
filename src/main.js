import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(VueApexCharts);
app.mount('#app');
