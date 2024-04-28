<script setup lang="ts">
import { useRoute } from 'vue-router';
import { appServiceClientInstance } from '@/app/factory/di';

import { ref } from "vue";
import TheWelcome from '@/presentation/components/TheWelcome.vue';
import 'deep-chat';
const datas = ref<any>('');

const route = useRoute();
const id = route.params.id as string;
const fetchData = async () => {
    const res = await appServiceClientInstance.getLatestPost({ page: id });
    // console.log(res);
    datas.value = res.data.data;
    return res;
};
fetchData()
// console.log(id);

const constinitialMessages = [
    { role: 'user', text: 'Hey, how are you today?' },
    { role: 'ai', text: 'I am doing very well!' },
]



</script>

<template>
    <main>
        <!-- {{ datas }} -->
        <!-- <div class="pt-10 pb-10">
        </div> -->
        <!-- <TheWelcome />
        <TheWelcome /> -->
        <!-- <div data-aos="fade-up" data-aos-duration="2800" data-aos-anchor-placement="center-center">
            <h1 class="text">Thinking About Exploring El Jams!</h1>
            <img src="/src/presentation/resources/images/photoElJam.jpg" alt="" />

        </div> -->
        <!-- <router-view /> -->

        <deep-chat :demo="false" :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
            :initialMessages="initialMessages" />
    </main>
</template>

<style scoped>
main {
    /* height: 9000px; */
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
}
</style>