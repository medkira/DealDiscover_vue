import './presentation/resources/assets/main.css'
import './presentation/resources/assets/style.css'
import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "primeicons/primeicons.css";


// @ts-ignore
import Lara from '@/presentation/resources/persets/lara'
import App from './app/App.vue'
import router from './presentation/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
});

app.mount('#app')
