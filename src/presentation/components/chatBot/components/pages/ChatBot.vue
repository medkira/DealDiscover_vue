<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ChatDialog from '../ChatDialog.vue';
import Image from 'primevue/image';
const showChatDialog = ref(false)
const position = ref<any>('center');
const openPosition = (pos: any) => {
  position.value = pos;
  showChatDialog.value = true;
}

onMounted(() => {
  openPosition('bottomright')
})
</script>
<template>
  <div class="container" @click="openPosition('bottomright')">
    <div id="chatbot">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <div id="chatbot-corner"></div>
    <div id="antenna">
      <div id="beam"></div>
      <div id="beam-pulsar"></div>
    </div>


    <ChatDialog :is-visible="showChatDialog" :position="position" :convId="'1'" :convName="'test'"
      @update:visible="() => (showChatDialog = false)" />
  </div>

</template>


<style scoped lang="scss">
.container {
  margin: auto;
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  height: 400px;
  width: 500px;
  animation: up-down 7.5s infinite ease-in-out;

  #chatbot {
    margin: auto;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    width: 100px;
    height: 55px;
    border: 6px solid #3D3E45;
    border-radius: 5rem;
  }

  #chatbot-corner {
    margin: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    top: 105px;
    left: -65px;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 13px solid #3D3E45;
    transform: rotate(140deg);
  }

  #antenna {
    margin: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    top: -125px;
    height: 10px;
    width: 5px;
    background-color: #3D3E45;
    animation: antenna-appear 7.5s infinite ease-in-out;

    #beam {
      position: absolute;
      top: -12.5px;
      left: -5px;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: #3D3E45;
      animation: beam-appear 7.5s infinite ease-in-out;
    }

    #beam-pulsar {
      position: absolute;
      top: -12.5px;
      left: -5px;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: #3D3E45;
      animation: beam-pulsar-appear 7.5s infinite ease-in-out;
    }

  }

  .dot {
    height: 5.5px;
    width: 10.5px;
    margin: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    left: -65px;
    background-color: #3D3E45;
    border-radius: 50%;
    animation: pulse-outer 7.5s infinite ease-in-out;
  }

  .dot:nth-child(2) {
    left: 0;
    animation: pulse-inner 7.5s infinite ease-in-out;
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    left: 65px;
    animation: pulse-outer 7.5s infinite ease-in-out;
    animation-delay: 0.4s;
  }

  @keyframes pulse-inner {
    0% {
      transform: scale(1);
    }

    7.5% {
      transform: scale(1.5);
    }

    15% {
      transform: scale(1);
    }

    22.5% {
      transform: scale(1.5);
    }

    30% {
      transform: scale(1);
    }

    37.5% {
      transform: scale(1.5);
    }

    45% {
      top: 0;
      transform: scale(1);
      height: 17.5px;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      transform: rotate(-370deg);
    }

    50% {
      top: 22.5px;
      height: 10px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border-bottom-left-radius: 3rem;
      border-bottom-right-radius: 3rem;
      transform: rotate(10deg);
    }

    55% {
      transform: rotate(-10deg);
    }

    60% {
      transform: rotate(10deg);
    }

    65% {
      transform: rotate(-10deg);
    }

    65% {
      transform: rotate(0deg);
    }

    85% {
      top: 22.5px;
      height: 10px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border-bottom-left-radius: 3rem;
      border-bottom-right-radius: 3rem;
      transform: rotate(0deg);
    }

    92.5% {
      top: 22.5px;
      height: 10px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border-bottom-left-radius: 2.5rem;
      border-bottom-right-radius: 2.5rem;
      transform: rotate(0deg);
    }

    100% {
      top: 0;
      height: 17.5px;
      border-radius: 50%;
      transform: rotate(-360deg);
    }
  }

  @keyframes pulse-outer {
    0% {
      transform: scale(1);
    }

    7.5% {
      transform: scale(1.5);
    }

    15% {
      transform: scale(1);
    }

    22.5% {
      transform: scale(1.5);
    }

    30% {
      transform: scale(1);
    }

    37.5% {
      transform: scale(1.5);
    }

    45% {
      transform: scale(1);
      height: 17.5px;
    }

    55% {
      tranform: scale(1);
      height: 5px;
    }

    60% {
      height: 17.5px;
    }

    75% {
      height: 17.5px;
    }

    80% {
      tranform: scale(1);
      height: 5px;
    }

    85% {
      height: 17.5px;
    }

    100% {
      height: 17.5px;
    }
  }

  @keyframes antenna-appear {
    0% {
      visibility: hidden;
      top: -100px;
      height: 0
    }

    50% {
      visibility: hidden;
      top: -100px;
      height: 0
    }

    55% {
      visibility: visible;
      top: -125px;
      height: 20px;
    }

    95% {
      visibility: visible;
      top: -125px;
      height: 20px;
    }

    100% {
      top: -100px;
      height: 0;
    }
  }

  @keyframes beam-appear {
    0% {
      visibility: hidden;
      top: -12.5px;
      height: 0
    }

    50% {
      visibility: hidden;
      top: -12.5px;
      height: 0
    }

    55% {
      visibility: visible;
      top: -12.5px;
      height: 20px;
      width: 20px;
    }

    100% {
      visibility: visible;
      top: -12.5px;
      height: 20px;
      width: 20px;
    }
  }

  @keyframes beam-pulsar-appear {
    0% {
      visibility: hidden;
      top: -12.5px;
      height: 0
    }

    50% {
      visibility: hidden;
      top: -12.5px;
      height: 0
    }

    55% {
      visibility: visible;
      top: -12.5px;
      left: -5px;
      height: 20px;
      width: 20px;
      opacity: 1
    }

    65% {
      top: -25px;
      left: -15px;
      height: 40px;
      width: 40px;
      opacity: 0;
      visibility: visible;
    }

    74% {
      visibility: hidden;
      opacity: 0;
    }

    75% {
      visibility: visible;
      top: -12.5px;
      left: -5px;
      height: 20px;
      width: 20px;
      opacity: 1
    }

    85% {
      top: -25px;
      left: -15px;
      height: 40px;
      width: 40px;
      opacity: 0;
      visibility: visible;
    }

    94% {
      visibility: hidden;
      opacity: 0;
    }

    100% {
      visibility: hidden;
      opacity: 0;
    }
  }

  @keyframes up-down {
    0% {
      transform: translate(0);
    }

    12.5% {
      transform: translate(0, 2%);
    }

    25% {
      transform: translate(0);
    }

    37.5% {
      transform: translate(0, 2%);
    }

    50% {
      transform: translate(0);
    }

    62.5% {
      transform: translate(0, 2%);
    }

    75% {
      transform: translate(0);
    }

    87.5% {
      transform: translate(0, 2%);
    }

    100% {
      transform: translate(0);
    }
  }
}
</style>