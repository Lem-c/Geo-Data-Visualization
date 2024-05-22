<template>
  <div class='tableauPlaceholder' id='viz1716305123807' style='position: relative'>
    <noscript>
      <img alt='Dashboard 2' src='https://public.tableau.com/static/images/K5/K5737MCKF/1_rss.png' style='border: none' />
    </noscript>
    <object class='tableauViz' style='display:none;'>
      <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
      <param name='embed_code_version' value='3' />
      <param name='path' value='shared/K5737MCKF' />
      <param name='toolbar' value='yes' />
      <param name='static_image' value='https://public.tableau.com/static/images/K5/K5737MCKF/1.png' />
      <param name='animate_transition' value='yes' />
      <param name='display_static_image' value='yes' />
      <param name='display_spinner' value='yes' />
      <param name='display_overlay' value='yes' />
      <param name='display_count' value='yes' />
      <param name='language' value='en-UK' />
      <param name='filter' value='publish=yes' />
    </object>
  </div>
</template>

<script>
export default {
  name: 'TableauDashboard',
  mounted() {
    var divElement = document.getElementById('viz1716305123807');
    var vizElement = divElement.getElementsByTagName('object')[0];
    vizElement.style.minWidth = '1600px';
    vizElement.style.maxWidth = '2560px';
    vizElement.style.width = '100%';
    vizElement.style.minHeight = '1027px';
    vizElement.style.maxHeight = '1527px';
    vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
