<script setup lang="ts">
import { ref, onMounted } from "vue";
// @ts-ignore
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/vue-splide';
// Default theme
import '@splidejs/splide/css';
import router from "@/presentation/router";

import Image from 'primevue/image';

import { toRaw } from "vue";
const props = defineProps<({
    title: String,
    subTitle: String,
    data: Array<{ id: string, placeImage: any, title: String, name: String }> | undefined;
})>()

// console.log("from Crousel data", toRaw(props.data))

const navigateTo = (id: string) => {
    router.push({ name: 'place', params: { id: id } });
}





</script>


<template>




    <h1> {{ title }}</h1>
    <div class="main-container">
        <Splide :options="{
        autoplay: 'play',
        rewind: true, perPage: 3,
        paginationKeyboard: true,
        pagination: true,
    }" aria-label="Select a slide to show">
            <SplideSlide v-for=" element in props.data" :key="element.id" @click="navigateTo(element.id)">
                <div class="image-container">

                    <img :src=element.placeImage[0] />


                    <div class="sub-title">{{ element.name }}</div>
                </div>

            </SplideSlide>

        </Splide>
    </div>

</template>


<style scoped lang="scss">
.main-container {
    // background-color: rebeccapurple;
    // margin-left: 50px;
    // margin-right: 50px;
    width: 100%;
}

.card {
    width: 100%;
}

h1 {
    font-size: 3.2rem;
    text-align: start;
    // background-color: red;
    width: 93%;
    color: #f6f6f6;
    margin-bottom: -15px;
    font-weight: bolder;

}

.sub-title {
    color: #f6f6f6;
    font-size: 26px;
    padding: 10px;
    width: 80%;

    margin-top: 1rem;
}



.image-container {
    height: 450px;
    // margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;

    img {
        object-fit: cover;
        width: 90%;
        // width: 300px;
        height: 70%;
        // padding-left: 10px;

        border-radius: 20px;
        cursor: pointer;
        transition: opacity 0.47ms ease-in;
        ;
        // overflow: scroll;
    }

    img:hover {
        opacity: 75%;
    }
}

@media (max-width: 1024px) {
    .main-container {
        margin-top: -60px;
    }

    .image-container {


        img {
            width: 90%;
            height: 40%;
        }
    }

    .sub-title {
        margin-top: 1rem;
        font-size: 15px
    }

    h1 {
        margin-top: 1rem;

        font-size: 2rem;

    }
}

@media (min-width: 1024px) {
    h1 {
        padding-top: 3rem;
        padding-bottom: 2rem;
        margin-left: -50px;
    }
}
</style>

<!-- <div class="card">
    <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
            <div @click="navigateTo(slotProps.data.id)" class=" image-container m-3  w-50">
                <div class=" mb-3">

                    <div class="relative mx-auto rounded-full h-full w-full ">

                        <img :src="'src/presentation/resources/images/Beach/' + slotProps.data.image"
                            :alt="slotProps.data.name" />


</div>

</div>
<div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
<div class="flex justify-content-between align-items-center">
                    <p class="sub-title">{{ slotProps.data.subTitle }}</p>

</div>
</div>
</template>
</Carousel>
</div> -->

<!-- // this data need to be mounted in onMounted
// const elements = ref([
//     { id: "54254", image: 'bizerteBeach.jpg', name: 'Bizerte Beach' },
//     { id: "54254", image: 'MahdaiBeach.jpg', name: 'Mahdai Beach' },
//     { id: "54254", image: 'DjerbaBeach.jpg', name: 'Djerba Beach' },
//     { id: "54254", image: 'bizerteBeach.jpg', name: 'Bizerte Beach' },
//     { id: "54254", image: 'MahdaiBeach.jpg', name: 'Mahdai Beach' },
//     { id: "54254", image: 'bizerteBeach.jpg', name: 'Bizerte Beach' },
//     { id: "54254", image: 'bizerteBeach.jpg', name: 'Bizerte Beach' },
//     { id: "54254", image: 'MahdaiBeach.jpg', name: 'Mahdai Beach' },
//     { id: "54254", image: 'bizerteBeach.jpg', name: 'Bizerte Beach' },
//     { id: "54254", image: 'bizerteBeach.jpg', name: 'Bizerte Beach' },
//     { id: "54254", image: 'MahdaiBeach.jpg', name: 'Mahdai Beach' },
//     { id: "54254", image: 'bizerteBeach.jpg', name: 'Bizerte Beach' }
// ]); -->
