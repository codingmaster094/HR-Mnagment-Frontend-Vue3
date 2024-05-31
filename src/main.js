import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import createPinia here
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance
app.use(pinia); // Use Pinia
app.use(router);
app.mount('#app');
