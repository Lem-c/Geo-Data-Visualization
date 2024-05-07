<template>
<div>
    <h3 style="text-align: right; opacity: 0.5;">{{ name }} Data Chart</h3>
    <div ref="chartContainer" style="width: 100%; height: 600px;"></div>
</div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
name: {
    type: String,
    required: false,
    default: '',
},
});

const chartContainer = ref(null);

const fetchCSVData = async () => {
    const response = await fetch('../../data/tradeData/uk_annual_exports.csv');
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
            text: 'Data Over Years',
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
        },
            series: seriesData,
    });
};

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
