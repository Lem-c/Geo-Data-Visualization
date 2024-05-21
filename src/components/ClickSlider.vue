<template>
<div id="content-slider">
    <div class="container-fluid mt-6">
        <div class="row justify-content-center">
            <div class="col-lg-8">
            <div v-for="(content, index) in contents" :key="index" v-show="index === currentIndex">
                <h2 class="text-center">{{ content.title }}</h2>
                <p class="lead text-start mb-4">{{ content.text }}</p>
            </div>
            </div>
        </div>
    </div>
    <div class="slider-controls">
        <div class="slider-control prev" @click="prevSlide">
            <span>&lt;</span>
        </div>
        <div class="slider-control next" @click="nextSlide">
            <span>&gt;</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
data() {
    return {
    currentIndex: 0,
    contents: [
        {
        title: "Economic Health: Navigating Sustainable Urban Growth",
        text: "Economic health can have a profound impact on urban development, infrastructure, and the well-being of the population. Strong economic health ensures funding for public services such as health care, education, and transportation, which are essential components of urban life. In addition, economic strategy affects likelihood of private investment in urban areas, determining employment opportunities and influencing business patterns, all while affecting everything from housing and business development to cultural and recreational facilities. Understanding and planning for economic fluctuations is therefore essential for effectively managing sustainable urban growth.",
        },
        {
        title: "Shaping the Future City",
        text: "Economic insight is an integral part of the concept of the future city, which aims to be smarter, more sustainable, and more resilient. A city's ability to understand and adapt to economic changes and withstand economic shocks can help determine its long-term success and sustainability.",
        },
        {
        title: "The UK: A Global Economic Engine",
        text: "The UK is a key node in the global trading network, with the UK’s air, land, and sea ports being among the busiest in the world, facilitating a large number of imports and exports. The UK has a complex and diverse economic landscape, including global financial centres such as London, industrial areas in the Midlands, and emerging tech cities such as Manchester and Bristol. This diversity provides a wide range of data and scenarios for urban planning, from managing booming urban centers to revitalizing post-industrial towns.",
        },
        {
        title: "Understanding Economic Recoveries",
        text: "The COVID-19 pandemic has had an impact on the UK's economy, and London's performance in economic recovery stands out globally, demonstrating the resilience of global cities and providing a framework for economic recovery that can be used in the future.",
        },
    ],
    };
},
methods: {
    prevSlide() {
    this.currentIndex =
        this.currentIndex === 0 ? this.contents.length - 1 : this.currentIndex - 1;
    },
    nextSlide() {
    this.currentIndex =
        this.currentIndex === this.contents.length - 1 ? 0 : this.currentIndex + 1;
    },
},
};
</script>

<style scoped>
#content-slider {
    position: relative;
    height: 35vh;
}
.slider-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
}
.slider-control {
    background: rgba(255, 255, 255, 0.5);
    width: 40px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.slider-control span {
    font-size: 24px;
    color: #333;
}
</style>
