import { createApp } from 'vue';
import App from './App.vue';

// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';

import NowUiKit from './plugins/now-ui-kit';

createApp(App)
  .use(router) // Use the router
  .use(NowUiKit) // Use the 3rd party lib
  .mount('#app');
