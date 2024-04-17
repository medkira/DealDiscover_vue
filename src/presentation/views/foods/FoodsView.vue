<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from "vue";

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
        TEST
        {{ datas }}
        <!-- <TheWelcome /> -->
        <!-- <router-view /> -->
    </main>
</template>
