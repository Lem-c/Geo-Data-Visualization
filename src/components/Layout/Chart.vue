<template>
    <div ref="chart"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'D3Chart',
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
        }

    },
    data() {
        return {
            chartData: null,
            width: 240,  // Width of the SVG
            height: 150, // Height of the SVG
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
        this.createChart();
    },
    methods: {
        async loadData(url) {
            try {
            const response = await fetch(url);
            const data = await response.text();

            const parsedData = d3.csvParse(data, d => ({
                x: d[this.xColumn],
                y: +d[this.yColumn] // convert to number
            })).filter(d => d.x != null && d.y != null && d.y !== 0);

            this.chartData = parsedData;

            // const contentType = response.headers.get('content-type');
            
            // if (contentType.includes('application/json')) {
            //     this.chartData = await response.json();
            // } else if (contentType.includes('text/csv')) {
            //     this.chartData = await response.text();
            //     this.chartData = d3.csvParse(this.chartData);
            // }
            
            this.createChart();

            } catch (error) {
            console.error('Error loading data:', error);
            }
        },

        formatData(){
            if (!this.chartData) {
                return;
            }

            this.chartData.forEach(d => {
                d.x = new Date(d.x);
            });
        },

        createChart() {
            if (!this.chartData) {
                return;
            }

            // Generate the svg chart
            const svg = d3.select(this.$refs.chart)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`);

            switch(this.chartType) {
                case 'line':
                    this.createLineChart(svg);
                    break;
                case 'bar':
                    this.createBarChart(svg);
                    break;
                // Add cases for other chart types as needed
            }
        },

        // Method to create x-axis
        createXAxis(svg, xScale, height) {
            const xAxis = d3.axisBottom(xScale);
            const g = svg.append('g')
                .attr('transform', `translate(0,${height})`) // Position at the bottom
                .call(xAxis);

            // Add an X-axis label
            g.append("text")
                .attr("class", "axis-label")
                .attr("y", 35) // Adjust this value to position the label
                .attr("x", this.width / 2)
                .attr("text-anchor", "middle")
                .text(this.xColumn);
        },

        // Method to create y-axis
        createYAxis(svg, yScale) {
            const yAxis = d3.axisLeft(yScale);
            const g = svg.append('g')
                .call(yAxis);

            // Add a Y-axis label
            g.append("text")
                .attr("class", "axis-label")
                .attr("transform", "rotate(-90)")
                .attr("y", -40) // Adjust this value to position the label
                .attr("x", -this.height / 2)
                .attr("text-anchor", "middle")
                .text(this.yColumn);
        },

        createLineChart(svg) {
            this.formatData();

            // Assuming chartData is an array of objects with x and y properties
            const xScale = d3.scaleLinear()
                .domain(d3.extent(this.chartData, d => d.x)) // assuming x is the variable
                .range([0, this.width]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(this.chartData, d => d.y)]) // assuming y is the variable
                .range([this.height, 0]);

            const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

            svg.append("path")
                .datum(this.chartData)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", line);

            this.createXAxis(svg, xScale, this.height);
            this.createYAxis(svg, yScale);
        },

        createBarChart(svg) {
            this.formatData();

            const xScale = d3.scaleBand()
                .domain(this.chartData.map(d => d.x)) // assuming x is the category
                .range([0, this.width])
                .padding(0.2);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(this.chartData, d => d.y)]) // assuming y is the variable
                .range([this.height, 0]);

            svg.selectAll(".bar")
                .data(this.chartData)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => xScale(d.x))
                .attr("y", d => yScale(d.y))
                .attr("width", xScale.bandwidth())
                .attr("height", d => 400 - yScale(d.y))
                .attr("fill", "orange");

            this.createXAxis(svg, xScale, this.height);
            this.createYAxis(svg, yScale);
        },

    }
};
</script>
  
<style scoped>
</style>
  