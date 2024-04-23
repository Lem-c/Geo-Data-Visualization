<script setup>
import NavbarMap from "@/examples/navbars/NavbarMap.vue";
import CenteredFooter from "@/examples/footers/FooterDefault.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";

defineProps({
  breadcrumb: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <NavbarMap light />
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-12 mx-auto">
        <div class="mb-4 w-100 w-md-50 w-lg-50">
          <Breadcrumbs :routes="breadcrumb" />
          <h3>{{ title }}</h3>
        </div>

        <slot />
      </div>
    </div>
  </div>
  <CenteredFooter />
</template>
