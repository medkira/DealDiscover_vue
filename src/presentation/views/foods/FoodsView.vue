<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from "vue";
import CrouselCrads from '@/presentation/components/landing/CrouselCrads.vue';
import SliderCards from '@/presentation/components/landing/SliderCards.vue';
const datas = ref<any>('');

const route = useRoute();
const id = route.params.id as string;
const fetchData = async () => {

};
fetchData()
console.log(id);
</script>

<template>


    <main>
        <SliderCards title="Foods for you" sub-title="Use ChatBot for Personalized Recommendations" :data=[] />

        <CrouselCrads title="Best Foods Rated" sub-title="" :data=[] />
        <CrouselCrads title="User favorites" sub-title="" :data=[] />


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