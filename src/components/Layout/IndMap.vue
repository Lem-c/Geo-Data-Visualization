<template>

<div id="map-container">
  <div id="map"></div>
</div>

</template>

<script>
import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import { createApp } from 'vue';

import { checkDuplicateMarkerCoord } from '@/plugins/utils';
import D3Chart from "@/components/Layout/Chart.vue";

let mountedApps = {};

export default {
  name: 'IndMap',

  data(){
    return{
      map: null, // Map instance
      markers: [],

      chartType : 'line',
      dataUrl : '/data/uk_climate/UK000000000.csv',
      ColumnNameForX: 'DATE',
      ColumnNameForY: 'TAVG'
    }
  },

  mounted() {
    this.initializeMap();
  },
  
  beforeUnmount() {
    // Unmount all Vue app instances when component is unmounted
    Object.keys(mountedApps).forEach(id => {
      if (mountedApps[id]) {
        mountedApps[id].unmount();
      }
    });
  },

  methods: {
    initializeMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoieDBsZW0iLCJhIjoiY2xyaHA2ejVkMDFsejJrcG43MDA3bjBsaiJ9.Q5hsTi_sqF2QKkZjsII_Ag';

      this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/dark-v10', // style location
        center: [-1.83, 52.42], // starting position [lng, lat]
        zoom: 6 // starting zoom
      });

      this.map.on('load', () => {
        this.setMap(this.map);
      });
    },

    setMap(map){
      this.addBoundaryLayer(map);
      this.addPopupContent("/data/uk_climate/UK000000000.csv");
    },

    addBoundaryLayer(map){
      fetch('/data/gadm41_GBR_2.json')
        .then(response => response.json())
        .then(data => {
          map.addSource('gbp-data', {
            type: 'geojson',
            data: data
          });

          map.addLayer({
            id: 'gbp-layer',
            type: 'fill', // This type is for filling areas
            source: 'gbp-data',
            layout: {},
            paint: {
              'fill-color': '#E1FFFF',
              'fill-opacity': 0.5
            }
          });
        })
        .catch(error => console.log(error));
    },

    addPopupContent(path){
      // Read in csv file
      d3.csv(path).then(data => {
        // data.forEach(d => {
        //   d.DATE = new Date(d.DATE);
        //   d.TMAX = +d.TMAX;
        // });

        this.markers = data.map(d => {
          // Generate a unique ID for each chart container
          const chartContainerId = `chart-${d.DATE}`;

          return {
            coordinates: [parseFloat(d.LONGITUDE), parseFloat(d.LATITUDE)],
            popupContent: `<div class="popup-content"><h3>Line Chart</h3><p>Avg temperature</p><div id="${chartContainerId}"></div></div>`,
            id: d.DATE, // Feature id name
            chartContainerId // Save this for later use
          };
        });

        // Add anchors and popup      
        this.addMarkers();
      });
    },

    addMarkers() {
      var i = 0;
      this.markers.forEach(marker => {
        if (i == 0 || !checkDuplicateMarkerCoord(this.markers, marker.coordinates)) {
          // Create a placeholder div for the popup content
          const popupContentEl = document.createElement('div');
          popupContentEl.className = 'popup-content';
          popupContentEl.innerHTML = `<h3>Line Chart</h3><p>Avg temperature</p><div id="${marker.chartContainerId}"></div>`;

          const popup = new mapboxgl.Popup()
            .setDOMContent(popupContentEl); // Use setDOMContent with the created element

          new mapboxgl.Marker()
            .setLngLat(marker.coordinates)
            .setPopup(popup)
            .addTo(this.map);

          popup.on('open', () => {
            this.mountD3Chart(marker.chartContainerId);
          });
        }

        i += 1;
      });
    },

    mountD3Chart(containerId) {
      const props = {
        chartType: this.chartType,
        dataUrl: this.dataUrl,
        xColumn: this.ColumnNameForX,
        yColumn: this.ColumnNameForY
      };
      const container = document.getElementById(containerId);
      if (container) {
        // Check if an app is already mounted and unmount it first
        if (mountedApps[containerId]) {
          mountedApps[containerId].unmount();
        }

        // Mount a new Vue app instance
        // mountedApps[containerId] = createApp(D3Chart, props).mount(container);
        const app = createApp(D3Chart, props);
        mountedApps[containerId] = app;
        app.mount(container);
      }
    },
  }
}

</script>

<style scoped>
#map-container {
  position: relative;
  height: 100vh;
}

#map {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.popup-content {
  width: auto;
  max-width: 90vw;
  min-width: 280px; /* Minimum width */
  max-height: 80vh; /* Avoid too tall popups */
  overflow-y: auto; /* Scroll inside if content is too long */
  padding: 10px; /* Add some padding */
  box-sizing: border-box; /* Include padding in width calculation */
  background-color: white;
  border-radius: 8px; /* Rounded corners */
}
</style>
