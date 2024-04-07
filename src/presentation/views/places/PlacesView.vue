<script setup lang="ts">
import { useRoute } from 'vue-router';
import { appServiceClientInstance } from '@/app/factory/di';
import { ref } from "vue";

const datas = ref<any>('');

const route = useRoute();
const id = route.params.id as string;
const fetchData = async () => {
    const res = await appServiceClientInstance.getLatestPost({ page: id });
    console.log(res);
    datas.value = res.data.data;
    return res;
};
fetchData()
console.log(id);
</script>

<template>
    <main>
        TEST
        {{ datas }}
        <!-- <TheWelcome /> -->
        <!-- <router-view /> -->
    </main>
</template>
