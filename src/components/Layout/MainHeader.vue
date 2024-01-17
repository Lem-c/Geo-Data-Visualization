<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template  v-slot:navbar-menu>
      <nav-link v-if="$route.path !== '/about'" to="/about">
        <i class="now-ui-icons business_chart-pie-36"></i> About
      </nav-link>
      <nav-link v-else to="/">
        <i class="now-ui-icons objects_globe"></i> Home
      </nav-link>
    </template>
  </navbar>
</template>

<script>
import { Navbar, NavLink } from '@/components';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    Navbar,
    NavLink
  }
};
</script>

<style scoped></style>