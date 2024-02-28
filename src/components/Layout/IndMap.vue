<template>

<div id="map-container">
  <div id="map"></div>
</div>

<ToggleFloatButton :initialVisible="isFloatWindowVisible" @update:visible="updateVisibility" />

<!-- Floating window overlay -->
<div class="left-float-window" :class="{ hidden: !isFloatWindowVisible }">
  <div class="container text-center">

    <div class="title">5 Day Weather Forecast</div>
    <div class="text-list">
      <!-- Dynamically generate list items based on weather data -->
      <div class="text-item" v-for="(item, index) in forecast" :key="index">
        {{ item.date }} - {{ item.main.temp }}°C - {{ item.weather[0].description }}
      </div>
    </div>

  </div>
  <div class="graph-container">
    <!-- Placeholder for graph -->
  </div>
</div>

</template>

<script>
import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import { createApp } from 'vue';

import { checkDuplicateMarkerCoord } from '@/plugins/utils';
import ToggleFloatButton from '@/components/Tools/ToggleFloatButton.vue';
import D3Chart from "@/components/Layout/Chart.vue";

let mountedApps = {};

export default {
  name: 'IndMap',

  components:{
    ToggleFloatButton
  },

  data(){
    return{
      map: null, // Map instance
      markers: [],
      addedMarkers: [],

      isFloatWindowVisible: false,

      chartType : 'line',
      dataUrl : '/data/uk_climate/UK000000000.csv',
      ColumnNameForX: 'DATE',
      ColumnNameForY: 'TAVG',
      chartWidth: 600,
      chartHeight: 300,

      openWeatherAPI: '51a4229e709d79b1b3f625724a2a8a25',
      forecast: [], // The forecast weather data
    }
  },

  mounted() {
    this.initializeMap();
    this.loadForecast();

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
    updateVisibility(newValue) {
      this.isFloatWindowVisible = newValue;
    },

    initializeMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoieDBsZW0iLCJhIjoiY2xyaHA2ejVkMDFsejJrcG43MDA3bjBsaiJ9.Q5hsTi_sqF2QKkZjsII_Ag';

      this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/dark-v10', // style location
        center: [-1.83, 52.42], // starting position [lng, lat]
        zoom: 8 // starting zoom
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

      const sunIconURL = '/img/station.png';

      this.addPopupContent("/data/uk_climate/UK000000000.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000003005.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000003026.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000003162.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000003302.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000003377.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000003808.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000044841.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000047811.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000056225.csv", sunIconURL);
      this.addPopupContent("/data/uk_climate/UK000070765.csv", sunIconURL);
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

    addPopupContent(path, customIconUrl){
      // Read in csv file
      d3.csv(path).then(data => {
        // Data attributes calculation
        const tempMap = data.map(d => +d.TAVG);
        const emntMap = data.map(d=> +d.EMNT);
        const maxTemp = d3.max(tempMap);
        const minTemp = d3.min(emntMap);
        // data.forEach(d => {
        //   d.hisMax = maxTemp;
        //   d.hisMin = minTemp;
        // });

        this.markers = data.map(d => {
          // Generate a unique ID for each chart container
          const chartContainerId = `chart-${d.DATE}`;

          return {
            coordinates: [parseFloat(d.LONGITUDE), parseFloat(d.LATITUDE)],
            popupContent: `<div class="popup-content"><h3>Max Temperature: ${maxTemp} <br/>
            Min Temperature: ${minTemp}</h3><p>Avg temperature line chart</p><div id="${chartContainerId}"></div></div>`,
            id: d.DATE, // Feature id name
            chartContainerId, // Save this for later use
            dataUrl: path
          };
        });

        // Add anchors and popup      
        this.addMarkers(customIconUrl);
      });
    },

    addMarkers(customIconUrl) {
      this.markers.forEach(marker => {
        if (this.addedMarkers.length == 0 ||
          !checkDuplicateMarkerCoord(this.addedMarkers, marker.coordinates)) {
          // Create a placeholder div for the popup content
          const popupContentEl = document.createElement('div');
          popupContentEl.className = 'popup-content';
          popupContentEl.innerHTML = marker.popupContent;

          // Add this marker into added array
          this.addedMarkers.push(marker)

          const popup = new mapboxgl.Popup({ maxWidth: "1920px" })
            .setDOMContent(popupContentEl); // Use setDOMContent with the created element

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
      this.chartWidth = window.innerWidth/2;
      this.chartHeight = window.innerHeight/4;
    },

    loadForecast() {
      const jsonContent =                       
      {
        "cod": "200",
        "message": 0,
        "cnt": 40,
        "list": [
          {
            "dt": 1661871600,
            "main": {
              "temp": 296.76,
              "feels_like": 296.98,
              "temp_min": 296.76,
              "temp_max": 297.87,
              "pressure": 1015,
              "sea_level": 1015,
              "grnd_level": 933,
              "humidity": 69,
              "temp_kf": -1.11
            },
            "weather": [
              {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10d"
              }
            ],
            "clouds": {
              "all": 100
            },
            "wind": {
              "speed": 0.62,
              "deg": 349,
              "gust": 1.18
            },
            "visibility": 10000,
            "pop": 0.32,
            "rain": {
              "3h": 0.26
            },
            "sys": {
              "pod": "d"
            },
            "dt_txt": "2022-08-30 15:00:00"
          },
          {
            "dt": 1661882400,
            "main": {
              "temp": 295.45,
              "feels_like": 295.59,
              "temp_min": 292.84,
              "temp_max": 295.45,
              "pressure": 1015,
              "sea_level": 1015,
              "grnd_level": 931,
              "humidity": 71,
              "temp_kf": 2.61
            },
            "weather": [
              {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"
              }
            ],
            "clouds": {
              "all": 96
            },
            "wind": {
              "speed": 1.97,
              "deg": 157,
              "gust": 3.39
            },
            "visibility": 10000,
            "pop": 0.33,
            "rain": {
              "3h": 0.57
            },
            "sys": {
              "pod": "n"
            },
            "dt_txt": "2022-08-30 18:00:00"
          },
          {
            "dt": 1661893200,
            "main": {
              "temp": 292.46,
              "feels_like": 292.54,
              "temp_min": 290.31,
              "temp_max": 292.46,
              "pressure": 1015,
              "sea_level": 1015,
              "grnd_level": 931,
              "humidity": 80,
              "temp_kf": 2.15
            },
            "weather": [
              {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"
              }
            ],
            "clouds": {
              "all": 68
            },
            "wind": {
              "speed": 2.66,
              "deg": 210,
              "gust": 3.58
            },
            "visibility": 10000,
            "pop": 0.7,
            "rain": {
              "3h": 0.49
            },
            "sys": {
              "pod": "n"
            },
            "dt_txt": "2022-08-30 21:00:00"
          },
          {
            "dt": 1662292800,
            "main": {
              "temp": 294.93,
              "feels_like": 294.83,
              "temp_min": 294.93,
              "temp_max": 294.93,
              "pressure": 1018,
              "sea_level": 1018,
              "grnd_level": 935,
              "humidity": 64,
              "temp_kf": 0
            },
            "weather": [
              {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
              }
            ],
            "clouds": {
              "all": 88
            },
            "wind": {
              "speed": 1.14,
              "deg": 17,
              "gust": 1.57
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
              "pod": "d"
            },
            "dt_txt": "2022-09-04 12:00:00"
          }
        ],
        "city": {
          "id": 3163858,
          "name": "Zocca",
          "coord": {
            "lat": 44.34,
            "lon": 10.99
          },
          "country": "IT",
          "population": 4593,
          "timezone": 7200,
          "sunrise": 1661834187,
          "sunset": 1661882248
        }
      };
      this.forecast = jsonContent.list.map(item => ({
        date: item.dt_txt,
        main: item.main,
        weather: item.weather,
      }));
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
  min-width: 400px; /* Minimum width */
  padding: 15px; /* Add some padding */
  box-sizing: border-box; /* Include padding in width calculation */
  background-color: rgb(34, 9, 39);
  border-radius: 15px; /* Rounded corners */
}

/* Button */

.left-float-window.hidden {
  display: none;
}

/*Float window used css*/

.left-float-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 20%; /* Adjust width as necessary */
  height: 50%;
  background: #ADD8E6;
  z-index: 10;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

.title {
  padding: 10px;
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.text-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.text-item {
  margin-bottom: 5px;
}

.graph-container {
  padding: 10px;
  border-top: 1px solid #ccc;
}

</style>
