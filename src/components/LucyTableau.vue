<template>
  <div>
    <div class="tableauPlaceholder" id="vizContainer" style="position: relative">
      <noscript>
        <img alt="Dashboard 2" src="https://public.tableau.com/static/images/5_/5_21_17162888020900/Dashboard2/1_rss.png" style="border: none" />
      </noscript>
      <object class="tableauViz" style="display:none;">
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="5_21_17162888020900/Dashboard2" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param name="static_image" value="https://public.tableau.com/static/images/5_/5_21_17162888020900/Dashboard2/1.png" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
      </object>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableauDashboard',
  mounted() {
    this.initializeTableau();
  },
  methods: {
    initializeTableau() {
      const divElement = document.getElementById('vizContainer');
      const vizElement = divElement.getElementsByTagName('object')[0];
      vizElement.style.minWidth = '1500px';
      vizElement.style.maxWidth = '2000px';
      vizElement.style.width = '100%';
      vizElement.style.height = '1077px';
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode.insertBefore(scriptElement, vizElement);
    }
  }
};
</script>

<style scoped>
.tableauPlaceholder {
  width: 100%;
  height: 100%;
}
</style>
