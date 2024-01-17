import { createApp } from 'vue';
import App from './App.vue';

// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';

import NowUiKit from './plugins/now-ui-kit';

// LeafFlet map css
import 'leaflet/dist/leaflet.css';
import './assets/css/globalStyle.css';
import 'mapbox-gl/dist/mapbox-gl.css'

createApp(App)
  .use(router) // Use the router
  .use(NowUiKit) // Use web UI design pack
  .mount('#app');
