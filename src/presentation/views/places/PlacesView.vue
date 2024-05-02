<script setup lang="ts">
import { placeTypes } from '@/domain/entities/Place';
import CrouselCrads from '@/presentation/components/landing/CrouselCrads.vue';
import SliderCards from '@/presentation/components/landing/SliderCards.vue';
import { GetLatestsPlacesStore } from '@/presentation/stores/Places/GetLatestPlacesStore';
import { toRaw, isProxy, ref } from 'vue';

const dataHotel = ref();
const dataRestaurants = ref();
// let data: any;
const getPlacesStore = GetLatestsPlacesStore();

const fetchData = async () => {
    await getPlacesStore.GetLatestPlaces({ page: 1, type: placeTypes.hotel })
    dataHotel.value = toRaw(getPlacesStore.GetLatestPlacesSuccess);

    await getPlacesStore.GetLatestPlaces({ page: 1, type: placeTypes.restaurant })
    dataRestaurants.value = toRaw(getPlacesStore.GetLatestPlacesSuccess);
    // console.log(data);
};
fetchData();




</script>

<template>
    <main>


        <!-- <deep-chat :request="{
            url: 'http://0.0.0.0:5005/webhooks/rest/webhook',
            method: 'POST',
        }" :requestInterceptor="requestInterceptor" :responseInterceptor="responseInterceptor" class="deep-chat"
            :demo="false" :introMessage="{ text: 'Hi I am your recommendation assistant, ask me anything!' }" /> -->
        <SliderCards title="Foods for you" sub-title="Use ChatBot for Personalized Recommendations" :data=[] />

        <CrouselCrads title="Best Hotels Rated" sub-title="" :data=dataHotel />
        <CrouselCrads title="User favorites" sub-title="" :data=dataRestaurants />



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

/* main {
/* height: 9000px; */
display: flex;
align-items: center;
justify-content: center;

.deep-chat {
border-radius: 20px;
background-color: aqua;
}
}


img {
display: block;
width: 100%;
border-radius: 20px;
}

.text {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
font-size: 40px;
color: black;
} */