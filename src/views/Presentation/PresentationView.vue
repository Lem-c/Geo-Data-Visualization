<script setup>
import { onMounted, onUnmounted, ref } from "vue";

//example components
import NavbarMap from "../..//examples/navbars/NavbarMap.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
import FilledInfoCard from "../../examples/cards/infoCards/FilledInfoCard.vue";
import TradeMap2 from "../../examples/TradeMap2.vue";

//images
import vueMkHeader from "@/assets/img/ui-bg.jpg";
import wavesWhite from "@/assets/img/waves-white.svg";
import TableauDashboardLineExportGoods from "../../components/TableauDashboardLineExportGoods.vue";
import TableauDashboardLineImportGoods from "../../components/TableauDashboardLineImportGoods.vue"
import TableauDashboardPieExport from "../../components/TableauDashboardPieExport.vue";
import TableauDashboardPieImport from "../../components/TableauDashboardPieImport.vue"
import LondonEco from "../../examples/LondonEco.vue";
import LucyTableau from "../../components/LucyTableau.vue";
import ClickSlider from "../../components/ClickSlider.vue";

//hooks
const body = document.getElementsByTagName("body")[0];

const isExportMode = ref(true); 
const chartsVisible = ref(false);

const toggleCharts = () => {
  chartsVisible.value = !chartsVisible.value;
};

onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-black");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-black");
});
</script>

