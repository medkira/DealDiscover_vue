<script setup lang="ts">
import { defineProps, ref } from 'vue'
import Image from 'primevue/image'
import Button from 'primevue/button'

const props = defineProps({
  type: { type: String, required: true },
  value: { type: String, required: true }, // Allow string for text and array for buttons
  time: { type: String, required: true },
  title: { type: String, required: true }, // Allow string for text and array for buttons
  green: { type: Boolean, required: true }
})

import { computed } from 'vue'

const messageClass = computed(() => {
  return {
    'slot-message': props.type === 'text',
    'slot-message-button': props.type === 'buttons',
    'slot_message-image': props.type === 'image'
  }
})
</script>

<template>
  <div :class="messageClass" v-bind:class="{ green: props.green }">
    <template v-if="props.type === 'image'">
      <Image :src="props.value" alt="Image" preview/>
    </template>
    <template v-if="props.type === 'buttons'">
     
        <Button
        :label="props.title"
        :pt="{
          root: ({ props, context, parent }) => ({
            class: [
              // Primary
              {
                'hover:bg-primary-0 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300':
                  !props.link &&
                  props.severity === null &&
                  !props.text &&
                  !props.outlined &&
                  !props.plain
              }
            ]
          })
        }"
      />
      
    </template>
    <template v-else>
      <div v-if="props.type !== 'image'">{{ props.value }}</div>
    </template>
    <span v-if="$props.type !== 'buttons'">{{ props.time }}</span>
  </div>
</template>

<style scoped>



.green {
  background: rgb(228 228 231) !important;
  align-self: flex-end;
  color: #525151 !important;
  
}

.slot-message {
  font-size: 17px;
  box-shadow: rgba(0, 0, 0, 0.13) 1px 1px 1.5px 1px;
  background: #8e9eab; 
  background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab); 
  background: linear-gradient(
    to right,
    #eef2f3,
    #8e9eab
  ); 

  margin: 10px 0 0 0;
  padding: 5px 6px;
  border-radius: 8px;
  width: fit-content;
  max-width: 70%;
  /* overflow-wrap: break-word; */
}

.slot-message-button {
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.13) 1px 1px 1.5px 1px;
  background: #8e9eab; 
  background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab); 
  background: linear-gradient(
    to right,
    #eef2f3,
    #8e9eab
  ); 

  margin: 10px 0 0 0;
  padding: 5px 10px;
  border-radius: 8px;
  width: fit-content;
  /* max-width: 60%; */
  overflow-wrap: break-word;
  /* margin-right: 5px; */
  color:black;
  /* display: flex;
  flex-direction: row; */
}
.slot_message-image {
  margin: 9px 0 0 0;
  border-radius: 20%; 
  width: fit-content;
  max-width: 60%;
  overflow-wrap: break-word;
 
  color: rgb(255, 255, 255); 
}

.slot-message span {
  margin-left: 10px;
  font-size: 12px;
  color: gray;
}
</style>
