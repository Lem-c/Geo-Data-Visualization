<template>
  <div>
    <label for="destination">Select Trading Partner:</label>
    <select id="destination" v-model="selectedPartnerISO" @change="drawMap">
      <option v-for="partner in partners" :key="partner.iso" :value="partner.iso">
        {{ displayName(partner.name) }}
      </option>
    </select>

    <div class="position-relative" style="width: 100%; height: 600px;">
      <div
        id="projection_map"
        class="border bg-light p-2 rounded shadow"
        style="position: relative; width: 100%; height: 60vh; background: transparent;"
      ></div>

      <Efigure
        class="position-absolute border p-2 rounded shadow"
        :name="selectedPartner?.name ?? 'Total'"
        :is-export-mode="isExportMode"
        style="top: 30px; right: 10px; width: 100%; height: 60vh; z-index: 15;"
      />

      <div
        v-if="selectedPartner"
        class="position-absolute top-0 start-0 bg-light p-2 border rounded shadow"
        style="margin: 10px; z-index: 20;"
      >
        <h5 class="mb-1">{{ displayName(selectedPartner.name) }}</h5>
        <p class="mb-0"><strong>Primary Value:</strong> {{ selectedPartner.PValue }}</p>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { onMounted, ref, watch, defineProps } from 'vue';
  import Papa from 'papaparse';
  // import Datamap from 'datamaps';

  import Efigure from '../components/EFigure.vue';

  const partners = ref([]);
  const selectedPartnerISO = ref('');
  const tradeData = ref([]);
  const selectedPartner = ref(null);
  const worldCities = ref([]);
  
  const props = defineProps({
    isExportMode: Boolean
  });

  const displayName = (name) => {
    const words = name.split(' ');
    return words.slice(0, 2).join(' ');
  }

  const fills = {
    defaultFill: "#D3D3D3",
    UK: "#ff5722",
    Import: "#673ab7",
    Export: "#00bcd4",
  };
  
  const UK_COORDS = { latitude: 51.5074, longitude: -0.1278 };

  // Load world cities coordinates from CSV
  const loadWorldCities = async () => {
    const response = await fetch('../../data/tradeData/worldcities.csv');
    const csvData = await response.text();
    Papa.parse(csvData, {
      header: true,
      complete: (result) => {
        worldCities.value = result.data;
      }
    });
  };

  // Find the coordinates for a country using its ISO code
  const findCountryCoordinatesByISO = (iso) => {
    const city = worldCities.value.find(row => row.iso3 === iso);
    return city ? { latitude: parseFloat(city.lat), longitude: parseFloat(city.lng) } : null;
  };

  // Convert two-letter ISO code to three-letter ISO code
  const convertISO2toISO3 = (iso2) => {
    const city = worldCities.value.find(row => row.iso2 === iso2);
    return city ? city.iso3 : null;
  };
  
  // Function to load partners from the trade data using PapaParse
  const loadPartners = async () => {
    const dataUrl = props.isExportMode ? 
    '../../data/tradeData/uk_annual_exports.csv' : 
    '../../data/tradeData/uk_annual_imports.csv';

    console.log(dataUrl);

    const response = await fetch(dataUrl);
    const csvData = await response.text();
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        tradeData.value = result.data.filter(row => row.CountryName && !row.CountryName.includes('Total'));

        partners.value = tradeData.value
          .map((row) => ({
            iso: convertISO2toISO3(row.CountryCode) ,
            name: row.CountryName,
            PValue: row['2023'],
          }))
          .sort((a, b) => b.PValue - a.PValue) // Sorts in descending order
          .slice(0, 10); // Takes only the top 10

        selectedPartnerISO.value = partners.value[0]?.iso ?? '';
        updateSelectedPartner();
      }
    });
  };
  
  const updateSelectedPartner = () => {
    selectedPartner.value = partners.value.find((partner) => partner.iso === selectedPartnerISO.value) || null;
  };
  
  // Calculate the rotation between two coordinates
  const calculateRotation = (coords1, coords2) => {
    const averageLatitude = (coords1.latitude + coords2.latitude) / 3;
    const averageLongitude = (coords1.longitude + coords2.longitude) / 1.5;
    return [-averageLongitude, -averageLatitude];
  };
  
  // Initialize and draw the map
  const initializeMap = () => {
    const destination = findCountryCoordinatesByISO(selectedPartnerISO.value);
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
        'GBR': { fillKey: 'UK' },
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
        animationSpeed: 1500,
        strokeWidth: 4,
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
    updateSelectedPartner();
  };
  
  // Watch for changes in the export mode
  watch(() => props.isExportMode, () => {
    loadPartners();
  });

  // Load partners and trade data on component mount
  onMounted(async () => {
    await loadWorldCities();
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

  h5 {
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
  }
</style>
  