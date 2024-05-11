<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/vue-splide';
// Default theme
import '@splidejs/splide/css';
import type { Place } from "@/domain/entities/Place";
import Image from "primevue/image";
const props = defineProps<({
    title: String,
    subTitle: String,
    data: Place
})>()
// const test = computed(() => props.data)
// console.log("place data", props.data)


onMounted(() => {
    // console.log(props.data)
    // ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
})


</script>


<template>
    <!-- <h1> {{ props.data.name }}</h1> -->
    <div class="main-container">
        <Splide :options="{
            rewind: true,
            paginationKeyboard: true,
            pagination: true,
            mediaQuery: 'max',
            breakpoints: {
                1024: {
                    perPage: 1,
                },
                3000: {
                    perPage: 3,

                }
            },

        }" aria-label="Select a slide to show">
            <SplideSlide
                v-for=" element in [...props.data.placeImage, 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png', 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png']"
                :key="element">
                <div class="image-container">
                    <!-- <img :src="`/src/presentation/resources/images/Beach/${element.image}`" /> -->
                    <Image class="img" :src=element preview />


                    <!-- <div class="sub-title">{{ element.subTitle }}</div> -->
                </div>

            </SplideSlide>

        </Splide>

        <!-- <img :src=props.data.placeImage alt=""> -->
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
    font-size: 45px;
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

}



.image-container {
    height: 450px;
    // margin: 10px;
    display: flex;
    align-items: center;
    // flex-direction: column;
    justify-content: center;

    .img {
        overflow: hidden;
        object-fit: cover;
        // width: 90%;
        // width: 300px;
        // height: 85%;
        // padding-left: 10px;
        background-color: red;
        border-radius: 20px;
        cursor: pointer;
        transition: opacity 0.47ms ease-in;
        ;

        // overflow: scroll;
    }

    .img:hover {
        opacity: 75%;
    }
}

@media (max-width: 1024px) {



    .image-container {
        padding: 10px;
        height: 34vh;

        img {
            width: 90%;
            height: 40%;
        }
    }

    .sub-title {
        font-size: 15px
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