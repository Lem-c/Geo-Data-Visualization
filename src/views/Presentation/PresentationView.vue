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

//hooks
const body = document.getElementsByTagName("body")[0];

const isExportMode = ref(true); 

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
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-black pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
            Title Title Title
            </h1>
            <p class="lead text-dark px-5 mt-3" :style="{ fontWeight: '500' }">
              Start the Development With Bootstrap 5 Design System inspired by
              Material Design.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-2 mt-n8">

    <div class="container-fluid">
      <div class="row justify-content-center">

        <!-- Right side column that holds Map, Line Chart, and Pie Chart -->
        <div class="col-md-9">
          <div class="row">
            <!-- Map taking the larger portion at the top right -->
            <div class="col-12" style="height: 50%;">
              <TradeMap2 :is-export-mode="isExportMode" />
              <button @click="isExportMode = !isExportMode"
                      class="btn btn-primary position-absolute top-0 end-0 m-3">
                {{ isExportMode ? 'Switch to Import' : 'Switch to Export' }}
              </button>
            </div>

            <!-- Row for Line Chart and Pie Chart on the same line -->
            <div class="col-12 mt-9">
              <div class="row">
                <!-- Line Chart -->
                <div class="col-md-6" style="height: 50%;">
                  <div>
                    <component :is="isExportMode ? TableauDashboardLineExportGoods : TableauDashboardLineImportGoods" />
                  </div>
                </div>

                <!-- Pie Chart -->
                <div class="col-md-6" style="height: 50%;">
                  <component :is="isExportMode ? TableauDashboardPieExport : TableauDashboardPieImport" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div
      class="container-fluid mt-sm-5 border-radius-xl"
      :style="{
        background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))'
      }"
    >
      <div
        class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
        :style="{
          backgroundImage: `url(${wavesWhite})`
        }"
        loading="lazy"
      >
        <span class="mask bg-gradient-dark"></span>

      </div>
    </div>



    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'receipt_long', color: 'success' }"
            title="Comtrade Dataset"
            description="Exploring the sources of our inspiration and data reveals much."
            :action="{
              route:
                'https://comtradeplus.un.org/',
              label: { text: 'Read more' }
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <DefaultFooter />
</template>

<style>
.bg-black {
  background-color: #C6A969;
}
</style>