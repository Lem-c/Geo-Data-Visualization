<template>
    <div class='tableauPlaceholder' id='viz1715701228005' style='position: relative'>
      <noscript>
        <img alt='Dashboard 2' src='https://public.tableau.com/static/images/4_/4_17153738599580/Dashboard2/1_rss.png' style='border: none' />
      </noscript>
      <object class='tableauViz' style='display: none;'>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='site_root' value='' />
        <param name='name' value='4_17153738599580/Dashboard2' />
        <param name='tabs' value='no' />
        <param name='toolbar' value='yes' />
        <param name='static_image' value='https://public.tableau.com/static/images/4_/4_17153738599580/Dashboard2/1.png' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='language' value='zh-CN' />
        <param name='filter' value='publish=yes' />
      </object>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TableauViz',
    mounted() {
      const divElement = document.getElementById('viz1715701228005');
      const vizElement = divElement.getElementsByTagName('object')[0];
      vizElement.style.width = '100%';
      vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode.insertBefore(scriptElement, vizElement);
    }
  }
  </script>
  
  <style scoped>
  .tableauPlaceholder {
    position: relative;
  }
  
  .tableauViz {
    display: none;
  }
  </style>
  