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
            chartData: null,
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
                d.x = new Date(d.x).getFullYear();
            });
        },

        createChart() {
            if (!this.chartData) {
                return;
            }

            // Response margin
            const margin = {top: 20, right: 40, bottom: 40, left: 20},
                width = this.width - margin.left - margin.right,
                height = this.height - margin.top - margin.bottom;
            

            // Generate the svg chart
            const svg = d3.select(this.$refs.chart)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

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
        createXAxis(svg, xScale) {
            const margin = {top: 20, right: 20, bottom: 40, left: 20},
                width = this.width - margin.left - margin.right,
                height = this.height - margin.top - margin.bottom;

            const xAxis = d3.axisBottom(xScale)
                .tickSize(-height) // Extend ticks across the chart for a gridline effect
                .tickPadding(10) // Add padding for tick labels
                .tickFormat(d => d.toString());
            
            const g = svg.append("g")
                .attr("class", "x-axis") // Use this class to style via CSS
                .attr("transform", `translate(0,${height-margin.bottom})`)
                .call(xAxis);
            // const g = svg.append('g')
            //     .attr('transform', `translate(0,${height})`) // Position at the bottom
            //     .call(xAxis);

            // Add an X-axis label
            g.append("text")
            .attr("class", "axis-label")
            .attr("y", -margin.bottom) // Position above the bottom margin
            .attr("x", width / 2) // Center the label
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

            // X-axis is time format
            const xScale = d3.scaleLinear()
                .domain(d3.extent(this.chartData, d => d.x))
                .range([0, this.width]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(this.chartData, d => d.y)])
                .range([this.height, 0]);

            const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

            svg.append("path")
                .datum(this.chartData)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", line)
                .attr("stroke-dasharray", function() {
                    return this.getTotalLength();
                })
                .attr("stroke-dashoffset", function() {
                    return this.getTotalLength();
                })
                .transition() // Add transition
                .duration(2000) // 2 seconds
                .attr("stroke-dashoffset", 0);

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
.axis-label {
  fill: #616c71; /* Label color */
  font-size: 14px; /* Label font size */
}

.x-axis path,
.y-axis path,
.x-axis line,
.y-axis line {
  stroke: #e3e8ce; /* Color of axis and tick lines */
}

.x-axis text,
.y-axis text {
  font-size: 12px; /* Axis tick font size */
}
</style>
  