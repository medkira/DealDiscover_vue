<template>
  <Card
    :style="{ width: width }"
    :pt="{
      content: {
        class: ['py-0']
      },
      footer: {
        class: ['pt-0']
      },
      body: {
        class: ['p-2']
      }
    }"
  >
    <template #header>
      <div class="header-wrapper" @mouseover="showRating = true" @mouseleave="showRating = false">
        <img :src="headerImg" alt="user header" class="img"/>
        <RatingVue class="rating-overlay" v-if="showRating" />
      </div>
    </template>
    <template #title>{{ title }}</template>
    <template #subtitle>{{ subtitle }}</template>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import Card from 'primevue/card'
import RatingVue from './RatingVue.vue'

const props = defineProps({
  width: String,
  headerImg: String,
  title: String,
  subtitle: String
})

const showRating = ref(false)
</script>

<style scoped>
.header-wrapper {
  position: relative;
}

.rating-overlay {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  padding: 10px;
  display: none;
}

.header-wrapper:hover .rating-overlay {
  display: block;
}
.img{
border-radius: 8px;
}
</style>
