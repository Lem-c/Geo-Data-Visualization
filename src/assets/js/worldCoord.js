// wordCoord.js
export const getCountryCoordinates = (isoCode) => {
    if (!isoCode || typeof isoCode !== 'string') {
        return null;
    }

    // A mapping of ISO country codes to their coordinates
    const countryCoordinates = {
      "AFG": [33.93911, 67.709953],
      "AGO": [-11.202692, 17.873887],
      "ALB": [41.153332, 20.168331],
      "ARE": [23.424076, 53.847818],
      "ARG": [-38.416097, -63.616672],
      "ARM": [40.069099, 45.038189],
      "AUS": [-25.274398, 133.775136],
      "AUT": [47.516231, 14.550072],
      "AZE": [40.143105, 47.576927],
      "BDI": [-3.373056, 29.918886],
      "BEL": [50.503887, 4.469936],
      "BEN": [9.30769, 2.315834],
      "BFA": [12.238333, -1.561593],
      "BGD": [23.684994, 90.356331],
      "BGR": [42.733883, 25.48583],
      "BHR": [25.930414, 50.637772],
      "BIH": [43.915886, 17.679076],
      "BLR": [53.709807, 27.953389],
      "BLZ": [17.189877, -88.49765],
      "BOL": [-16.290154, -63.588653],
      "BRA": [-14.235004, -51.92528],
      "BRN": [4.535277, 114.727669],
      "BTN": [27.514162, 90.433601],
      "BWA": [-22.328474, 24.684866],
      "CAF": [6.611111, 20.939444],
      "CAN": [56.130366, -106.346771],
      "CHE": [46.818188, 8.227512],
      "CHL": [-35.675147, -71.542969],
      "CHN": [35.86166, 104.195397],
      "CIV": [7.539989, -5.54708],
      "CMR": [7.369722, 12.354722],
      "COD": [-4.038333, 21.758664],
      "COG": [-0.228021, 15.827659],
      "COL": [4.570868, -74.297333],
      "CRI": [9.748917, -83.753428],
      "CUB": [21.521757, -77.781167],
      "CYP": [35.126413, 33.429859],
      "CZE": [49.817492, 15.472962],
      "DEU": [51.165691, 10.451526],
      "DJI": [11.825138, 42.590275],
      "DNK": [56.26392, 9.501785],
      "DOM": [18.735693, -70.162651],
      "DZA": [28.033886, 1.659626],
      "ECU": [-1.831239, -78.183406],
      "EGY": [26.820553, 30.802498],
      "ERI": [15.179384, 39.782334],
      "ESP": [40.463667, -3.74922],
      "EST": [58.595272, 25.013607],
      "ETH": [9.145, 40.489673],
      "FIN": [61.92411, 25.748151],
      "FJI": [-17.713371, 178.065032],
      "FLK": [-51.796253, -59.523613],
      "FRA": [46.603354, 1.888334],
      "GAB": [-0.803689, 11.609444],
      "GBR": [55.378051, -3.435973],
      "GEO": [42.315407, 43.356892],
      "GHA": [7.946527, -1.023194],
      "GNB": [11.803749, -15.180413],
      "GRC": [39.074208, 21.824312],
      "GRD": [12.262776, -61.604171],
      "GTM": [15.783471, -90.230759],
      "GUY": [4.860416, -58.93018],
      "HND": [15.199999, -86.241905],
      "HRV": [45.1, 15.2],
      "HTI": [18.971187, -72.285215],
      "HUN": [47.162494, 19.503304],
      "IDN": [-0.789275, 113.921327],
      "IND": [20.593684, 78.96288],
      "IRL": [53.41291, -8.24389],
      "IRN": [32.427908, 53.688046],
      "IRQ": [33.223191, 43.679291],
      "ISL": [64.963051, -19.020835],
      "ISR": [31.046051, 34.851612],
      "ITA": [41.87194, 12.56738],
      "JAM": [18.109581, -77.297508],
      "JOR": [30.585164, 36.238414],
      "JPN": [36.204824, 138.252924],
      "KAZ": [48.019573, 66.923684],
      "KEN": [-0.023559, 37.906193],
      "KGZ": [41.20438, 74.766098],
      "KHM": [12.565679, 104.990963],
      "KOR": [35.907757, 127.766922],
      "KWT": [29.31166, 47.481766],
      "LAO": [19.85627, 102.495496],
      "LBN": [33.854721, 35.862285],
      "LBR": [6.428055, -9.429499],
      "LBY": [26.3351, 17.228331],
      "LKA": [7.873054, 80.771797],
      "LSO": [-29.609988, 28.233608],
      "LTU": [55.169438, 23.881275],
      "LUX": [49.815273, 6.129583],
      "LVA": [56.879635, 24.603189],
      "MAR": [31.791702, -7.09262],
      "MDA": [47.411631, 28.369885],
      "MDG": [-18.766947, 46.869107],
      "MDV": [3.202778, 73.22068],
      "MEX": [23.634501, -102.552784],
      "MKD": [41.608635, 21.745275],
      "MLI": [17.570692, -3.996166],
      "MLT": [35.937496, 14.375416],
      "MMR": [21.916221, 95.955974],
      "MNE": [42.708678, 19.37439],
      "MNG": [46.862496, 103.846656],
      "MOZ": [-18.665695, 35.529562],
      "MRT": [21.00789, -10.940835],
      "MUS": [-20.348404, 57.552152],
      "MWI": [-13.254308, 34.301525],
      "MYS": [4.210484, 101.975766],
      "NAM": [-22.95764, 18.49041],
      "NCL": [-20.904305, 165.618042],
      "NER": [17.607789, 8.081666],
      "NGA": [9.081999, 8.675277],
      "NIC": [12.865416, -85.207229],
      "NLD": [52.132633, 5.291266],
      "NOR": [60.472024, 8.468946],
      "NPL": [28.394857, 84.124008],
      "NZL": [-40.900557, 174.885971],
      "OMN": [21.512583, 55.923255],
      "PAK": [30.375321, 69.345116],
      "PAN": [8.537981, -80.782127],
      "PER": [-9.189967, -75.015152],
      "PHL": [12.879721, 121.774017],
      "PNG": [-6.314993, 143.95555],
      "POL": [51.919438, 19.145136],
      "PRI": [18.220833, -66.590149],
      "PRT": [39.399872, -8.224454],
      "PRY": [-23.442503, -58.443832],
      "QAT": [25.354826, 51.183884],
      "ROU": [45.943161, 24.96676],
      "RUS": [61.52401, 105.318756],
      "RWA": [-1.940278, 29.873888],
      "SAU": [23.885942, 45.079162],
      "SDN": [12.862807, 30.217636],
      "SEN": [14.497401, -14.452362],
      "SGP": [1.352083, 103.819836],
      "SLB": [-9.64571, 160.156194],
      "SLE": [8.460555, -11.779889],
      "SLV": [13.794185, -88.89653],
      "SOM": [5.152149, 46.199616],
      "SRB": [44.016521, 21.005859],
      "SSD": [6.877, 31.307],
      "SUR": [3.919305, -56.027783],
      "SVK": [48.669026, 19.699024],
      "SVN": [46.151241, 14.995463],
      "SWE": [60.128161, 18.643501],
      "SWZ": [-26.522503, 31.465866],
      "SYR": [34.802075, 38.996815],
      "TCD": [15.454166, 18.732207],
      "TGO": [8.619543, 0.824782],
      "THA": [15.870032, 100.992541],
      "TJK": [38.861034, 71.276093],
      "TKM": [38.969719, 59.556278],
      "TLS": [-8.874217, 125.727539],
      "TON": [-21.178986, -175.198242],
      "TTO": [10.691803, -61.222503],
      "TUN": [33.886917, 9.537499],
      "TUR": [38.963745, 35.243322],
      "TWN": [23.69781, 120.960515],
      "TZA": [-6.369028, 34.888822],
      "UGA": [1.373333, 32.290275],
      "UKR": [48.379433, 31.16558],
      "URY": [-32.522779, -55.765835],
      "USA": [37.09024, -95.712891],
      "UZB": [41.377491, 64.585262],
      "VEN": [6.42375, -66.58973],
      "VNM": [14.058324, 108.277199],
      "VUT": [-15.376706, 166.959158],
      "WSM": [-13.759029, -172.104629],
      "YEM": [15.552727, 48.516388],
      "ZAF": [-30.559482, 22.937506],
      "ZMB": [-13.133897, 27.849332],
      "ZWE": [-19.015438, 29.154857]
    };
  
    // Function to get coordinates of a country given its ISO code
    const coordinates = countryCoordinates[isoCode.toUpperCase()];

    if (coordinates) {
        return {
            latitude: coordinates[0],
            longitude: coordinates[1]
        };
    } else {
        return [0, 0];
    }
}
  