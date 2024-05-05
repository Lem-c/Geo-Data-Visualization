<template>
    <div>
      <label for="destination">Select Trading Partner:</label>
      <select id="destination" v-model="selectedPartnerISO" @change="drawMap">
        <option v-for="partner in partners" :key="partner.iso" :value="partner.iso">
          {{ partner.name }}
        </option>
      </select>
  
      <div id="projection_map" style="position: relative; width: 100%; height: 70VH;"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from 'vue';
  import Papa from 'papaparse';
  
  import {getCountryCoordinates} from "@/assets/js/worldCoord.js"

  const partners = ref([]);
  const selectedPartnerISO = ref('');
  const tradeData = ref([]);
  
  const fills = {
    defaultFill: "#D3D3D3",
    UK: "#ff5722",
    Import: "#673ab7",
    Export: "#00bcd4",
  };
  
  const UK_COORDS = { latitude: 51.5074, longitude: -0.1278 };
  
  // Function to load partners from the trade data using PapaParse
  const loadPartners = async () => {
    const response = await fetch('../../data/tradeData/TradeData_5_2_2024_15_20_41.csv'); // Adjust path if necessary
    const csvData = await response.text();
    Papa.parse(csvData, {
      header: true,
      complete: (result) => {
        tradeData.value = result.data;
        partners.value = [...new Set(tradeData.value.map(row => ({
          iso: row.PartnerISO,
          name: row.PartnerDesc
        })))];
        selectedPartnerISO.value = partners.value[1].iso;
      }
    });
  };
  
  
  // Calculate the rotation between two coordinates
  const calculateRotation = (coords1, coords2) => {
    const averageLatitude = (coords1.latitude + coords2.latitude) / 3;
    const averageLongitude = (coords1.longitude + coords2.longitude) / 1.5;
    return [-averageLongitude, -averageLatitude];
  };
  
  // Initialize and draw the map
  const initializeMap = () => {
    const destination = getCountryCoordinates(selectedPartnerISO.value);
    console.log(destination)
    const rotation = calculateRotation(UK_COORDS, destination);
  
    const map = new Datamap({
      scope: 'world',
      element: document.getElementById('projection_map'),
      projection: 'orthographic',
      fills: {
        ...fills,
        defaultFill: fills.defaultFill,
      },
      projectionConfig: {
        rotation: rotation
      },
      data: {
        UK: { fillKey: 'UK' },
        [selectedPartnerISO.value]: { fillKey: 'Export' },
      },
    });
  
    map.graticule();
  
    map.arc(
      [
        {
          origin: UK_COORDS,
          destination: destination,
        },
      ],
      {
        greatArc: true,
        animationSpeed: 2000,
        strokeWidth: 5,
        arcSharpness: 1.4,
      }
    );
  
    return map;
  };
  
  // Redraw the map when the selected partner changes
  const drawMap = () => {
    const mapElement = document.getElementById('projection_map');
    while (mapElement.firstChild) {
      mapElement.removeChild(mapElement.firstChild);
    }
    initializeMap();
  };
  
  // Load partners and trade data on component mount
  onMounted(async () => {
    await loadPartners();
    drawMap();
  });
  
  watch(selectedPartnerISO, drawMap);
  </script>
  
  <style scoped>
  #projection_map {
    height: 100%;
    width: 100%;
  }
  
  label {
    display: inline-block;
    margin: 10px 0;
    font-weight: bold;
  }
  
  select {
    padding: 5px;
    margin-bottom: 20px;
  }
  </style>
  