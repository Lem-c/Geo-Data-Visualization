if(!self.define){let a,i={};const e=(e,t)=>(e=new URL(e+".js",t).href,i[e]||new Promise((i=>{if("document"in self){const a=document.createElement("script");a.src=e,a.onload=i,document.head.appendChild(a)}else a=e,importScripts(e),i()})).then((()=>{let a=i[e];if(!a)throw new Error(`Module ${e} didn’t register its module`);return a})));self.define=(t,c)=>{const o=a||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let s={};const l=a=>e(a,o),u={module:{uri:o},exports:s,require:l};i[o]=Promise.all(t.map((a=>u[a]||l(a)))).then((a=>(c(...a),s)))}}define(["./workbox-6567b62a"],(function(a){"use strict";a.setCacheNameDetails({prefix:"geo_exlpor_master"}),self.addEventListener("message",(a=>{a.data&&"SKIP_WAITING"===a.data.type&&self.skipWaiting()})),a.precacheAndRoute([{url:"/Geo-Data-Visualization/css/490.c3e4d487.css",revision:null},{url:"/Geo-Data-Visualization/css/580.be3f8a98.css",revision:null},{url:"/Geo-Data-Visualization/css/953.e1a78dc5.css",revision:null},{url:"/Geo-Data-Visualization/css/app.f1d5f53b.css",revision:null},{url:"/Geo-Data-Visualization/css/chunk-vendors.287d4d31.css",revision:null},{url:"/Geo-Data-Visualization/data/CityData_WUP2018_top20.csv",revision:"acb69a6039e48505d1874cb501f2ded2"},{url:"/Geo-Data-Visualization/data/gadm41_GBR_2.json",revision:"bee2f5b31295c83e601255ed81997fdf"},{url:"/Geo-Data-Visualization/data/possibleLink.txt",revision:"750ec9c040403949a1737074dbe2bf72"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000000000.csv",revision:"13ffdcf70fb2f78763533bc3177d9443"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000003005.csv",revision:"dcc0c9f17567e3bc194d8e31c9ed4a35"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000003026.csv",revision:"4412d876188b0d9a54d2bba26ea830e4"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000003162.csv",revision:"c32cd0bbfb8cb0afcd4450074b1e7539"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000003302.csv",revision:"2da5d9adb746ef0db7bdf583800ee5e7"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000003377.csv",revision:"56e01d54d091593c6e3a274b2b421e8a"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000003808.csv",revision:"57f24e78fb18c0833486ff4288945708"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000044841.csv",revision:"09961e47e4d3503cf3904e6af114c8bc"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000047811.csv",revision:"3623a590f819f41696550d7cde642dbd"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000056225.csv",revision:"2131cdc1dac2d0a004acf5a9db2d9f90"},{url:"/Geo-Data-Visualization/data/uk_climate/UK000070765.csv",revision:"29e68822f9fe90269d054fe2362ee6fa"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00100808.csv",revision:"c2bec238de70fee5ffb2a0e249928fae"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00102158.csv",revision:"0f69d2fef1606dbc644542841afb7abb"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105003.csv",revision:"d9f3c562a626e5bd457d1cffa5164234"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105630.csv",revision:"24f37717665b3683764dd7605005bd41"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105636.csv",revision:"c0a5da86da7aedeb0f16bd4864aed772"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105642.csv",revision:"e324707811a3244d72d1b16298e021e5"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105648.csv",revision:"341a1e008068b7a3a5622cd2ef1ffc8d"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105651.csv",revision:"0b50cd383f8d91848c93150c3375f808"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105657.csv",revision:"557f5bb57407a9f7f6d391f4f57db910"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105660.csv",revision:"684d17e4f7c4298cc7527bfa7f34cdfb"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105669.csv",revision:"44e6252cdffbd65d4884870e586461b8"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105672.csv",revision:"81bb24da79a82ba48452fe428564efaa"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105675.csv",revision:"49d9e6e0e3006490e72bddd4094ea1d8"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105681.csv",revision:"5aa0d3cf7a34da66fe784a78a322e701"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105856.csv",revision:"96888366fbade5a6cdea44516aeaa4b8"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105857.csv",revision:"1b6e05009a5aaf6160224943d49830a5"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105858.csv",revision:"e077e2fe31184d2b336bd6036221a9b0"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105860.csv",revision:"c5def0c7ba8272b4d181176ebb53378b"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105861.csv",revision:"6c4eb4b50512af1cd342fb11ede04baf"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105862.csv",revision:"fe09c72b6518adf56b52aa621f26262f"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105863.csv",revision:"e8221e562091d14ef4a664a727ee28a0"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105864.csv",revision:"ad07a3d1d3a4417b06557a5dc27d1413"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105865.csv",revision:"77286618c23f0273be0c85bcff60f88e"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105866.csv",revision:"6564599d822140cdda53f692c142a2f4"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105867.csv",revision:"49ad2f1987ea4488d8f992c5829dc7cb"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105869.csv",revision:"15e655ef208820bd3fae22373dbb1064"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105870.csv",revision:"a59270086d5c46276780118748280d05"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105871.csv",revision:"902403c5947de69d859dbc6c3fa5b5b7"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105872.csv",revision:"62ca90ec249c6f1525531f461f390af0"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105873.csv",revision:"9c562466f6041970412e72cd6a0c8b17"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105874.csv",revision:"f138830e3e8986d3bd441e83f504b27e"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105875.csv",revision:"a1a88e90d6fe53b4d07275acba0b448b"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105876.csv",revision:"459a16b310d1e70f2b650a8f8e7df76a"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105877.csv",revision:"85003092f92e48d7efc8d8d84b46ec8e"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105878.csv",revision:"df1541a5ce02b42e235d85879f7d9a5f"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105880.csv",revision:"b6b70ae6d71726448207416d7e704bd5"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105881.csv",revision:"32be370437d1cb3dd875638bca16a7c2"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105882.csv",revision:"1c6e954b9b37b992f3640f31c6aca4f0"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105884.csv",revision:"eb99eabcab0e45020f53c37234e49d74"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105885.csv",revision:"11bbbf41609f26caead6ece5ae983863"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105886.csv",revision:"af6b3bb36f8f1d0c9b7f6377f9dd48fb"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105887.csv",revision:"4d566c8b48aed1a821635e04244faa6b"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105888.csv",revision:"5222f5b8d0ccae74412d5185ed376336"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105889.csv",revision:"78511549fb4107f79ac5784369bc06c3"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105890.csv",revision:"308cc785cd0ef83f6824b92db367d472"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105891.csv",revision:"7748c4f4ac904df026eb19c9a6f8da6f"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105892.csv",revision:"bc3e50921b3c040166635c1d615f0617"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105893.csv",revision:"a36af397233317b3e2865cdda2ef1d16"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105894.csv",revision:"8dd5d6f5d55dc316cbc32fbb3c34580e"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105895.csv",revision:"6c8cf0e459e682cd1fe068346309c103"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105897.csv",revision:"cf04feb2cfe6717655cbd76dcc4794b0"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105898.csv",revision:"b92cc732b6a29576219bb4d335088c52"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105899.csv",revision:"f129d290bd45b29dd6600919f62e9b6a"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105900.csv",revision:"c79946169b636078ccfcabfd280014a1"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105901.csv",revision:"3f186dbae1d866a4cd44333aa213010f"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105902.csv",revision:"a2e1a24c0a10d2b5a294089bac3a1953"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105903.csv",revision:"979f820d470b58b693f77e194f72b40e"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105904.csv",revision:"55bb5753b5c9b53a83c648a28f186076"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105905.csv",revision:"247b13df1cdd5f63121da95c57054583"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105906.csv",revision:"99259c3604f5ceb55ec83c44a5a183ac"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105907.csv",revision:"4059d805a30b5681a887c768204daeb7"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105908.csv",revision:"4c62e493629e9920d1682f38d6228514"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105909.csv",revision:"d30f5a40b036ebc6434d3201677b1a5f"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105910.csv",revision:"669612235f71816be07fc2afedd7348b"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105911.csv",revision:"2b101ad325159a46e53c325af58f1a24"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105912.csv",revision:"79c781840dff8d13a0d8bbe4ccbb53cd"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105913.csv",revision:"bc604e0fe531e4e5273d1f7f1210bcbb"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105914.csv",revision:"c905b73f00b4ead8a5c57bc45dd09dc1"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105915.csv",revision:"07da0a63f42644ae24b5c384f59df954"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105917.csv",revision:"f9e8640cdfedf55b5f117dfb03b0ac25"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105918.csv",revision:"4f18c36e955d47073e4aa81066e67590"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105919.csv",revision:"52280728f4d698cd63579fc0cb5f3684"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105920.csv",revision:"48339a5a050f8182a812db0f05f41a19"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105921.csv",revision:"b6ec2327b15ce4563ee92eb735b1a2a6"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105922.csv",revision:"fdab2dce2385efd2b6b4d0ed70f3b34e"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105923.csv",revision:"d39708c5fa13513760d77b5bd9d75eb4"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105924.csv",revision:"a4c33bddeac1687557ebd37d2c6f0d49"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105925.csv",revision:"bebee73774cde9b53e93742ee66b7d1c"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105926.csv",revision:"ceaff9a511d04a327df372b84cba7690"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105927.csv",revision:"0b10334c6e320abe6e00e58c9007eb25"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105929.csv",revision:"efac150a57feee4241b6c75033a126e2"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105930.csv",revision:"f9e3fcb224a72e19e9cc408c4ddcc8a7"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105931.csv",revision:"02e4ef2adc30c2b250818ec47eac8f0a"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105932.csv",revision:"73f83defac7a0ee37989412b69d59f8e"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00105933.csv",revision:"434ed64ca422b826b87e2330b08384ee"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00107640.csv",revision:"46c705195617580e276c4d960ea25792"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00107650.csv",revision:"a71693d17e134e2ab679e69ec9b77174"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00107663.csv",revision:"c1ebf26be49b62738aa783005e8f273e"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00107962.csv",revision:"0403e7ec9a19bcfcbc82b2e29791efcf"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00108854.csv",revision:"aa1e18c84ddae9d007d903c6cc3f2647"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00108855.csv",revision:"9c8ec8c8afa41aefe9fc7307170fb78d"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00115807.csv",revision:"5938843fdc26945a5df0a991d7873acc"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00115811.csv",revision:"d9de5080f5acc29f6b8b91971c111053"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156832.csv",revision:"657c14c79a1a62c1d82fc546e7c68873"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156836.csv",revision:"69142d2257ef05312563f5505ce5b858"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156840.csv",revision:"aeb81bc94213abcf82d5bd4dc280f99b"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156844.csv",revision:"3fab2feac798111fdd41c5f092603a4b"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156848.csv",revision:"31ea6aa059f21e1662bf7225718fa637"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156852.csv",revision:"5e46cccaa63fe04df1005338b004a7bf"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156856.csv",revision:"6d24e856a1fb474282e15cc2a506d8ba"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156860.csv",revision:"bdab20d929dd35247971ebf85b90ecdc"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156864.csv",revision:"e616199b4326793ccdd20a1d0897742a"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156868.csv",revision:"5e2e608a72c3b451d23c5fcd4145ab22"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156872.csv",revision:"56b91c6312a7fc4706e764f74ca5c4f3"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156876.csv",revision:"ef35fab5a9db15185a41bf6c757fa932"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156880.csv",revision:"9bf50b5695a038f446197ceab42bf3fa"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156884.csv",revision:"d87472184deb7d4eacefd25d2781a4ad"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/UKE00156888.csv",revision:"069de90a8ef21cd6112bac9e4dbb2e98"},{url:"/Geo-Data-Visualization/data/uk_climate/UKE/getdata.py",revision:"3329c5bbb579768bcf9a9cbf3ef035d9"},{url:"/Geo-Data-Visualization/fonts/nucleo-outline.36b2c213.woff",revision:null},{url:"/Geo-Data-Visualization/fonts/nucleo-outline.42641a7a.ttf",revision:null},{url:"/Geo-Data-Visualization/fonts/nucleo-outline.451337d2.woff2",revision:null},{url:"/Geo-Data-Visualization/fonts/nucleo-outline.99a79663.eot",revision:null},{url:"/Geo-Data-Visualization/img/niceView1.jpg",revision:"e3e43fdef96e7fbb261649bda9de22c4"},{url:"/Geo-Data-Visualization/img/niceView2.jpg",revision:"6640885322256a03fe8579b33619e61c"},{url:"/Geo-Data-Visualization/index.html",revision:"edaa0a54eee96a2bbf6e469a855aaf3d"},{url:"/Geo-Data-Visualization/js/158.632d12b2.js",revision:null},{url:"/Geo-Data-Visualization/js/411.b4cfd208.js",revision:null},{url:"/Geo-Data-Visualization/js/490.991095e5.js",revision:null},{url:"/Geo-Data-Visualization/js/580.1f5c1fdf.js",revision:null},{url:"/Geo-Data-Visualization/js/953.2274615f.js",revision:null},{url:"/Geo-Data-Visualization/js/app.0f612cce.js",revision:null},{url:"/Geo-Data-Visualization/js/chunk-vendors.27520736.js",revision:null},{url:"/Geo-Data-Visualization/manifest.json",revision:"16bd6ae7ac8b445c06367570da3e00a2"},{url:"/Geo-Data-Visualization/message.png",revision:"8ab3b92b863dad11693abaddfa3a84bf"},{url:"/Geo-Data-Visualization/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"},{url:"/Geo-Data-Visualization/station.png",revision:"5aa2eb208cbe382fa2337a419cd26010"}],{})}));
//# sourceMappingURL=service-worker.js.map
