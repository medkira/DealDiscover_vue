<template>
  <div class="cont">
    <h1 class="ml-36 font-bold text-3xl mb-2">Latest Places</h1>
    <div class="background-half"></div> <!-- New element for the background color -->

    <div class="card-container">
      <!-- Render each CardItem individually -->
      <CardItem class="card-item" @click="visible1 = true" v-if="displayedCards.length > 0" :key="displayedCards[0].id"
        :width="cardWidth" :headerImg="displayedCards[0].place_image[0]" :title="displayedCards[0].name"
        :subtitle="displayedCards[0].location" style="margin-top: 2rem;" />
      <Dialog v-model:visible="visible1" maximizable modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <h1 class="text-2xl mb-4">{{ displayedCards[0].name }}</h1>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
      <CardItem class="card-item" @click="visible2 = true" v-if="displayedCards.length > 1" :key="displayedCards[1].id"
        :width="cardWidth" :headerImg="displayedCards[1].place_image[0]" :title="displayedCards[1].name"
        :subtitle="displayedCards[1].location" style="margin-top: 2rem;" />
      <Dialog v-model:visible="visible2" maximizable modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <h1 class="text-2xl mb-4">{{ displayedCards[1].name }}</h1>

        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
      <CardItem class="card-item" @click="visible3 = true" v-if="displayedCards.length > 2" :key="displayedCards[2].id"
        :width="cardWidth" :headerImg="displayedCards[2].place_image[0]" :title="displayedCards[2].name"
        :subtitle="displayedCards[2].location" style="margin-top: 2rem;" />
      <Dialog v-model:visible="visible3" maximizable modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <h1 class="text-2xl mb-4">{{ displayedCards[2].name }}</h1>

        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
      <CardItem class="card-item" @click="visible4 = true" v-if="displayedCards.length > 3" :key="displayedCards[3].id"
        :width="cardWidth" :headerImg="displayedCards[3].place_image[0]" :title="displayedCards[3].name"
        :subtitle="displayedCards[3].location" style="margin-top: 2rem;" />
      <Dialog v-model:visible="visible4" maximizable modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <h1 class="text-2xl mb-4">{{ displayedCards[3].name }}</h1>

        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
      <CardItem class="card-item" @click="visible5 = true" v-if="displayedCards.length > 4" :key="displayedCards[4].id"
        :width="cardWidth" :headerImg="displayedCards[4].place_image[0]" :title="displayedCards[4].name"
        :subtitle="displayedCards[4].location" style="margin-top: 2rem;" < />
      <Dialog v-model:visible="visible5" maximizable modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <h1 class="text-2xl mb-4">{{ displayedCards[4].name }}</h1>

        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
      <CardItem class="card-item" @click="visible6 = true" v-if="displayedCards.length > 5" :key="displayedCards[5].id"
        :width="cardWidth" :headerImg="displayedCards[5].place_image[0]" :title="displayedCards[5].name"
        :subtitle="displayedCards[5].location" style="margin-top: 2rem;" />
      <Dialog v-model:visible="visible6" maximizable modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <h1 class="text-2xl mb-4">{{ displayedCards[5].name }}</h1>

        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </div>
    <div class="card">
      <Paginator :pt="{
        root: {
          class: [
            // Flex & Alignment
            'flex items-center justify-center flex-wrap',

            // Spacing
            'px-4 py-2',

            // Shape
            'border-0',


          ]
        },
      }" v-model:first="first" :rows="1" :totalRecords="total"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
// import Paginator from 'primevue/paginator'
// import CardItem from './CardItem.vue'
// import { appServiceClientInstance } from '@/app/factory/di'
// import { ErrorHandler, type Failure } from '../../data/network/error_handler' // Import Failure directly
// import { PlaceStore } from '../stores/Crud/PlaceStore'
// import type { Place } from '@/data/response/place'
// import Dialog from 'primevue/dialog';
// import RatingVue from './RatingVue.vue'
const placeStore = PlaceStore()
const cardsData = ref<Place[]>([])
const total = ref(0)
const first = ref(0)
const cardWidth = ref('20rem') // Adjust the default card width as needed
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);



const fetchData = async () => {
  const currentPage = Math.floor(first.value / 3) + 1
  await placeStore.getLatestPlace({ page: currentPage })
  if (!placeStore.getStatusMessage) {
    cardsData.value = placeStore.getPlaces
    console.log(cardsData.value)
    console.log("totalpage first", total.value)
    total.value = (placeStore.total / 2) + 1
    console.log("tottal pages", total.value)
  } else {
    console.error('Error fetching data:', placeStore.getStatusMessage)
  }
}

onMounted(async () => {
  await fetchData()
})

const displayedCards = computed(() => {
  const startIndex = first.value % 4
  console.log("start index ", startIndex)
  const res = cardsData.value.slice(startIndex, startIndex + 3)
  console.log(res)
  return res
})
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;

}

.card-item {
  flex: 0 0 auto;
  border-radius: 10px;
  border: 2px solid #2E86C6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.603);
  /* Add shadow */
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card-item:hover {
  transform: translateY(-5px);
}

.cont {
  position: relative;
  padding-top: 1rem;
  /* Adjust padding as needed */
}

.background-half {
  position: absolute;
  top: 50%;
  bottom: 50%;
  /* Start from the middle of the container */
  width: 100%;
  /* Cover the remaining half of the container */
  height: 240px;
  background-color: #D2F1F6;
  /* Set background color */
  z-index: -1;
  /* Ensure it stays behind other content */
}
</style>
