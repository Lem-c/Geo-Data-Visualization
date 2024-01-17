<template>

<div id='map'></div>

<div class='map-overlay top'>
    <div class='map-overlay-inner'>
      <h2>London Underground Annual Entry Exits</h2>
      <table>
        <tr>
          <td>
            <input id='slider' type='range' min='0' max='14' step='1' value='0' list='tickmarks' />
            <datalist id="tickmarks">
              <option value="0" label="2008"> </option>
              <option value="1"> </option>
              <option value="2"> </option>
              <option value="3"> </option>
              <option value="4"> </option>
              <option value="5"> </option>
              <option value="6" label="2014"> </option>
              <option value="7"> </option>
              <option value="8"> </option>
              <option value="9"> </option>
              <option value="10"> </option>
              <option value="11"> </option>
              <option value="12"> </option>
              <option value="13"> </option>
              <option value="14"> </option>
              <option value="14" label="2022"> </option>
            </datalist>
          </td>
          <td>
            <label id='year'>2008</label>
          </td>
        </tr>
      </table>
      <p class="credit">Passenger data: <a href="http://crowding.data.tfl.gov.uk/">TfL</a>. Line and Station data: <a href="https://github.com/oobrien/vis/tree/master/tube/data">Oliver O'Brien</a></p>
    </div>
</div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'TempMap',
  data(){
    return{
      years: ['2008','2009','2010','2011','2012','2013', '2014','2015','2016','2017','2018','2019','2020','2021','2022'],
      map: null, // Map instance
    }
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZHVuY2FuMjAwMSIsImEiOiIyRDhtOE1nIn0.OA5QmCprkPbOoxZog8HIow';

      this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/duncan2001/cjb5126wu17g52spxin20qohu', // style location
        center: [-0.1, 51.5], // starting position [lng, lat]
        zoom: 12 // starting zoom
      });

      this.map.on('load', () => {
        this.setupMap(this.map);
      });
    },

    setupMap(map) {
      // Add the proportional circle layer to the map
      map.addLayer({
        id: 'TubeEntryExit2',
        type: 'circle',
        source: {
          type: 'vector',
          url: 'mapbox://duncan2001.0cf292ch' // Your Mapbox tileset Map ID
        },
        'source-layer': 'TubeEntryExit-6flrk7', // name of tilesets
        'layout': {
            'visibility': 'visible'
        },
        paint: {
          'circle-color': '#fffef7',
          'circle-opacity': 0.95,
          'circle-stroke-width': {
            stops: [[8, 0.5], [13, 2], [16, 3]]
          },
          'circle-stroke-color': '#000',
          'circle-stroke-opacity': 1,
          'circle-radius': {
            property: 'EE2008',
            stops: [
              [{zoom: 9, value: 0}, 1],
              [{zoom: 9, value: 100}, 5],
              [{zoom: 12, value: 0}, 3],
              [{zoom: 12, value: 100}, 40],
              [{zoom: 16, value: 0}, 4],
              [{zoom: 16, value: 100}, 150],]
          }}
      });

      // Add the label layer to the map
      map.addLayer({
        'id': 'labels',
        'type': 'symbol',
        'source': 'TubeEntryExit2',
        'source-layer': 'TubeEntryExit-6flrk7', // name of tilesets
        'layout': {
          'text-field': '{EE2008}m',
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': {
                stops: [[8, 0], [12.5, 0], [12.6, 12], [16, 20]]
          }
        },
        'paint': {
          'text-color': 'rgba(0,0,0,0.6)'
        }
      });

      var filters = ['>', 'EE2008', 30];
      map.setFilter('labels', filters);

      // var prevyear = 0;

      // Assign an event listner to the slider so that the setYear function runs when the user changes the slider
      document.getElementById('slider').addEventListener('input', (e) => {
        var year = parseInt(e.target.value);
        this.setYear(year, map);
      });

      var mypopup = new mapboxgl.Popup({offset:[150,50],closeButton: false});
      
      // Setup event listeners
      map.on('mouseover', 'TubeEntryExit2', (e) => {
        mypopup
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML("<h3>" + e.features[0].properties.name + "</h3>2008: " + e.features[0].properties.EE2008 + "m<br />2009: " + e.features[0].properties.EE2009 + "m<br />2010: " + e.features[0].properties.EE2010 + "m<br />2011: " + e.features[0].properties.EE2011 + "m<br />2012: " + e.features[0].properties.EE2012 + "m<br />2013: " + e.features[0].properties.EE2013 + "m<br />2014: " + e.features[0].properties.EE2014 + "m<br />2015: " + e.features[0].properties.EE2015 + "m<br />2016: " + e.features[0].properties.EE2016 + "m<br />2017: " + e.features[0].properties.EE2017 + "m<br />2018: " + e.features[0].properties.EE2018 + "m<br />2019: " + e.features[0].properties.EE2019 + "m<br />2020: " + e.features[0].properties.EE2020 + "m<br />2021: " + e.features[0].properties.EE2021 + "m<br />2022: " + e.features[0].properties.EE2022 + "m")
          .addTo(map);
      });
      map.on('mouseenter', 'TubeEntryExit2', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'TubeEntryExit2', () => {
        map.getCanvas().style.cursor = '';
        mypopup.remove();
      });
    },

    setYear(year, map) {
      document.getElementById('year').textContent = this.years[year];  // Set the label to the correct year

      var pp = map.getPaintProperty('TubeEntryExit2','circle-radius');

      console.log(pp);
      pp.property = "EE" + this.years[year];  // update the pp circle-radius to the new column set by the user

      map.setPaintProperty('TubeEntryExit2','circle-radius',pp);

      console.log(map.getPaintProperty('TubeEntryExit2','circle-radius'));

      var yearcol = "EE" + String(this.years[year]);
      var textfield = "{" + yearcol + "}m";

      console.log(textfield);

      map.setLayoutProperty('labels', 'text-field', textfield); // update the labels layer to the new column
      var filters = ['>', yearcol, 30];
      map.setFilter('labels', filters);
    },

    updateYear(event) {
      const year = parseInt(event.target.value);
      this.setYear(year, this.map); // Assuming `this.map` is your Mapbox map instance
    }
  }
};
</script>

<style>
#map {
  height: 500px; /* Adjust as needed */
  width: 100%;
}
</style>