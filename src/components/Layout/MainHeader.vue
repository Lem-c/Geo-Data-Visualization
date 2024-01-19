<template>
  <Navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link class="navbar-brand" to="/"
      @mouseenter="openPopover"
      @mouseleave="closePopover">
        Now Ui Kit
      </router-link>
      
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Designed by Invision. Coded by Creative Tim
        </div>
      </el-popover>
    </template>

    <template  v-slot:navbar-menu>
      <!-- <nav-link to="/" class="navbar-nav">
        <i class="now-ui-icons files_box"></i> Data
      </nav-link> -->

      <drop-down
        tag="li"
        title="Components"
        icon="now-ui-icons design_app"
        class="nav-item"
      >
        <nav-link v-if="$route.path !== '/about'" to="/about">
          <i class="now-ui-icons business_chart-pie-36"></i> 
          <p>About</p>
        </nav-link>
        <nav-link v-else to="/">
          <i class="now-ui-icons objects_globe"></i>
          <p>Home</p>
        </nav-link>
      </drop-down>
    </template>
  </Navbar>
</template>

<script>
import { Navbar, NavLink, DropDown } from '@/components';

export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    Navbar,
    NavLink,
    DropDown
  },
  methods: {
    openPopover() {
      this.$refs.popover1.show();
    },
    closePopover() {
      this.$refs.popover1.hide();
    }
  }
};
</script>

<style scoped></style>