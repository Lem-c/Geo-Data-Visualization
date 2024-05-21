import Papa from 'papaparse';

export function myCustomFunction() {
    console.log('This is a test function');
}

/**
 * Converts CSV data to GeoJSON format.
 * 
 * @param {string} csvData The CSV data as a string.
 * @param {string} temperatureColumn The column name for temperature data.
 * @param {string} longitudeColumn The column name for longitude data.
 * @param {string} latitudeColumn The column name for latitude data.
 * @param {string} dateColumn The column name for the date data.
 * @returns {Object} The converted GeoJSON object.
 */
export function convertCsvToGeoJson(csvData, temperatureColumn, longitudeColumn, latitudeColumn, dateColumn) {
    let geojsonData = {
      type: "FeatureCollection",
      features: [],
    };
  
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        results.data.forEach(row => {
          let feature = {
            type: "Feature",
            properties: {
              [temperatureColumn]: row[temperatureColumn], // Dynamically access the temperature column
              [dateColumn]: row[dateColumn], 
            },
            geometry: {
              type: "Point",
              coordinates: [parseFloat(row[longitudeColumn]), parseFloat(row[latitudeColumn])], // Dynamically access longitude and latitude
            }
          };
          geojsonData.features.push(feature);
        });
      }
    });
  
    return geojsonData;
}

export function checkDuplicateMarkerCoord(markersArray, newMarkerCoord) {
  // Iterate through the markers array
  for (let i = 0; i < markersArray.length; i++) {
    const marker = markersArray[i];
    // Check if the coordinates match the newMarkerCoord
    if (marker.coordinates[0] === newMarkerCoord[0] && marker.coordinates[1] === newMarkerCoord[1]) {
      // If a match is found, return true
      return true;
    }
  }
  // If no match is found after checking all markers, return false
  return false;
}
