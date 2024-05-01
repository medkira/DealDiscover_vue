<script setup lang="ts">
import router from '@/presentation/router';
import { ref } from 'vue';

const items = ref([{ message: 'Foo' }, { message: 'Bar' }, { message: 'Foo' }, { message: 'Foo' }, { message: 'Bar' }, { message: 'Foo' }])
defineProps<({
    title: String,
    subTitle: String,
    data: any[]
})>()



const navigateTo = (id: string) => {
    router.push({ name: 'place', replace: true, params: { id: "placesId" } });
    console.log(id)
}
</script>


<template>
    <h1>{{ title }}</h1>
    <!-- <Button @click="navigateTo('1')">HI</Button> -->

    <h2 class="subtitle">{{ subTitle }}</h2>
    <div class="more-explore">

        <div v-for="( item, index ) in  items " :key="item.message">
            {{ index }}

        </div>
    </div>
</template>


<style scoped lang="scss">
h1 {
    font-size: 45px;
    text-align: start;
    // background-color: red;
    width: 93%;
    color: #f6f6f6;
    margin-bottom: -15px;
    font-weight: bolder;
}

.subtitle {
    font-size: 24px;
    width: 93%;

    color: #dcd9d9;
    margin-top: -17px;
    // margin-bottom: 10px;
    font-weight: normal;
}

.more-explore {
    padding: 37px;
    background-color: rgb(#f6f6f6, 0.17);
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: scroll;


    div {
        background-color: #243c54;
        margin: 10px;
        padding: 0 275px;
        height: 300px;
        border-radius: 20px;
    }
}

@media (max-width: 1024px) {
    .more-explore {
        div {
            padding: 0 150px;
            height: 150px;
        }
    }
}
</style>