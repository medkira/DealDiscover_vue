<template>
  <div class="card pt-40">
    <Splitter>
      <SplitterPanel
        class="flex align-items-center justify-content-center"
        :size="25"
        :minSize="10"
      >
      <div class="search-form max-w-md px-4 mx-auto mt-12">
    <h2 class="text-2xl font-bold mb-4">Find Places</h2>
    <div class="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        class="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
      />
    </div>
  </div>
      </SplitterPanel>
      <SplitterPanel :size="75">
        <div v-if="postsData.length == 0">
          <!-- Show skeleton when there's no data -->
          <SkeletonVue />
        </div>
        <div v-else>
          <DataView :value="postsData" dataKey="id">
            <template #list="{ items }">
              <!-- Show data when available -->
              <h1 class="font-bold text-3xl">Top Posts</h1>
              <hr class="grand-hr" />
              <div class="grid grid-nogutter">
                <div v-for="(item, index) in items" :key="index" class="col-12">
                  <div
                    class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                    :class="{ 'border-top-1 surface-border': index !== 0 }"
                  >
                    <div class="md:w-10rem relative">
                      <img :src="`${item.postImage}`" :alt="item.name" width="150px" />
                    </div>

                    <div
                      class="flex flex-col md:flex-column justify-content-between align-items-start gap-2"
                    >
                      <div>
                        <span class="font-medium text-secondary text-sm">{{ item.name }}</span>
                        <div class="text-lg font-medium text-900 mt-2">
                          Cuisine : {{ item.type }}
                        </div>
                      </div>
                      <div
                        class="surface-0 flex align-items-center justify-content-center py-1 px-2"
                       
                      >
                        <div
                          class="text-900 font-medium text-sm"
                          style="
                            border-radius: 20px;
                            box-shadow:
                              0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                              0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                          "
                        >
                         Location :  {{ item.location }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PostStore } from '../stores/Crud/PostStore'
import DataView from 'primevue/dataview'
import type { Post } from '@/data/response/Post'
import { appServiceClientInstance } from '@/app/factory/di'

import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import SkeletonVue from './SkeletonVue.vue'

// const postStore = PostStore()

// const posts = ref<Post[]>([])



// we get the data from the browse ia
const postsData = ref([])
onMounted(async () => {
  const res = await appServiceClientInstance.getPostData()
  console.log(res.result.capturedLists['restaurant posts in sousse'])

  postsData.value = res.result.capturedLists['restaurant posts in sousse']
})

// here we get the data from our database
// onMounted(async () => {
//   await postStore.getTopPost({ sortBy: 'likes', limit: 5 })
//   // Assuming getTopPost returns a Promise
//   products.value = postStore.getPosts

//   console.log('posts', products.value[0].title)
// })

// const sortKey = ref()
// const sortOrder = ref()
// const sortField = ref()
// const sortOptions = ref([
//   { label: 'Price High to Low', value: '!price' },
//   { label: 'Price Low to High', value: 'price' }
// ])
// const onSortChange = (event) => {
//   const value = event.value.value
//   const sortValue = event.value

//   if (value.indexOf('!') === 0) {
//     sortOrder.value = -1
//     sortField.value = value.substring(1, value.length)
//     sortKey.value = sortValue
//   } else {
//     sortOrder.value = 1
//     sortField.value = value
//     sortKey.value = sortValue
//   }
// }
// const getSeverity = (product) => {
//   switch (product.inventoryStatus) {
//     case 'INSTOCK':
//       return 'success'

//     case 'LOWSTOCK':
//       return 'warning'

//     case 'OUTOFSTOCK':
//       return 'danger'

//     default:
//       return null
//   }
// }
</script>

<style scoped>
.grand-hr {
  border: none;
  height: 3px;
  background-color: black;
  margin: 20px 0;
}

.search-form {
  background-color: #f3f4f6; /* Set the background color */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Drop shadow */
  height: 400px;
}
</style>
