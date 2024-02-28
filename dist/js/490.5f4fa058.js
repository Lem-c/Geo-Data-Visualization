"use strict";(self["webpackChunkgeo_exlpor_master"]=self["webpackChunkgeo_exlpor_master"]||[]).push([[490],{9490:function(e,t,a){a.r(t),a.d(t,{default:function(){return B}});var l=a(6252);const i={class:"page-header clear-filter","filter-color":"white"},n=(0,l._)("div",{class:"container"},[(0,l._)("div",{class:"content-center brand"},[(0,l._)("h1",{class:"h1-seo"},"Now UI Kit.")]),(0,l._)("h6",{class:"category category-absolute"}," Designed by bootstrap. ")],-1),o=(0,l.uE)('<div class="main"><div class="container text-center"><div class="row justify-content-md-center"><div class="col-md-12 col-lg-8"><h2 class="title">Title</h2><h5 class="description"> TEXT TEXT TEXT TEXT </h5></div></div></div></div>',1);function s(e,t,a,s,r,c){const d=(0,l.up)("header-image"),p=(0,l.up)("HeightMap");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",i,[(0,l.Wm)(d,{class:"page-header-image",style:{"background-image":"url('/img/niceView1.jpg')"}}),n]),o,(0,l.Wm)(p)])}var r=a(3577);function c(e,t,a,i,n,o){return(0,l.wg)(),(0,l.iD)("div",{style:(0,r.j5)(n.styles)},[(0,l.WI)(e.$slots,"default")],4)}function d(e,t,a){let l;return function(){const i=this,n=arguments;clearTimeout(l),l=setTimeout((()=>{l=null,a||e.apply(i,n)}),t),a&&!l&&e.apply(i,n)}}var p={name:"HeaderImage",data(){return{styles:{},debounceTimeout:6}},methods:{handleScroll(e){let t=e/3;this.styles={transform:`translate3d(0, ${t}px,0)`}},checkForParallax(e){let t=d((()=>this.handleScroll(e)),this.debounceTimeout);t()}},mounted(){let e=this;window.addEventListener("scroll",(function(){let t=this.scrollY;e.checkForParallax(t)}))}},u=a(3744);const y=(0,u.Z)(p,[["render",c]]);var m=y,h=a(9963);const f=e=>((0,l.dD)("data-v-448463cb"),e=e(),(0,l.Cn)(),e),v={class:"map-section"},_={class:"main"},g={class:"section section-images"},x=f((()=>(0,l._)("div",{class:"container"},[(0,l._)("div",{id:"map"})],-1))),k={class:"map-overlay"},b={class:"map-overlay-inner"},E=f((()=>(0,l._)("h2",null,"England and Wales Employment and Population Density 2011",-1))),w=f((()=>(0,l._)("label",null,"Jobs    ",-1))),T=f((()=>(0,l._)("label",null,"Residents",-1))),C={class:"cityfly"},H=f((()=>(0,l._)("p",{class:"credit"},[(0,l.Uk)("Data: Census 2011, Office for Nat. Statistics. Cartography: "),(0,l._)("a",{href:"http://citygeographics.org"},"citygeographics"),(0,l.Uk)(".")],-1)));function M(e,t,a,i,n,o){return(0,l.wg)(),(0,l.iD)("div",v,[(0,l._)("div",_,[(0,l._)("div",g,[x,(0,l._)("div",k,[(0,l._)("div",b,[E,(0,l._)("table",null,[(0,l._)("tr",null,[(0,l._)("td",null,[(0,l._)("input",{type:"radio",name:"layers",id:"layer1",value:"Employment",checked:"",onClick:t[0]||(t[0]=e=>i.switchLayer("Emp"))}),w,(0,l._)("input",{type:"radio",name:"layers",id:"layer2",value:"Residents",onClick:t[1]||(t[1]=e=>i.switchLayer("Res"))}),T])]),(0,l._)("tr",null,[(0,l._)("td",null,[(0,l._)("p",C,[(0,l.Uk)("Zoom To: "),(0,l._)("a",{href:"#",class:"citylink",onClick:t[2]||(t[2]=(0,h.iM)((e=>i.zoomTo("Birmingham")),["prevent"]))},"Birmingham"),(0,l.Uk)("   "),(0,l._)("a",{href:"#",class:"citylink",onClick:t[3]||(t[3]=(0,h.iM)((e=>i.zoomTo("Bristol")),["prevent"]))},"Bristol"),(0,l.Uk)("   "),(0,l._)("a",{href:"#",class:"citylink",onClick:t[4]||(t[4]=(0,h.iM)((e=>i.zoomTo("Leeds")),["prevent"]))},"Leeds"),(0,l.Uk)("   "),(0,l._)("a",{href:"#",class:"citylink",onClick:t[5]||(t[5]=(0,h.iM)((e=>i.zoomTo("London")),["prevent"]))},"London"),(0,l.Uk)("   "),(0,l._)("a",{href:"#",class:"citylink",onClick:t[6]||(t[6]=(0,h.iM)((e=>i.zoomTo("Manchester")),["prevent"]))},"Manchester"),(0,l.Uk)("   "),(0,l._)("a",{href:"#",class:"citylink",onClick:t[7]||(t[7]=(0,h.iM)((e=>i.zoomTo("Newcastle")),["prevent"]))},"Newcastle")])])])]),H])])])])])}var L=a(2262),j=a(6158),z=a.n(j),P={name:"HeightMap",setup(){const e=(0,L.iH)(null);(0,l.bv)((()=>{z().accessToken="pk.eyJ1IjoiZHVuY2FuMjAwMSIsImEiOiIyRDhtOE1nIn0.OA5QmCprkPbOoxZog8HIow",e.value=new(z().Map)({container:"map",style:"mapbox://styles/duncan2001/cjckdm9hn24qo2qmswnj13555",center:[-.5,51.5],zoom:8,pitch:50}),e.value.on("load",(()=>{e.value.setLight({color:"#fff",intensity:.15,position:[1.15,210,30]}),e.value.addControl(new(z().NavigationControl)),e.value.addLayer({id:"EngWal_Hex_Emp",type:"fill-extrusion",source:{type:"vector",url:"mapbox://duncan2001.92wzi5h7"},"source-layer":"EngWal_Hex_ResEmp_20012011b-7qjjyc",paint:{"fill-extrusion-color":{property:"Emp2011",type:"exponential",stops:[[0,"#d6f5ff"],[3e3,"#69cbf5"],[5e3,"#2e96dc"],[3e4,"#00479e"]]},"fill-extrusion-height":["/",["number",["get","Emp2011"],2],2],"fill-extrusion-opacity":.95,"fill-extrusion-opacity-transition":{duration:1e3,delay:0}}}),e.value.addLayer({id:"EngWal_Hex_Res",type:"fill-extrusion",source:{type:"vector",url:"mapbox://duncan2001.92wzi5h7"},"source-layer":"EngWal_Hex_ResEmp_20012011b-7qjjyc",paint:{"fill-extrusion-color":{property:"Res2011",type:"exponential",stops:[[0,"#fff2f2"],[5e3,"#f59c8e"],[1e4,"#e54545"],[3e4,"#730b0b"]]},"fill-extrusion-height":["/",["number",["get","Res2011"],2],2],"fill-extrusion-opacity":0,"fill-extrusion-opacity-transition":{duration:1e3,delay:0}}}),e.value.addLayer({id:"labels",type:"symbol",source:{type:"vector",url:"mapbox://duncan2001.b6rqk9s2"},"source-layer":"LabelCities2-6qmjf4",layout:{"text-field":"{Name2}","text-font":["Open Sans Bold","Arial Unicode MS Bold"],"text-size":14},paint:{"text-color":"rgba(0,0,0,0.8)","text-halo-color":"#fff","text-halo-width":1}})}))}));const t=t=>{"Emp"===t?(e.value.setPaintProperty("EngWal_Hex_Emp","fill-extrusion-opacity",.95),e.value.setPaintProperty("EngWal_Hex_Res","fill-extrusion-opacity",0)):"Res"===t&&(e.value.setPaintProperty("EngWal_Hex_Emp","fill-extrusion-opacity",0),e.value.setPaintProperty("EngWal_Hex_Res","fill-extrusion-opacity",.95))},a=t=>{let a={Birmingham:[-1.8904,52.4862],Bristol:[-2.5879,51.4545],Leeds:[-1.5491,53.8008],London:[-.1278,51.5074],Manchester:[-2.2426,53.4808],Newcastle:[-1.6178,54.9783]};e.value.flyTo({center:a[t],zoom:9,speed:.3,pitch:50})};return{switchLayer:t,zoomTo:a}}};const R=(0,u.Z)(P,[["render",M],["__scopeId","data-v-448463cb"]]);var W=R,I={name:"Home-page",bodyClass:"index-page",components:{HeaderImage:m,HeightMap:W}};const U=(0,u.Z)(I,[["render",s]]);var B=U}}]);
//# sourceMappingURL=490.5f4fa058.js.map