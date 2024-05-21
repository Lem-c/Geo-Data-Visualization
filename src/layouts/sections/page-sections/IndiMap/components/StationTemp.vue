<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import { createApp, reactive } from 'vue';
import ToggleFloatButton from './tools/ToggleFloatButton.vue';
import D3Chart from "./EChart.vue";
import { checkDuplicateMarkerCoord } from './utils';

const state = reactive({
  map: null,
  markers: [],
  addedMarkers: [],
  isFloatWindowVisible: false,
  chartType: 'line',
  dataUrl: ['../../data/uk_climate/UK000000000.csv',
        '../../data/uk_climate/UK000003005.csv',
        '../../data/uk_climate/UK000003026.csv',
        '../../data/uk_climate/UK000003162.csv',
        '../../data/uk_climate/UK000003302.csv',
        '../../data/uk_climate/UK000003377.csv',],
  ColumnNameForX: 'DATE',
  ColumnNameForY: 'TAVG',
  chartWidth: 800,
  chartHeight: 300,
  openWeatherAPI: '51a4229e709d79b1b3f625724a2a8a25',
  forecastGroupedByDate: [],
});

const mountedApps = {};

onMounted(() => {
  initializeMap();
  window.addEventListener('resize', updateChartDimensions);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateChartDimensions);
});

function updateVisibility(newValue) {
  state.isFloatWindowVisible = newValue;
}

function initializeMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoieDBsZW0iLCJhIjoiY2xyaHA2ejVkMDFsejJrcG43MDA3bjBsaiJ9.Q5hsTi_sqF2QKkZjsII_Ag';
  state.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-4.83, 54.42],
    zoom: 5.1,
  });

  // Disable map interactions
  state.map.scrollZoom.disable();
  state.map.dragRotate.disable();
  state.map.touchZoomRotate.disableRotation();

  // Add zoom and rotation controls to the map.
  state.map.addControl(new mapboxgl.NavigationControl());

  state.map.on('load', () => {
        setMap(state.map);
    });
}

function setMap() {
  addBoundaryLayer();
  // Add Popup Content for each CSV file
  state.dataUrl.forEach(url => {
    addPopupContent(url);
  })
}

function addBoundaryLayer() {
  fetch('../../data/uk-counties_1682.geojson')
    .then(response => response.json())
    .then(data => {
      state.map.addSource('gbp-data', {
        type: 'geojson',
        data,
      });

      state.map.addLayer({
        id: 'gbp-layer',
        type: 'fill',
        source: 'gbp-data',
        layout: {},
        paint: {
          'fill-color': '#E1FFFF',
          'fill-opacity': 0.6,
        },
      });
    })
    .catch(error => console.error('Error loading the boundary layer:', error));
}

function addPopupContent(dataUrl) {
  d3.csv(dataUrl).then(data => {
    state.markers = data.map(d => {
      const tempMap = data.map(d => +d.TMAX);
      const emntMap = data.map(d => +d.EMNT);
      const maxTemp = d3.max(tempMap);
      const minTemp = d3.min(emntMap);
      const chartContainerId = `chart-${d.STATION}`;

      return {
        coordinates: [parseFloat(d.LONGITUDE), parseFloat(d.LATITUDE)],
        popupContent: `<div class="popup-content"><h3>All-time low temperature: ${minTemp}°C<br/>All-time high temperature: ${maxTemp}°C</h3><p>Historical average annual temperature</p><div id="${chartContainerId}"></div></div>`,
        id: d.DATE,
        chartContainerId,
        dataUrl,
      };
    });

    addMarkers();
  }).catch(error => console.error('Error loading CSV data:', error));
}

function addMarkers() {
  state.markers.forEach(marker => {
    // Check for duplicate markers
    if (!checkDuplicateMarkerCoord(state.addedMarkers, marker.coordinates)) {
      const el = document.createElement('div');
      const img = document.createElement('img');
      img.src = '../../img/station.png';
      img.style.width = '50px';
      img.style.height = '50px';
      el.appendChild(img);

      const popup = new mapboxgl.Popup({ maxWidth: "1920px" }).setHTML(marker.popupContent);

      new mapboxgl.Marker(el).setLngLat(marker.coordinates).setPopup(popup).addTo(state.map);

      // Store the marker
      state.addedMarkers.push(marker);

      // Mount the D3 chart on popup open
      popup.on('open', () => {
        mountD3Chart(marker.chartContainerId, marker.dataUrl);
      });

      // Add forcast content when marker clicked
      el.addEventListener('click', () => {
            // Logic to handle marker click event
            loadForecast(marker.coordinates[1], marker.coordinates[0]);
      });
    }
  });
}

