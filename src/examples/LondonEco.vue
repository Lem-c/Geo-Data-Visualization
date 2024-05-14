<template>
  <div class="content-container">
    <div id="title">London Boroughs Economic Data</div>
    <div id="description">
      The map is indicating the 5 years change of 3 economic indicators: GDP per capita, income by workplace, and employment rate of residents aged 16-64. From the trend and the color of the map, we can preliminarily get the idea of whether the 2020 COVID lockdown has impacted the economic indicators and the economy gap between each borough.
      From the selection bar, you can select the element you want to show on the map, and for each element, there are year options to click and choose. Click on each borough to get more detailed Echart information.
      <br />
      Note that: all the data are downloaded from the London data store: <a href="https://data.london.gov.uk/" target="_blank">https://data.london.gov.uk/</a>.
    </div>
    <div id="map"></div>
    <div ref="chartContainer" id="chart"></div>
    <div id="tooltip"></div>
    <div id="legend" class="legend"></div>
    <div id="selections">
      <input type="radio" name="data-selection" id="GDP" value="GDP" checked><label for="GDP">GDP</label>
      <input type="radio" name="data-selection" id="income_median" value="income_median"><label for="income_median">Median Income</label>
      <input type="radio" name="data-selection" id="employment_rate" value="employment_rate"><label for="employment_rate">Employment Rate</label>
      <select id="yearSelector">
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
      </select>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import * as echarts from 'echarts';

