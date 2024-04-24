import './presentation/resources/assets/main.css'
import './presentation/resources/assets/style.css'
import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';

// @ts-ignore
import Lara from '@/presentation/resources/persets/lara'
import App from './app/App.vue'
import router from './presentation/router'

import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
});

app.use(AOS.init)

app.use(ToastService);
app.mount('#app')
