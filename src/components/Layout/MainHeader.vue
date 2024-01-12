<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template  v-slot:navbar-menu>
      <nav-link to="/about">
          <i class="now-ui-icons business_chart-pie-36"></i> About
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