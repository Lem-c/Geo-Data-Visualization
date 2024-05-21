<script setup>
import { onMounted } from "vue";

// Sections components
import BaseLayout from "../../components/BaseLayout.vue";
import View from "../../components/View.vue";

import IndMap from "./components/StationTemp.vue"
// Headers page components codes
import { header1Code } from "./components/codes";

// nav-pills
import setNavPills from "@/assets/js/nav-pills.js";

// hook
onMounted(() => {
  setNavPills();
});
</script>

<template>
  <BaseLayout
    title="Station temperature overview"
    :breadcrumb="[
      { label: 'Pages', route: '/' },
      { label: 'UK Stations' },
    ]"
  >
    <View title="View" :code="header1Code" id="header-1">
      <IndMap />
    </View>
  </BaseLayout>
</template>
