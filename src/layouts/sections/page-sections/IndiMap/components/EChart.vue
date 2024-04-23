<template>
    <div ref="chart" :style="{ width: width + 'px', height: height + 'px' }"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import Papa from 'papaparse'; // Using PapaParse to handle CSV parsing
  
  export default {
    name: 'EChartsComponent',
    props: {
        chartType: {
            type: String,
            required: true
        },
        dataUrl: {
            type: String,
            required: true
        },
        xColumn: {
            type: String,
            required: true
        },
        yColumn: {
            type: String,
            required: true
        },
        width: {
            type: [String, Number],
            required: true
        },
        height: {
            type: [String, Number],
            required: true
        }
    },
    data() {
      return {
        chartInstance: null
      };
    },
    watch: {
      dataUrl: {
        immediate: true,
        handler(newVal) {
          this.loadData(newVal);
        }
      }
    },
    mounted() {
      this.chartInstance = echarts.init(this.$refs.chart);
    },
    beforeUnmount() {
      if (this.chartInstance) {
        this.chartInstance.dispose();
      }
    },
    methods: {
      async loadData(url) {
        try {
          const response = await fetch(url);
          const text = await response.text();
          // Use PapaParse to convert CSV to JSON
          Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
              this.createChart(results.data);
            }
          });
        } catch (error) {
          console.error('Error loading data:', error);
        }
      },
      createChart(data) {
        const filteredData = data.filter(item => {
          const xValue = String(item[this.xColumn]).toLowerCase();
          const htdd = String(item['HTDD']).toLowerCase();
          const yValue = String(item[this.yColumn]).toLowerCase();
          return xValue !== 'undefined' && yValue !== 'null' && htdd !== 'null';
        });

        const xData = filteredData.map(item => item[this.xColumn]);
        const HTDD = filteredData.map(item => {
          const value = parseFloat(item['HTDD']);
          return isNaN(value) ? null : value; // Ensure conversion to number and handle NaN
      });
      const yData = filteredData.map(item => {
          const value = parseFloat(item[this.yColumn]);
          return isNaN(value) ? null : value; // Ensure conversion to number and handle NaN
      });

        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['Monthly HDD', 'Temperature']
          },
          xAxis: [
            {
              type: 'category',
              data: xData,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'HDD (Millimeters)',
              min: 0,
              max: 6000,
              interval: 600,
              axisLabel: {
                formatter: '{value} m'
              }
            },
            {
              type: 'value',
              name: 'Temperature',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [
            {
              name: 'Monthly HDD',
              type: 'bar',
              data: HTDD
            },
            {
              name: 'Temperature',
              type: 'line',
              yAxisIndex: 1,
              data: yData
            }
          ]
        };

        this.chartInstance.setOption(option);
      }

    }
  };
  </script>
  
  <!-- Add your style here -->
  
  <style scoped>
    .echart-container {
    width: 100%; /* Chart container will take the full width of its parent */
    height: 100%; /* Chart container will take the full height of its parent */
    padding: 20px; /* Padding to ensure the chart does not touch the edges */
    box-sizing: border-box; /* Padding is included in the width and height */
    }
  </style>
  