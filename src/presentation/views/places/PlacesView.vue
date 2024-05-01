<script setup lang="ts">
import { useRoute } from 'vue-router';
import { appServiceClientInstance } from '@/app/factory/di';

import { ref } from "vue";
import TheWelcome from '@/presentation/components/TheWelcome.vue';
import 'deep-chat';
import type { RequestInterceptor, ResponseInterceptor } from 'deep-chat/dist/types/interceptors';
const datas = ref<any>('');

const route = useRoute();
// const id = route.params.id as string;
// const fetchData = async () => {
//     // const res = await appServiceClientInstance.getLatestPost({ page: id });
//     // console.log(res);
//     datas.value = res.data.data;
//     return res;
// };
// fetchData()
// console.log(id);

const constinitialMessages = [
    { role: 'user', text: 'Hey, how are you today?' },
    { role: 'ai', text: 'I am doing very well!' },
]

const requestInterceptor: RequestInterceptor = (details) => {
    details.body = {
        message: details.body.messages[0].text
    }
    // console.log(details)
    return details;
}

const responseInterceptor: ResponseInterceptor = (details) => {
    console.log("Response ", details[0].text)
    return { text: details[0].text }
    // return details
}


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

        <deep-chat :request="{
            url: 'http://0.0.0.0:5005/webhooks/rest/webhook',
            method: 'POST',
        }" :requestInterceptor="requestInterceptor" :responseInterceptor="responseInterceptor" class="deep-chat"
            :demo="false" :introMessage="{ text: 'Hi I am your recommendation assistant, ask me anything!' }" />


    </main>
</template>

<style scoped>
main {
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
}
</style>
