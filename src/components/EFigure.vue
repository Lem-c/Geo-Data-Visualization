<template>
<div>
    <h3 style="text-align: right; opacity: 0.5;">Goods {{ isExportMode ? 'exported' : 'imported' }} to {{ displayName }}</h3>
    <div ref="chartContainer" style="width: 100%; height: 600px;"></div>
</div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
    name: {
        type: String,
        required: false,
        default: '',
    },
    isExportMode: {
        type: Boolean,
        required: true
    }
});

const displayName = computed(() => {
  const words = props.name.split(' ');
  return words.slice(0, 2).join(' ');
});

const chartContainer = ref(null);

const fetchCSVData = async () => {
    const dataUrl = props.isExportMode ? 
    '../../data/tradeData/uk_annual_exports.csv' : 
    '../../data/tradeData/uk_annual_imports.csv';

    const response = await fetch(dataUrl);
    const csvText = await response.text();

    // Split the CSV by lines and then by commas
    const parsedData = csvText
        .trim()
        .split('\n')
        .map((line) => line.split(','));

    const header = parsedData[0];
    const data = parsedData.slice(1).map((row) => ({
        code: row[0],
        name: row[1],
        values: row.slice(2).map((value) => (value ? Number(value) : 0)),
    }));

    return { header, data };
};

const drawChart = async () => {
    const { header, data } = await fetchCSVData();

    // Years extracted from the header (excluding the first two columns)
    const years = header.slice(2);

    let filteredData;
    let legendNames;

    if (props.name) {
        // If a specific country name is provided, filter for that country only
        filteredData = data.filter((country) => country.name === props.name);
        legendNames = filteredData.map((d) => d.name);
    } else {
        // Otherwise, use all data
        filteredData = data;
        legendNames = data.map((d) => d.name);
    }

    const seriesData = filteredData.map((country) => ({
        name: country.name,
        type: 'line',
        data: country.values,
    }));

    const chart = echarts.init(chartContainer.value);

    chart.setOption({
        title: {
            text: props.isExportMode ? 'Goods exported value' : 'Goods imported value',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: years,
        },
            yAxis: {
            type: 'value',
            name: props.isExportMode ? 'Value of Exports' : 'Value of Imports'
        },
            series: seriesData,
    });
};

// Watch for changes in the export mode
watch(() => props.isExportMode, () => {
    fetchCSVData();
});

onBeforeUnmount(() => {
    if (echarts) {
        echarts.dispose();
    }
});

onMounted(drawChart);

watch(() => props.name, drawChart);
</script>

<style scoped>
h1 {
text-align: center;
}
</style>
