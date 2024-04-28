<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const id = route.params.id as string;
</script>



<template>
    <div>
        ONE PLACE VIEW {{ id }}
    </div>
</template>


<style scoped>
div {
    width: 500px;
    background-color: red;
}
</style>