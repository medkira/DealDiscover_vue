<template>
  <div class="flex justify-center">
    <div class="flex items-start gap-2.5">
      <img
        class="w-5 h-5 rounded-full"
        src="/src/presentation/components/icons/SoundIcon.png"
        alt="Jese image"
      />
      <div class="flex flex-col gap-1">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">ChatBot</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{
            currentTime
          }}</span>
        </div>
        <div
          class="flex flex-col w-full max-w-[200px] leading-1 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
        >
          <p class="text-sm font-normal text-gray-900 dark:text-white">
            (I recommend you this restaurant you would absolutly enjoy it) || here we can put the ur
            or the location ,, we get this msg from the nodenlp process
          </p>
          <div class="group relative my-2.5">
            <div
              class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center"
            >
              <button
                data-tooltip-target="download-image"
                class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
              >
                <svg
                  class="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                  />
                </svg>
              </button>
              <div
                id="download-image"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Download image
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <img src="/src/presentation/components/icons/LogoSection.png" class="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref<Date>()

time.value = new Date()

// Compute current time string
const currentTime = time.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
</script>
