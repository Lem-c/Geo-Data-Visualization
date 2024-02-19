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
      addedMarkers: [],

      chartType : 'line',
      dataUrl : '/data/uk_climate/UK000000000.csv',
      ColumnNameForX: 'DATE',
      ColumnNameForY: 'TAVG',
      chartWidth: 600,
      chartHeight: 300,
    }
  },

  mounted() {
    this.initializeMap();
    this.updateChartDimensions();
    window.addEventListener('resize', this.updateChartDimensions);
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

      // Add zoom and rotation controls to the map.
      this.map.addControl(new mapboxgl.NavigationControl());
      
      // Disable the drag to rotate functionality
      this.map.dragRotate.disable();

      // Disable rotation with touch gestures, but allow pinch to zoom
      this.map.touchZoomRotate.disableRotation();

      this.map.on('load', () => {
        this.setMap(this.map);
      });
    },

    setMap(map){
      this.addBoundaryLayer(map);

      this.addPopupContent("/data/uk_climate/UK000000000.csv");
      this.addPopupContent("/data/uk_climate/UK000003005.csv");
      this.addPopupContent("/data/uk_climate/UK000003026.csv");
      this.addPopupContent("/data/uk_climate/UK000003162.csv");
      this.addPopupContent("/data/uk_climate/UK000003302.csv");
      this.addPopupContent("/data/uk_climate/UK000003377.csv");
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
        // });

        this.markers = data.map(d => {
          // Generate a unique ID for each chart container
          const chartContainerId = `chart-${d.DATE}`;

          return {
            coordinates: [parseFloat(d.LONGITUDE), parseFloat(d.LATITUDE)],
            popupContent: `<div class="popup-content"><h3>Line Chart</h3><p>Avg temperature</p><div id="${chartContainerId}"></div></div>`,
            id: d.DATE, // Feature id name
            chartContainerId, // Save this for later use
            dataUrl: path
          };
        });

        // Add anchors and popup      
        this.addMarkers();
      });
    },

    addMarkers() {
      this.markers.forEach(marker => {
        if (this.addedMarkers.length == 0 ||
          !checkDuplicateMarkerCoord(this.addedMarkers, marker.coordinates)) {
          // Create a placeholder div for the popup content
          const popupContentEl = document.createElement('div');
          popupContentEl.className = 'popup-content';
          popupContentEl.innerHTML = `<h3>Line Chart</h3><p>Avg temperature</p><div id="${marker.chartContainerId}"></div>`;

          // Add this marker into added array
          this.addedMarkers.push(marker)

          const popup = new mapboxgl.Popup({ maxWidth: "1000px" })
            .setDOMContent(popupContentEl); // Use setDOMContent with the created element

          // change marker icon
          const customIconUrl = 'favicon.ico';

          // Create a new HTML element for the custom marker
          const el = document.createElement('div');
          const img = document.createElement('img');
          img.src = customIconUrl;
          img.style.width = '25px'; // Set the size of the marker icon
          img.style.height = '25px';
          el.appendChild(img);

          new mapboxgl.Marker(el)
            .setLngLat(marker.coordinates)
            .setPopup(popup)
            .addTo(this.map);

          popup.on('open', () => {
            this.mountD3Chart(marker.chartContainerId, marker.dataUrl);
          });
        }
      });
    },

    mountD3Chart(containerId, dataUrl) {
      const props = {
        chartType: this.chartType,
        dataUrl: dataUrl,
        xColumn: this.ColumnNameForX,
        yColumn: this.ColumnNameForY,
        width: this.chartWidth,
        height: this.chartHeight,
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

    updateChartDimensions() {
      // Simple example, adjust as needed for your design
      this.chartWidth = window.innerWidth/2;
      this.chartHeight = window.innerHeight/4;
    }
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
  min-width: 400px; /* Minimum width */
  padding: 15px; /* Add some padding */
  box-sizing: border-box; /* Include padding in width calculation */
  background-color: rgb(34, 9, 39);
  border-radius: 15px; /* Rounded corners */
}

</style>
