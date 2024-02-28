// router.js
import { createRouter, createWebHashHistory  } from 'vue-router';

const MainHeader = import("./components/Layout/MainHeader.vue")
const MainFooter = import("./components/Layout/MainFooter.vue")
const Home = import("./pages/Home.vue")
const GlobalMap = import('./pages/GlobalMapView.vue')

const routes = [
  {
    path: '/',
    name: 'index',
    components: { default: Home, header: MainHeader, footer: MainFooter},
    props: {
      header: { colorOnScroll: 500 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/about',
    name: 'About', 
    components: { default: GlobalMap},
    props: {
      header: { colorOnScroll: 400 },
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
