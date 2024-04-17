<template>
  <div class="card flex justify-end p-2 mb-4 fixed right-0 top-0">
    <button
      type="button"
      class="flex bg-transparent border-none rounded-full p-3 hover:bg-white/70 cursor-pointer dark:hover:bg-gray-500/70 transition-duration-200"
      @click="toggleDarkMode"
    >
      <i :class="`dark:text-white pi ${iconClass}`"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const iconClass = ref('pi-moon')

const toggleDarkMode = () => {
  const isDark = document.documentElement.classList.contains('dark')
  document.documentElement.classList.toggle('dark', !isDark)
  iconClass.value = isDark ? 'pi-moon' : 'pi-sun'
}

// Check if dark mode is enabled on mount and set the icon accordingly
onMounted(() => {
  const isDark = document.documentElement.classList.contains('dark')
  iconClass.value = isDark ? 'pi-sun' : 'pi-moon'
})
</script>