<template>

  


  <div class="container-fluid position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarMap :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div
      class="page-header min-vh-75"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
    <div class="container">
        <div class="row">
          <div class="col-lg-9 text-center mx-auto position-relative">
            <h1
              class="text-black pt-3 me-2 display-5 fw-bold"
              :style="{ display: 'inline-block', marginTop: '-200px' }"
            >
            UK's Economic Horizons
            </h1>
            <p class="lead text-dark px-5 mt-3 mb-10" :style="{ fontWeight: '400' }">
              Interactive dashboards navigating the trajectories of trade and economic resilience at 3 geographic levels
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div 
  class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6"
  id="text-section"
  >
    <ClickSlider />
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-2 mt-5">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <p></p>
          <h2 class="text-center mb-4">Using this Website</h2>
          <p class="lead text-center">This website utilizes a series of dashboards, visual elements, and interactive maps in order for you to detect patterns, analyze trends, and uncover the economic well-being of the UK over <b>time</b>.</p>
          <p class="lead text-center">This site is divided into 3 sections, representing <b>3 geographic levels</b>. This allows us to best understand the economic inbalances across the UK's diverse economic landscapes. You'll begin with an <b>international</b> outlook at the UK's trade relations with the world, continued by a breakdown of the impacts on a <b>subnational</b> level. You'll quickly notice how a certain region (London) dominates the economic makeup of the country, thus you'll finish with a <b>local</b> view on the specifics.</p>
        </div>
      </div>
    </div>
  </div>
  


  <div class="card card-body blur shadow-blur mx-3 mx-md-2 mt-5">

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="text-center mb-4">International</h2>
          <p class="lead text-center">This section leverages an interactive global map, sourced from the Office for National Statistics (ONS) data. This feature visualizes the UK's trade relationships, showcasing trends over the past two decades. Users can explore detailed trade data, including export and import values with top trading partners, through this engaging interface.</p>
        </div>
      </div>
    </div>

    <div class="container-fluid" id="map-section">
      <div class="row justify-content-center">
        <!-- Right side column that holds Map, Line Chart, and Pie Chart -->
        <div class="col-md-9">
          <div class="row d-flex justify-content-center">
            <div class="col-12 mt-7" style="height: 50%;">
              <div class="position-relative">
                <TradeMap2 :is-export-mode="isExportMode" />
                <button @click="isExportMode = !isExportMode" class="btn btn-primary position-absolute top-0 end-0 m-3">
                  {{ isExportMode ? 'Switch to Import' : 'Switch to Export' }}
                </button>
              </div>
            </div>

            <!-- Button to toggle charts visibility -->
            <div class="col-12 mt-5">
              <div class="row d-flex justify-content-center">
                <button class="btn btn-secondary" @click="toggleCharts">
                  {{ chartsVisible ? 'Hide Charts' : 'Reveal Trade Data in Transportation Mods and Goods' }}
                </button>
              </div>
            </div>

            <!-- Row for Line Chart and Pie Chart on the same line -->
            <div class="col-12 mt-7">
              <div class="row collapse" :class="{ show: chartsVisible }" id="chartsCollapse">
                <!-- Line Chart -->
                <div class="col-md-6 d-flex align-items-center justify-content-center" style="height: 50%;">
                  <div style="width: 100%;">
                    <component :is="isExportMode ? TableauDashboardLineExportGoods : TableauDashboardLineImportGoods" />
                  </div>
                </div>

                <!-- Pie Chart -->
                <div class="col-md-6 d-flex align-items-center justify-content-center" style="height: 50%;">
                  <div style="width: 100%;">
                    <component :is="isExportMode ? TableauDashboardPieExport : TableauDashboardPieImport" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card card-body blur shadow-blur mx-3 mx-md-2 mt-5">

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="text-center mb-4">Subnational</h2>
          <p class="lead text-center">Use the dashboard below to explore how international trade impacts each region of the UK differently.</p>
        </div>
      </div>
    </div>

    <div class="container-fluid pt-7" id="region-section">
      <div class='tableauPlaceholder' id='viz1715280013344' style='position: relative; opacity: 1;'><noscript><a href='#'><img alt='Dashboard 3 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;uk&#47;uk_subnational_trade&#47;Dashboard3&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='uk_subnational_trade&#47;Dashboard3' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;uk&#47;uk_subnational_trade&#47;Dashboard3&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /><param name='filter' value='publish=yes' /></object></div>                <component :is="'script'">                    var divElement = document.getElementById('viz1715280013344');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.minWidth='500px';vizElement.style.maxWidth='2000px';vizElement.style.width='100%';vizElement.style.minHeight='1651px';vizElement.style.maxHeight='1751px';vizElement.style.height='1751px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </component>    
    </div>

    <p></p>
    <p></p>
    <p class="lead text-center">You may have noticed that London stands out by a significant margin in nearly every metric. Continue to the next dashboard to get a better breakdown of London's economic spatial balance.</p>

  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-2 mt-5">

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="text-center mb-4">Local (London)</h2>
          <p class="lead text-center">Use the dashboard below to explore the economic impact and trends of London at a per-borough level.</p>
        </div>
      </div>
    </div>
  
    <div
      class="container-fluid mt-sm-5 border-radius-xl"
      id="london-section"
      :style="{
        background: '#E8F9FD' // Changed background to white
      }"
    >
      <div
        class="page-header py-6 py-md-5 my-sm-3 border-radius-xl"
        :style="{
          display: 'flex',                 // Added for flexbox layout
          flexDirection: 'column',         // Directs children to align vertically
          alignItems: 'center',            // Centers children horizontally
          justifyContent: 'center',        // Centers children vertically
          backgroundImage: `url(${wavesWhite})`,
          height: '110vh',
          margin: '0 auto',                // Centers the block horizontally
          backgroundSize: 'cover',         // Ensures the background image covers the div
          backgroundPosition: 'center'     // Centers the background image
        }"
        loading="lazy"
      >
        <!-- <span class="mask bg-gradient-dark"></span> -->
        <LondonEco />
      </div>
    </div>


    <div class="container-fluid" id="london-data-section">
      <div class="row justify-content-center">
        <!-- Right side column that holds Map, Line Chart, and Pie Chart -->
        <div class="col-md-9">
          <div class="row d-flex justify-content-center">
            <!-- Map taking the larger portion at the top right -->
            <div class="col-12 mt-7">
              <div class="position-relative">
                <LucyTableau />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-2 mt-5">
    
    <h2 class="text-center mb-4">Datasets</h2>
  
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-6 col-sm-12">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'bar_chart', color: 'dark' }"
            title="International Trade Data"
            description="UN trade databases provide comprehensive data sources, covering almost every aspect needed for a global view."
            :action="{
              route: 'https://comtradeplus.un.org/',
              label: { text: 'Read more', color: 'info' }
            }"
          />
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'public', color: 'dark' }"
            title="Subnational Trade Data"
            description="Provided by the Office for National Statistics, this dataset contains information on the value of goods exported and imported by the UK's various ITL regions."
            :action="{
              route: 'https://www.ons.gov.uk',
              label: { text: 'Read more', color: 'info' }
            }"
          />
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'location_city', color: 'dark' }"
            title="London Data"
            description="Provided by the London data store, this dataset contains information on the economic health of London by borough."
            :action="{
              route: 'https://data.london.gov.uk/',
              label: { text: 'Read more', color: 'info' }
            }"
          />
        </div>
      </div>
    </div>

    <!-- </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-2 mt-5"> -->
    <p></p>
    <p></p>
    <h2 class="text-center mb-4">Technologies Used</h2>
    <p class="lead text-center"></p>
  
    
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-6 col-sm-12">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'code', color: 'dark' }"
            title="D3.js"
            description="D3.js was used alongside various other tools to create a cohesive interactive environment (international/subnational/local)."
            :action="{
              route: 'https://d3js.org',
              label: { text: 'd3js.org', color: 'info' }
            }"
          />
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'map', color: 'dark' }"
            title="DataMaps"
            description="D3 sublibrary used to create orthographic map projection (international)."
            :action="{
              route: 'https://datamaps.github.io',
              label: { text: 'datamaps.github.io', color: 'info' }
            }"
          />
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'dashboard', color: 'dark' }"
            title="Tableau"
            description="Tableau was used to create various dashboards (international/subnational/local)."
            :action="{
              route: 'https://www.tableau.com/en-gb',
              label: { text: 'tableau.com', color: 'info' }
            }"
          />
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'place', color: 'dark' }"
            title="Mapbox"
            description="Mapbox was used to create the various interactive maps (subnational/local)."
            :action="{
              route: 'https://www.mapbox.com',
              label: { text: 'mapbox.com', color: 'info' }
            }"
          />
        </div>
      </div>
    </div>

    <p></p>

  </div>


  <DefaultFooter />
</template>

<style>
.bg-black {
  background: linear-gradient(to bottom, #ffffff,#f6f9ff, #5BA0BF, #000e29e2);
  /* background: linear-gradient(to bottom, #ffffff, #5BA0BF, #FFA566, #E38664, #7E627B, #012442); */
  background-attachment: scroll;
}
</style>