export default {
  name: 'LondonBoroughsMap',
  data() {
    return {
      map: null,
      chart: null,
      currentFeature: null,
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibHVjeTA3MDgiLCJhIjoiY2xyN3I2bXgzMHQ3azJqcHFzYXBsM214NSJ9.CQ_-sIQwckB2hCyt3QSoBA';
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [-0.1276, 51.4065],
        zoom: 9.4,
        scrollZoom: false, // Disable zooming with scroll wheel
        doubleClickZoom: false, // Disable zooming with double click
        touchZoomRotate: false // Disable zooming and rotating with touch gestures
      });

      this.chart = echarts.init(this.$refs.chartContainer);

      this.map.on('load', () => {
        fetch('../../data/tradeData/london_data.json')
          .then((response) => response.json())
          .then((data) => {
            data.features = data.features.map((feature) => {
              Object.keys(feature.properties).forEach((key) => {
                feature.properties[key] = this.safelyParseNumber(feature.properties[key]);
              });
              return feature;
            });

            // Add the preprocessed data as a source to the map
            this.map.addSource('boroughs', {
              type: 'geojson',
              data: data,
            });

            this.map.dragPan.disable();

            // Define the color scale logic
            const colorExpression = ['interpolate', ['linear'], ['get', '2018_GDP'], 16000, '#daaee6', 130000, '#6e40e6'];

            // Add fill layer for boroughs
            this.map.addLayer({
              id: 'boroughs-fill',
              type: 'fill',
              source: 'boroughs',
              layout: {},
              paint: {
                'fill-color': colorExpression,
                'fill-opacity': 0.75,
              },
            });

            // Add outline layer for boroughs
            this.map.addLayer({
              id: 'boroughs-outline',
              type: 'line',
              source: 'boroughs',
              layout: {},
              paint: {
                'line-color': '#000',
                'line-width': 2,
              },
            });

            // Initialize the visualization once the layers are added
            this.updateMapVisualization();

            this.map.on('click', 'boroughs-fill', (e) => {
              this.currentFeature = document.querySelector('input[name="data-selection"]:checked').value;
              this.updateChart(this.currentFeature, e);
            });

            this.map.on('mousemove', 'boroughs-fill', (e) => {
              const boroughName = e.features[0].properties.NAME_3;
              const selectedYear = document.getElementById('yearSelector').value;
              const selectedMetric = document.querySelector('input[name="data-selection"]:checked').value;
              const dataValue = e.features[0].properties[`${selectedYear}_${selectedMetric}`];
              const tooltip = document.getElementById('tooltip');
              tooltip.innerHTML = `<strong>${boroughName}</strong><br>${selectedYear} ${selectedMetric}: ${dataValue}`;
              tooltip.style.display = 'block';
              tooltip.style.left = `${e.originalEvent.clientX}px`;
              tooltip.style.top = `${e.originalEvent.clientY}px`;
            });

            this.map.on('mouseleave', 'boroughs-fill', () => {
              document.getElementById('tooltip').style.display = 'none';
            });


            // Add a layer to display the borough names
            this.map.addLayer({
              id: 'boroughs-label',
              type: 'symbol',
              source: 'boroughs',
              layout: {
                'text-field': ['get', 'NAME_3'],  // Use the NAME_3 property from your data
                'text-size': 12,
                'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                'text-radial-offset': 0.5,
                'text-justify': 'auto'
              },
              paint: {
                'text-color': '#ffffff',
                'text-halo-color': '#000000',
                'text-halo-width': 1
              }
            });

            document.getElementById('selections').addEventListener('change', this.updateMapVisualization);
          });
      });
    },
    updateChartVisibility() {
      document.getElementById('chart').style.display = this.currentFeature ? 'block' : 'none';
    },
    updateMapVisualization() {
      const selectedYear = document.getElementById('yearSelector').value;
      const dataType = document.querySelector('input[name="data-selection"]:checked').value;
      const dataProperty = `${selectedYear}_${dataType}`;

      this.updateLegend(dataType, dataProperty);

      let colorExpression;
      if (dataType === 'income_median') {
        colorExpression = ['interpolate', ['linear'], ['get', dataProperty], 400, '#FFFBDA', 1000, '#C40C0C'];
      } else if (dataType === 'employment_rate') {
        colorExpression = ['interpolate', ['linear'], ['get', dataProperty], 65, '#f0ccde', 90, '#5e0732'];
      } else {
        colorExpression = ['interpolate', ['linear'], ['get', dataProperty], 15000, '#d7c3e8', 150000, '#4e0e82'];
      }

      if (this.map.getLayer('boroughs-fill')) {
        this.map.setPaintProperty('boroughs-fill', 'fill-color', colorExpression);
      }
    },
    updateChart(selectedFeature, e) {
      const boroughName = e.features[0].properties.NAME_3;
      var GDP_2018 = this.safelyParseNumber(e.features[0].properties['2018_GDP']);
      var GDP_2019 = this.safelyParseNumber(e.features[0].properties['2019_GDP']);
      var GDP_2020 = this.safelyParseNumber(e.features[0].properties['2020_GDP']);
      var GDP_2021 = this.safelyParseNumber(e.features[0].properties['2021_GDP']);
      var GDP_2022 = this.safelyParseNumber(e.features[0].properties['2022_GDP']);

      var income_median_2018 = this.safelyParseNumber(e.features[0].properties['2018_income_median']);
      var income_median_2019 = this.safelyParseNumber(e.features[0].properties['2019_income_median']);
      var income_median_2020 = this.safelyParseNumber(e.features[0].properties['2020_income_median']);
      var income_median_2021 = this.safelyParseNumber(e.features[0].properties['2021_income_median']);
      var income_median_2022 = this.safelyParseNumber(e.features[0].properties['2022_income_median']);
      
      var employment_rate_2018 = this.safelyParseNumber(e.features[0].properties['2018_employment_rate']);
      var employment_rate_2019 = this.safelyParseNumber(e.features[0].properties['2019_employment_rate']);
      var employment_rate_2020 = this.safelyParseNumber(e.features[0].properties['2020_employment_rate']);
      var employment_rate_2021 = this.safelyParseNumber(e.features[0].properties['2021_employment_rate']);
      var employment_rate_2022 = this.safelyParseNumber(e.features[0].properties['2022_employment_rate']);
      
      
      if (selectedFeature === 'GDP'){
        this.chart.setOption({
          title: {
              text: 'GDP in ' + boroughName,
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'line'
              }
          },
          legend: {
              data: ['GDP' ]
          },
          xAxis: {
              type: 'category',
              data: ['2018', '2019', '2020', '2021','2022']
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} £'
              }
          },
          series: [{
              name: 'GDP',
              type: 'line',
              data: [GDP_2018, GDP_2019, GDP_2020, GDP_2021, GDP_2022], // Values in order of the years
              showSymbol: true, // Optionally, show symbols for each data point
              smooth: false // Smooth the line for visual appeal

          }]
        });
        }else if(selectedFeature === 'employment_rate'){
          this.chart.setOption({
            title: {
                text: 'Employment rate in ' + boroughName,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            legend: {
                data: ['employment_rate' ]
            },
            xAxis: {
                type: 'category',
                data: ['2018', '2019', '2020', '2021','2022']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                }
            },
            series: [{
                name: 'employment_rate',
                type: 'line',
                data: [employment_rate_2018, employment_rate_2019, employment_rate_2020, employment_rate_2021, employment_rate_2022], // Values in order of the years
                showSymbol: true, // Optionally, show symbols for each data point
                smooth: false // Smooth the line for visual appeal

            }]
        });         
        }
        else{
          this.chart.setOption({
            title: {
                text: 'Median income in ' + boroughName,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            legend: {
                data: ['income_median']
            },
            xAxis: {
                type: 'category',
                data: ['2018', '2019', '2020', '2021','2022']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} £'
                }
            },
            series: [{
                name: 'income_median',
                type: 'line',
                data: [income_median_2018, income_median_2019, income_median_2020, income_median_2021, income_median_2022], // Values in order of the years
                showSymbol: true, // Optionally, show symbols for each data point
                smooth: false // Smooth the line for visual appeal
    
            }]
          });
      }

      this.updateChartVisibility();
    },
    updateLegend(dataType, dataProperty) {
      const legend = document.getElementById('legend');
      let colors;
      let values;

      if (dataType === 'income_median') {
        colors = ['#FFFBDA', '#FFEC9E', '#FFBB70', '#ED9455', '#FF6500', '#C40C0C'];
        values = ['400 - 500', '500 - 600', '600 - 700', '700 - 800', '800 - 1000', '>1000'];
      } else if (dataType === 'employment_rate') {
        colors = ['#f0ccde', '#e398be', '#cc6a9b', '#b83978', '#8f1854', '#5e0732'];
        values = ['65% - 70%', '70% - 75%', '75% - 80%', '80% - 85%', '85% - 90%', '>90%'];
      } else {
        colors = ['#d7c3e8', '#c8a6de', '#c096e3', '#a169cf', '#7e3cb5', '#4e0e82'];
        values = ['15,000 - 30,000', '30,000 - 45,000', '45,000 - 70,000', '70,000 - 90,000', '90,000-150,000', '>150,000'];
      }

      // Clear existing content
      legend.innerHTML = `<strong>${dataProperty} Legend</strong><div style="padding-top: 5px;"></div>`;
      const legendContainer = legend.lastElementChild;

      colors.forEach((color, index) => {
        const range = values[index];
        const colorBar = document.createElement('div');
        colorBar.innerHTML = `<i style="background:${color}; width: 30px; height: 10px; display: inline-block;"></i> ${range}`;
        legendContainer.appendChild(colorBar);
      });
    },
    safelyParseNumber(value){
      if (typeof value === 'string' && value.match(/^-?\d[\d,]*(\.\d+)?$/)) {
            // Remove commas for thousands separators
            value = value.replace(/,/g, '');

            // Check if the value is a decimal
            if (value.includes('.')) {
                // Parse as float if it includes a decimal point
                return parseFloat(value);
            } else {
                // Parse as integer if it does not include a decimal point
                return parseInt(value, 10);
            }
        } else {
            // Return the value unchanged if it's not a numeric string
            return value;
        }
    }
  },
};
</script>

