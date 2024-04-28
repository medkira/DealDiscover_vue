<script setup lang="ts">
import { ref, onMounted } from "vue";
import Carousel from 'primevue/carousel';
import router from '@/presentation/router';


defineProps<({
    title: String,
    subTitle: String,
    data: Array<{ id: String, image: String, title: String }>
})>()



const navigateTo = (id: string) => {
    router.push({ name: 'place', replace: true, params: { id } });
    console.log(id)

}

onMounted(() => {
    // ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
})
// this data need to be mounted in onMounted
const products = ref([
    { id: "54254", image: 'bizerteBeach.jpg', subTitle: 'Bizerte Beach' },
    { id: "54254", image: 'MahdaiBeach.jpg', subTitle: 'Mahdai Beach' },
    { id: "54254", image: 'DjerbaBeach.jpg', subTitle: 'Djerba Beach' },
    { id: "54254", image: 'bizerteBeach.jpg', subTitle: 'Bizerte Beach' },
    { id: "54254", image: 'MahdaiBeach.jpg', subTitle: 'Mahdai Beach' },
    { id: "54254", image: 'bizerteBeach.jpg', subTitle: 'Bizerte Beach' },
    { id: "54254", image: 'bizerteBeach.jpg', subTitle: 'Bizerte Beach' },
    { id: "54254", image: 'MahdaiBeach.jpg', subTitle: 'Mahdai Beach' },
    { id: "54254", image: 'bizerteBeach.jpg', subTitle: 'Bizerte Beach' },
    { id: "54254", image: 'bizerteBeach.jpg', subTitle: 'Bizerte Beach' },
    { id: "54254", image: 'MahdaiBeach.jpg', subTitle: 'Mahdai Beach' },
    { id: "54254", image: 'bizerteBeach.jpg', subTitle: 'Bizerte Beach' }
]);

// console.log(products.value.length)
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 4
    }
]);



</script>


<template>
    <h1> {{ title }}</h1>
    <div class="card">
        <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
                <div @click="navigateTo(slotProps.data.id)" class=" image-container m-3  w-50">
                    <div class=" mb-3">

                        <div class="relative mx-auto rounded-full h-full w-full ">

                            <img :src="'src/presentation/resources/images/Beach/' + slotProps.data.image"
                                :alt="slotProps.data.name" />


                            <!-- <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute"
                                style="left:5px; top: 5px" /> -->
                        </div>

                    </div>
                    <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
                    <div class="flex justify-content-between align-items-center">
                        <p class="sub-title">{{ slotProps.data.subTitle }}</p>
                        <!-- <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div> -->
                        <!-- <span>
                            <Button icon="pi pi-heart" severity="secondary" outlined />
                            <Button icon="pi pi-shopping-cart" class="ml-2" />
                        </span> -->
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>


<style scoped lang="scss">
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
    font-size: 25px;

}

.image-container {
    img {
        // width: 100%;
        // height: 500%;
        width: 600px;
        height: 300px;

        // width: 200px;
        // height: 100px;
        border-radius: 20px;
        object-fit: cover;
        cursor: pointer;
        transition: opacity 0.47ms ease-in;
        ;
        // overflow: scroll;
    }

    img:hover {
        opacity: 75%;
    }
}
</style>