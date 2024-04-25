<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from "vue";
// import SearchBar from '@/presentation/components/search-bar/SearchBar.vue';
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
        <!-- <SearchBar />
        {{ datas }} -->
        <!-- <TheWelcome /> -->
        <!-- <router-view /> -->
        <div class="test">TEST</div>

    </main>
</template>

<style scoped>
.test {
    background-color: red;
    width: 100%;
}
</style>