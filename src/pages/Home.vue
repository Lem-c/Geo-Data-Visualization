<template>
  <div>
    <div class="page-header clear-filter" filter-color="white">
      <header-image
        class="page-header-image"
        style="background-image:url('/img/niceView1.jpg')"
      >
      </header-image>
      <div class="container">

        <div class="content-center brand">
          <!--<img class="n-logo" src="img/now-logo.png" alt="" /> -->
          <h1 class="h1-seo">Now UI Kit.</h1>
        </div>

        <h6 class="category category-absolute">
          Designed by bootstrap.
        </h6>
      </div>  
    </div>

    <div class="main">
      <div class="container text-center">
        <div class="row justify-content-md-center">
          <div class="col-md-12 col-lg-8">
            <h2 class="title">Title</h2>
            <h5 class="description">
              TEXT TEXT TEXT TEXT
            </h5>
          </div>
        </div>
      </div>
    </div>

    <HeightMap></HeightMap>
    
  </div>
</template>

<script>
import HeaderImage from "@/components/Tools/HeaderImage.vue";
import HeightMap from "@/components/Layout/HeightMap.vue";

export default {
  name: 'Home-page',
  bodyClass: 'index-page',
  components: {
    HeaderImage,
    HeightMap,
  },
};
</script>
