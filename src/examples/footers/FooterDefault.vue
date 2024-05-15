<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "Made by Material Kit 2",
      logo: logoDark,
      route: "/"
    })
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/creativetimofficial"
      },
    ]
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String
    },
    default: () => [
      {
        name: "Info",
        items: [
          {
            name: "about us",
            href: "https://github.com/Lem-c/vue-mapkit"
          },
        ]
      },
    ]
  }
});
</script>
<template>
  <footer class="footer pt-3 mt-3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mb-4 ms-auto">
          <div>
            <a :href="brand.route">
              <img :src="brand.logo" class="mb-3 footer-logo" alt="main_logo" />
            </a>
            <h6 class="font-weight-bolder mb-3 text-light">{{ brand.name }}</h6>
          </div>
          <div>
            <ul class="d-flex flex-row ms-n3 nav">
              <li
                class="nav-item"
                v-for="{ icon, link } of socials"
                :key="link"
              >
                <a
                  class="nav-link pe-1 text-light"
                  :href="link"
                  target="_blank"
                  v-html="icon"
                >
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-md-2 col-sm-6 col-6 mb-4"
          v-for="{ name, items } of menus"
          :key="name"
        >
          <h6 class="text-sm text-light">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item " v-for="item of items" :key="item.name">
              <a class="nav-link text-light" :href="item.href" target="_blank">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-12">
          <div class="text-center">
            <p class="text-light my-4 text-sm font-weight-normal">
              @CASA0003
              {{ new Date().getFullYear() }} 
              Group Mini Project
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