function mountD3Chart(containerId, dataUrl) {
  const container = document.getElementById(containerId);
  if (container && !mountedApps[containerId]) {
    const app = createApp(D3Chart, {
      chartType: state.chartType,
      dataUrl,
      xColumn: state.ColumnNameForX,
      yColumn: state.ColumnNameForY,
      width: state.chartWidth,
      height: state.chartHeight,
    });
    mountedApps[containerId] = app;
    app.mount(container);
  }
}

function updateChartDimensions() {
  state.chartWidth = window.innerWidth / 2.5;
  state.chartHeight = window.innerHeight / 4;
}

function convertTimestampToDate(timestamp) {
      const date = new Date(timestamp * 1000); // Convert to milliseconds
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function groupForecastByDate(forecast) {
    const grouped = {};
    forecast.forEach(item => {
    const date = convertTimestampToDate(item.dt); // Assuming dt is in seconds
    // Ensure only the first entry for each date is used
    if (!grouped[date]) {
        grouped[date] = item;
    }
    });
    return grouped;
}

function formatGroupedForecast(groupedForecast) {
    const formatted = [];
    Object.keys(groupedForecast).forEach(date => {
    const item = groupedForecast[date];
    const feelsLike = item.main.feels_like.toFixed(2) + '°C';
    const description = item.weather[0].description;
    formatted.push(`${date} : ${feelsLike} : ${description}`);
    });
    return formatted;
}

function loadForecast(lat, lon) {
    const openWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${state.openWeatherAPI}&units=metric`;

    fetch(openWeatherURL)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON of the response
    })
    .then(data => {
        // Save the fetched data
        const groupedForecast = groupForecastByDate(data.list);
        state.forecastGroupedByDate = formatGroupedForecast(groupedForecast);
    })
    .catch(error => {
        console.error("Failed to fetch weather data:", error);
        // Handle errors here
    });
}

function getImageUrl(description) {
    const mapping = {
    'scattered ': '../../img/weather_icons/sun_rain.png',
    'light rain': '../../img/weather_icons/rain.png',
    'overcast clouds': '../../img/weather_icons/going_rain.png',
    'clear sky': '../../img/weather_icons/sun.png',
    'few clouds': '../../img/weather_icons/few_clouds.png'
    };
    return mapping[description] || '../../img/weather_icons/going_rain.png'; // Fallback image
}

</script>

<template>
<div id="map-container">
    <div id="map"></div>
  
    <ToggleFloatButton :initialVisible="state.isFloatWindowVisible" @update:visible="updateVisibility" />
    <!-- Floating window overlay -->
    <div class="left-float-window" :class="{ hidden: !state.isFloatWindowVisible }">
      <div class="container text-center">
  
        <div class="title">5 Day Weather Forecast</div>
        <div class="text-list">
          <!-- Dynamically generate list items based on weather data -->
          <div v-for="(formattedForecast, index) in state.forecastGroupedByDate" :key="index" class="date-group">
            <!-- <div class="date-title">{{ formattedForecast.split(' : ')[0] }}</div> -->
            <div class="weather-info">{{ formattedForecast }}</div>
            <img :src="getImageUrl(formattedForecast.split(' : ')[2])" alt="Weather Image" class="weather-image">
            <br/>
          </div>
        </div>
  
      </div>
    </div>
</div>
</template>

<style scoped>
#map-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px; /* Space below the map container */
}

#map {
  width: 100%;
  height: 59vh;
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

.left-float-window .title{
  text-align: right;
  color: black;
}

/*Float window used css*/
.left-float-window {
  position: absolute; /* or 'absolute' depending on your layout */
  top: 20px; /* Adjust as needed */
  left: 20px; /* Adjust as needed */
  width: 25%; /* Adjust based on content */
  background-color: white;
  border: 1px solid #ccc;
  z-index: 10; /* Ensure it floats above other content */
  overflow-y: auto; /* Make the floating window scrollable */
  text-align: center;
  max-height: 55vh;
  color: darkturquoise;
}

.left-float-window .weather-image {
  max-width: 10%; /* Ensures image does not exceed the container width */
  height: 10%; /* Maintains aspect ratio */
  border-radius: 5px; /* Optional: adds rounded corners to the images */
  margin: 10px; /* Optional: adds some space around the image */
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
</style>
