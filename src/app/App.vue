<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LandingView from '@/presentation/views/landing/LandingView.vue'
</script>

<template>
  <!-- <img alt="Vue logo" class="logo" src="@/presentation/resources/assets/logo.svg" width="125" height="125" /> -->
  <component :is="$route.meta.layout">
    <RouterView />
  </component>
</template>
