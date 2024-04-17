<template>
  <TabMenu :model="itemss">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a
          v-ripple
          :href="href"
          v-bind="props.action"
          @click="navigate"
          :class="{ active: $route.path === item.route }"
        >
          <span v-bind="props.label">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span v-bind="props.label">{{ item.label }}</span>
      </a>
    </template>
  </TabMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabMenu from 'primevue/tabmenu'

const itemss = ref([

  { label: 'Dashboard', route: '/' },
  { label: 'Foods' },
  { label: 'Places', route: '/Places' },
  { label: 'Posts', route: '/Posts' }
])
</script>

<style scoped>
.card {
  margin-top: 90px; /* Adjust the margin to push the TabMenu below the Menubar */
}
.active {
  border-color: #3b82f6;
  color: #3b82f6;
}
</style>