<style scoped>
.content-container {
  position: relative;
  height: 100vh; /* Set to the height of the viewport */
  width: 90%; /* Full width */
}

#title { 
  top: 0; /* Position at the very top of the page */
  width: 100%; /* Full width */
  text-align: center;
  color: bisque;
  padding: 10px; 
  font-size: 55px;
  z-index: 1001; /* Above all other content */
}

#description {
  position: absolute;
  left: 10px;
  width: 200px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
  color: black;
  z-index: 1000;
  font-size: 16px;
  pointer-events: none; /* Ensures interaction with map is possible */
}

#map {
  height: 90%; /* Full container height */
  width: 100%; /* Full container width */
}

#chart {
  position: absolute;
  bottom: 5%; /* Positioned 20% from the bottom of the map */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center horizontally */
  width: 60%; /* Width of the chart */
  height: 30%; /* Height of the chart */
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  z-index: 10; /* Ensure it's above the map */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#tooltip {
  position: absolute;
  background: white;
  padding: 5px 10px;
  border: 1px solid #ccc;
  z-index: 9999;
  display: none;
  pointer-events: none;
}

.legend {
  position: absolute;
  bottom: 10%;
  right: 10px;
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  z-index: 1000;
  font-size: 14px;
}

#selections {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  padding: 30px;
  z-index: 1001;
  transform: translate(0%, 0%);  /* Align the element correctly at the top right */
}

#selections select {
  color: white; /* Sets the text color to white for input fields */
  background: black; /* Optional: sets a dark background for better visibility */
}

</style>
