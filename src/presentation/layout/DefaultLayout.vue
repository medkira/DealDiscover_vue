<template>
  <div class="container">
    <MenuBar />

    <slot/>
    <FooterVue class="footer"/>
  </div>
</template>

<script setup lang="ts">
import MenuBar from '@/presentation/components/MenuBar.vue'
import FooterVue from '../components/FooterVue.vue'
</script>

<style scoped>
/* .container{
  position: relative;
} */
/* Apply styles to make the footer fixed at the bottom */
/* .footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
} */
</style>
