<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">

      <div class="container">

        <TempMap></TempMap>

        <h6 class="category category-absolute">
          Designed by bootstrap.
        </h6>

      </div>  
    
    </div>
  </div>
</template>

<script>
// import LMap from 'leaflet'
// import CardHolder from '@/components/Tools/CardHolder.vue';
import TempMap from "@/components/Layout/TemMap.vue"

export default {
  name: 'global-map',
  components:{
    TempMap
  }
};
</script>