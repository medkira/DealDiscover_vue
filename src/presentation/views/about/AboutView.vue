<script setup lang="ts">
import { appServiceClientInstance } from '@/app/factory/di';
import type { AxiosResponse } from 'node_modules/axios/index.cjs';

function isAxiosResponse<T>(response: any): response is AxiosResponse<T> {
  return response && typeof response === 'object' && 'status' in response && 'data' in response;
}
const fetchData = async () => {
  // const res = await appServiceClientInstance.getLatestPost({ page: "5" });
  // console.log(res);
  // return res;
};


</script>




<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <!-- <button @click="fetchData" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
    Fetch Data
  </button> -->
</template>

<style>
/* .about {
  max-height: 100vh;
  display: flex;
  align-items: center;
} */

/* 
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
