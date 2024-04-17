<template>
  <div class="card">
    <Menubar
      :model="items"
      :pt="{
        root: {
          class: [
            'relative',

            // Flexbox
            'flex',
            'items-center',

            // Spacing
            'p-2',

            // Shape
            'rounded-md'

            // Color
          ]
        }
      }"
    >
      <template #start>
        <router-link to="/" class="flex items-center">
          <img src="/src/presentation/components/icons/Logo.png" alt="Company Logo" class="h-10" />
          <span class="text-lg font-bold text-blue-500">Deal</span>
          <span class="text-lg font-bold md:ml-2 mr-20">Discover</span>
        </router-link>
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span v-bind="props.label">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div class="flex items-center">
          <LoginOrRegisterDialog />

          <InputText
            placeholder="Search"
            type="text"
            class="hidden md:block w-8rem sm:w-auto ml-5"
          />
        </div>
      </template>
    </Menubar>
    <div class="flex justify-center">
      <InputText placeholder="Search" type="text" class="md:hidden w-8rem sm:w-auto ml-5" />
    </div>
    <TabMenu/>
  </div>
</template>

<script setup>
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import LoginOrRegisterDialog from '@/presentation/components/LoginOrRegisterDialog.vue'
import TabMenu from './TabMenu.vue'
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    route: '/Places'
  },
  {
    label: 'Features',
    route: '/'
  },
  {
    label: 'Projects',
    route: '/'
  },
  {
    label: 'Contact',
    route: '/'
  }
])
</script>

<style scoped>
.card {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  z-index: 1; /* Ensure the menu appears above other content */
  background-color: #fff; /* Add a background color if needed */
}




</style>
