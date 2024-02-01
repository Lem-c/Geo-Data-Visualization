<template>
    <div class="map-section">
      <div class="main">
        <div class="section section-images">
          <div class="container">
            <div id='map'></div>
          </div>

          <div class='map-overlay'>
            <div class='map-overlay-inner'>
              <h2>England and Wales Employment and Population Density 2011</h2>
              <table>
                <tr>
                  <td>
                    <input type="radio" name="layers" id="layer1" value="Employment" checked @click="switchLayer('Emp')"><label>Jobs &nbsp; &nbsp;</label>
                    <input type="radio" name="layers" id="layer2" value="Residents" @click="switchLayer('Res')"><label>Residents</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="cityfly">Zoom To:
                      <a href="#" class="citylink" @click.prevent="zoomTo('Birmingham')">Birmingham</a> &nbsp;
                      <a href="#" class="citylink" @click.prevent="zoomTo('Bristol')">Bristol</a> &nbsp;
                      <a href="#" class="citylink" @click.prevent="zoomTo('Leeds')">Leeds</a> &nbsp;
                      <a href="#" class="citylink" @click.prevent="zoomTo('London')">London</a> &nbsp;
                      <a href="#" class="citylink" @click.prevent="zoomTo('Manchester')">Manchester</a> &nbsp;
                      <a href="#" class="citylink" @click.prevent="zoomTo('Newcastle')">Newcastle</a>
                    </p>
                  </td>
                </tr>
              </table>
              <p class="credit">Data: Census 2011, Office for Nat. Statistics. Cartography: <a href="http://citygeographics.org">citygeographics</a>.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import mapboxgl from 'mapbox-gl';
  
  export default {
    name: 'HeightMap',

    setup() {
      const map = ref(null);
  
      onMounted(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHVuY2FuMjAwMSIsImEiOiIyRDhtOE1nIn0.OA5QmCprkPbOoxZog8HIow';
  
        map.value = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/duncan2001/cjckdm9hn24qo2qmswnj13555',
          center: [-0.5, 51.5],
          zoom: 8,
          pitch: 50
        });
  
        map.value.on('load', () => {
          map.value.setLight({color: "#fff", intensity: 0.15, position: [1.15, 210, 30]});
          map.value.addControl(new mapboxgl.NavigationControl());
          
          map.value.addLayer({
            id: 'EngWal_Hex_Emp',
            type: 'fill-extrusion',
            source: {
              type: 'vector',
              url: 'mapbox://duncan2001.92wzi5h7'
            },
            'source-layer': 'EngWal_Hex_ResEmp_20012011b-7qjjyc',
            paint: {
              'fill-extrusion-color': {
                  property: 'Emp2011',
                  type: 'exponential',
                  stops: [
                      [0, '#d6f5ff'],
                      [3000, '#69cbf5'],
                      [5000, '#2e96dc'],
                      [30000, '#00479e']]
              },
              'fill-extrusion-height': ['/', ['number', ['get', 'Emp2011'], 2], 2],
              'fill-extrusion-opacity': 0.95,
              'fill-extrusion-opacity-transition': {
                   duration: 1000,
                   delay: 0
               }
            }
          });
  
          map.value.addLayer({
            id: 'EngWal_Hex_Res',
            type: 'fill-extrusion',
            source: {
              type: 'vector',
              url: 'mapbox://duncan2001.92wzi5h7'
            },
            'source-layer': 'EngWal_Hex_ResEmp_20012011b-7qjjyc',
            paint: {
              'fill-extrusion-color': {
                  property: 'Res2011',
                  type: 'exponential',
                  stops: [
                      [0, '#fff2f2'],
                      [5000, '#f59c8e'],
                      [10000, '#e54545'],
                      [30000, '#730b0b']]
              },
              'fill-extrusion-height': ['/', ['number', ['get', 'Res2011'], 2], 2],
              'fill-extrusion-opacity': 0,
              'fill-extrusion-opacity-transition': {
                   duration: 1000,
                   delay: 0
               }
            }
          });
  
          map.value.addLayer({
            'id': 'labels',
            'type': 'symbol',
            source: {
              type: 'vector',
              url: 'mapbox://duncan2001.b6rqk9s2'
            },
            'source-layer': 'LabelCities2-6qmjf4',
            'layout': {
              'text-field': '{Name2}',
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
              'text-size': 14
            },
            'paint': {
              'text-color': 'rgba(0,0,0,0.8)',
              'text-halo-color': '#fff',
              'text-halo-width': 1
            }
          });
        });
      });
  
      const switchLayer = (layerType) => {
        if (layerType === 'Emp') {
          map.value.setPaintProperty('EngWal_Hex_Emp', 'fill-extrusion-opacity', 0.95);
          map.value.setPaintProperty('EngWal_Hex_Res', 'fill-extrusion-opacity', 0);
        } else if (layerType === 'Res') {
          map.value.setPaintProperty('EngWal_Hex_Emp', 'fill-extrusion-opacity', 0);
          map.value.setPaintProperty('EngWal_Hex_Res', 'fill-extrusion-opacity', 0.95);
        }
      };
  
      const zoomTo = (cityName) => {
        let coords = {
          'Birmingham': [-1.8904, 52.4862],
          'Bristol': [-2.5879, 51.4545],
          'Leeds': [-1.5491, 53.8008],
          'London': [-0.1278, 51.5074],
          'Manchester': [-2.2426, 53.4808],
          'Newcastle': [-1.6178, 54.9783]
        };
  
        map.value.flyTo({
          center: coords[cityName],
          zoom: 9,
          speed: 0.3,
          pitch: 50
        });
      };
  
      return { switchLayer, zoomTo };
    }
  }
  </script>

<style scoped>
@import "../../assets/css/legendStyle.css";

.map-section{
  background-color: #191970;
}
</style>
  