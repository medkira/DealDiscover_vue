<script setup lang="ts">
import { ref } from "vue";
// import SliderCards from '@/presentation/components/landing/SliderCards.vue';
// import { GetFavouritePlaceStore } from '@/presentation/stores/Places/GetFavouritePlacesStore';
import { GetLatestsFoodsStore } from '@/presentation/stores/Foods/GetLatestFoodStore';
import CrouselCardsFoods from '@/presentation/components/landing/CrouselCardsFoods.vue';
import { toRaw } from "vue";




//******Fetch Foods ****************/

const dataFood = ref();
const dataFood1 = ref();


const getFoodStore = GetLatestsFoodsStore();

const fetchData = async () => {
    await getFoodStore.GetLatestFoods({ page: 1 });
    dataFood.value = getFoodStore.GetLatestFoodsSuccess

    await getFoodStore.GetLatestFoods({ page: 4 });
    dataFood1.value = getFoodStore.GetLatestFoodsSuccess

    console.log(toRaw(dataFood1))
};
fetchData();

/***********************************/
</script>

<template>


    <main>
        <!-- <SliderCards title="Foods for you" sub-title="Use ChatBot for Personalized Recommendations" :data=[] /> -->

        <CrouselCardsFoods title="Best Foods Rated" sub-title="" :data=dataFood />
        <CrouselCardsFoods title="User favorites" sub-title="" :data=dataFood1 />


    </main>
</template>

<style scoped>
main {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
}
</style>