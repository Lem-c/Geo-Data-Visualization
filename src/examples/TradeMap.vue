<script setup>

import mapboxgl from 'mapbox-gl';
import Papa from 'papaparse';

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoieDBsZW0iLCJhIjoiY2xyaHA2ejVkMDFsejJrcG43MDA3bjBsaiJ9.Q5hsTi_sqF2QKkZjsII_Ag';

parseCSVtoJSON('../../data/tradeData/uk-2023.csv')
  .then(jsonData => {
    const aggregatedData = aggregateDataByCountry(jsonData); 

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/x0lem/cls4kesl8003j01r0glga6tot', // style URL
      center: [0.11, 51.42],
      zoom: 6
    });

    map.setProjection('mercator');


    // Wait for the map to load before adding the layers
    map.on('load', () => {
      const sortedData  = aggregatedData.sort((a, b) => b.importVolume - a.importVolume);
      const shownData = sortedData.slice(0, 10);

      //Find the max and min values for normalization
      const maxPrimaryValue = shownData[0].importVolume;
      const minPrimaryValue = shownData[shownData.length - 1].importVolume;

      const normalizedTop10Data = shownData.map(item => {
        return {
          ...item,
          NormalizedPrimaryValue: (item.importVolume - minPrimaryValue) / (maxPrimaryValue - minPrimaryValue)
        };
      });
      
      console.log(normalizedTop10Data);

      normalizedTop10Data.forEach(countryData => {
        const { countryName, NormalizedPrimaryValue, importVolume, longitude, latitude } = countryData;

        // Create a source and layer for the flow line
        map.addSource(countryName + '-flow', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [longitude, latitude], // Starting point
                        [0.108092, 51.429] // Ending point
                    ]
                }
            }
        });

        map.addLayer({
            id: countryName + '-flow',
            type: 'line',
            source: countryName + '-flow',
            'layout': {
              'line-cap': 'round',
              'line-join': 'round',
            },
            'paint': {
                'line-color': '#000', // color of the arrow shaft
                'line-width': ['interpolate', ['linear'], ['zoom'], 2, 1, 10, 2],
                'line-dasharray': [3, 1]
            }
        });

        map.addLayer({
          "id": "triangles" + countryName,
          "type": "symbol",
          "source": countryName + '-flow',
          "layout": {
            "symbol-placement": "line",
            "icon-image": "arrows",
            "icon-size": 0.1
          }
        });
      });
    });
  })
  .catch(error => {
    console.error('Error while converting CSV to JSON:', error);
  });

function parseCSVtoJSON(csvFilePath) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: function(results) {
        resolve(results.data);
      },
      error: function(error) {  
        reject(error);
      }
    });
  });
}

function aggregateDataByCountry(data) {
  const aggregatedData = new Map();

  const filteredData = data.filter(row => 
    row.PartnerISO && row.lat !== '' && row.lng !== ''
  );

  filteredData.forEach(row => {
    const countryKey = row.PartnerISO;
    const value = parseFloat(row.PrimaryValue.replace(/,/g, ''));

    if (!isNaN(value)) {
      if (aggregatedData.has(countryKey)) {
        aggregatedData.set(countryKey, aggregatedData.get(countryKey) + value);
      } else {
        aggregatedData.set(countryKey, value);
      }
    }
  });

  // Convert the map to an array of objects
  return Array.from(aggregatedData, ([countryName, importVolume]) => ({
    countryName,
    importVolume,
    latitude: filteredData.find(row => row.PartnerISO === countryName).lat,
    longitude: filteredData.find(row => row.PartnerISO === countryName).lng
  }));
}

</script>

<template>
<div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 70vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>