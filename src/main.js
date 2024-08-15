import './assets/main.css';
import { createApp } from 'vue';


import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

const backendUrl = import.meta.env.VITE_BACKEND_URL;

app.config.globalProperties.$backendUrl = backendUrl;

// if block to use with every console logs
if (process.env.NODE_ENV !== 'production') {

    console.log('dev mode');
    console.log('backendUrl: ', backendUrl);

}

app.use(router);
app.use(store);

app.mount('#app');
