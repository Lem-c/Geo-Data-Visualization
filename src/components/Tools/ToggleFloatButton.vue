<template>
    <button @click="toggle">
      {{ isVisible ? 'Hide' : 'Live Wether' }}
    </button>
</template>
  
<script>
    import { ref } from 'vue';

    export default {
    props: {
        initialVisible: {
        type: Boolean,
        default: true
        }
    },
    setup(props, { emit }) {
        const isVisible = ref(props.initialVisible);

        const toggle = () => {
        isVisible.value = !isVisible.value;
        emit('update:visible', isVisible.value);
        };

        return { isVisible, toggle };
    }
    };
</script>

<style scoped>
    button {
    /* Add styles for your button here */
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 20;
    }
</style>
  