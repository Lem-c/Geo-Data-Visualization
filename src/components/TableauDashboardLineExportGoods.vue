<template>
  <div class='tableauPlaceholder' id='viz1715595483636' style='position: relative'>
    <noscript>
      <a href='#'>
        <img alt='Dashboard 2 (2)' src='https://public.tableau.com/static/images/tr/transportmode_17153706830500/Dashboard22/1_rss.png' style='border: none' />
      </a>
    </noscript>
    <object class='tableauViz' style='display:none;'>
      <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
      <param name='embed_code_version' value='3' />
      <param name='site_root' value='' />
      <param name='name' value='transportmode_17153706830500/Dashboard22' />
      <param name='tabs' value='no' />
      <param name='toolbar' value='yes' />
      <param name='static_image' value='https://public.tableau.com/static/images/tr/transportmode_17153706830500/Dashboard22/1.png' />
      <param name='animate_transition' value='yes' />
      <param name='display_static_image' value='yes' />
      <param name='display_spinner' value='yes' />
      <param name='display_overlay' value='yes' />
      <param name='display_count' value='yes' />
      <param name='language' value='en-US' />
      <param name='filter' value='publish=yes' />
    </object>
  </div>
</template>

<script>
export default {
  mounted() {
    const divElement = document.getElementById('viz1715595483636');
    const vizElement = divElement.getElementsByTagName('object')[0];
    if (divElement.offsetWidth > 800) {
      vizElement.style.minWidth = '420px';
      vizElement.style.maxWidth = '600px';
      vizElement.style.width = '100%';
      vizElement.style.height = '577px';
    } else if (divElement.offsetWidth > 500) {
      vizElement.style.minWidth = '420px';
      vizElement.style.maxWidth = '600px';
      vizElement.style.width = '100%';
      vizElement.style.height = '577px';
    } else {
      vizElement.style.width = '100%';
      vizElement.style.height = '727px';
    }

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }
}
</script>

<style scoped>
</style>
