import { createApp } from 'vue';

import App from './App.vue';
import './assets/index.css';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
