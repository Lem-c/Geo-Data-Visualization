// router.js
import { createRouter, createWebHistory } from 'vue-router';

const MainNavbar = import("./components/Layout/MainHeader.vue")
const Home = import("./pages/Home.vue")
const About = import('./pages/About.vue')

const routes = [
  {
    path: '/',
    name: 'index',
    components: { default: Home, header: MainNavbar},
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  { path: '/about', name: 'About', component: About },
   
//   {
//     path: '/landing',
//     name: 'landing',
//     components: { default: Landing, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 },
//       footer: { backgroundColor: 'black' }
//     }
//   },
//   {
//     path: '/login',
//     name: 'login',
//     components: { default: Login, header: MainNavbar },
//     props: {
//       header: { colorOnScroll: 400 }
//     }
//   },
//   {
//     path: '/profile',
//     name: 'profile',
//     components: { default: Profile, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 },
//       footer: { backgroundColor: 'black' }
//     }
//   }
];

const router = createRouter({
  history: createWebHistory(),
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
