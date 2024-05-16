<script lang="ts" setup>
import { ref, toRef, defineProps, watch, onMounted, nextTick } from 'vue'
import Dialog from 'primevue/dialog'

import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useMessageStore, type Message } from '../store/messages'
import { type PostMessage, type ResponseChatBot, postMessage } from '../services/post-message'
import { setSlots, type SetSlots } from '../services/setSlots'
import { resetSlots } from '../services/resetSlots'
import InputTextWithValidation from './InputTextWithValidation.vue'
import MessageChat from './MessageChat.vue'
import LoadingMessage from './LoadingMessage.vue'
import Button from 'primevue/button'

const props = defineProps({
  isVisible: { type: Boolean, required: true, default: false },
  position: {
    type: String as () => "center" | "top" | "bottom" | "left" | "right" | "topleft" | "topright" | "bottomleft" | "bottomright"
    , required: true, default: "bottomright"
  },
  convId: { type: String, required: true },
  convName: { type: String, required: true }
})


// const cookieAdapter = new AppCookie();
// const isAuthenticated = cookieAdapter.getTokenCookie();

const isVisibleRef = toRef(props, 'isVisible')
const positionRef = toRef(props, 'position')

const isLoading = ref(true)
const messageStore = useMessageStore()
const messages = ref(messageStore.getMessages())

watch(
  () => messageStore.getMessages(),
  (newMessages) => {
    messages.value = newMessages
  }
)

const addMessage = (message: Message) => messageStore.addMessage(message)
// const addMessageButton = (message: MessageButton) => messageStore.addMessageButton(message)

const clearMessages = () => messageStore.clearMessages()

function currentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ''
}

function processResponseMessages(data: ResponseChatBot[]) {
  for (const item of data) {
    const paramName = Object.keys(item).find((key) => key !== "recipient_id" && key !== "buttons");
    const buttons = item.buttons;
    if (paramName) {
      const paramValue = item[paramName];

      const msg = {
        type: paramName,
        value: paramValue as string, // Assuming paramValue is always a string
        time: currentTime(),
        green: false,
        payload: "", // Are you intending to set payload and title here?
        title: ""    // These are set to empty strings by default, you might want to adjust
      };
      addMessage(msg);
    }

    if (Array.isArray(buttons)) {
      for (const button of buttons) {
        if (typeof button === 'object') {
          const buttonMsg = {
            type: 'buttons',        // Specify button type
            title: button.title,    // Use button.title for the button text
            payload: button.payload,
            time: currentTime(),
            green: false,
            value: ''               // Not sure what value should be here, adjust as needed
          };
          addMessage(buttonMsg);   // Assuming you have an addMessageButton function for buttons
        }
      }
    }
  }
}



const submitButton = async (payload: string, type: string) => {
  if (type === 'buttons') {
    try {
      isLoading.value = true

      const data: PostMessage = {
        message: payload,
        sender: '12' //we, hard code it we should change this and put user token instead
      }
      const response: ResponseChatBot[] = await postMessage(data)
      setTimeout(() => {
        processResponseMessages(response)
        isLoading.value = false
      }, 0)
    } catch (error) {
      console.error(error)
    }
  }
  else {
    return
  }
}

const schema = yup.object({
  message: yup.string().max(255, '255 maximum caracter').required(' ')
})

const { handleSubmit, setValues } = useForm({
  initialValues: {
    message: ''
  },
  validationSchema: schema
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const data: PostMessage = {
      message: values.message,
      sender: '12' //we hard code it we should change this and put user token instead
    }

    const msg: Message = {
      type: 'text',
      value: values.message,
      time: currentTime(),
      green: true,
      payload: '',
      title: ''
    }

    addMessage(msg)
    setValues({ message: '' })
    isLoading.value = true
    const response: ResponseChatBot[] = await postMessage(data)

    setTimeout(() => {
      processResponseMessages(response)
      isLoading.value = false
    }, 0)
  } catch (error) {
    console.error(error)
  }
})

const onDialogShow = async () => {
  try {
    isLoading.value = true
    const slots: SetSlots = {
      sender: '12', // here we should change the user token to be the conversation id
      convId: props.convId,     // here we set a conversation id as a slots and a conversation name to deffirentiate between session
      convName: props.convName
    }

    await setSlots(slots)

    const data: PostMessage = {
      message: 'hello',
      sender: '12'
    }

    const response: ResponseChatBot[] = await postMessage(data)
    // console.log('response',response)

    processResponseMessages(response)
    isLoading.value = false
  } catch (error) {
    console.error(error)
  }
}

const onDialogBeforeHide = async () => {
  try {
    clearMessages()
    messages.value = []
    await resetSlots('12')
    console.log()
  } catch (error) {
    console.error
  }
}



</script>

<template>
  <Dialog :visible="isVisibleRef" :position="positionRef" style=" width: 25rem  
  " :pt="{
    header: {
      class: [
        // Flexbox and Alignment
        'flex items-center justify-between',
        'shrink-0',
        // Spacing
        'p-6',
        // Shape
        'border-t-0',
        'rounded-tl-lg',
        'rounded-tr-lg',
        // Colors
        'bg-surface-300 ',
        'text-surface-700'
      ]
    },
    content: ({ state, instance }) => ({
      class: [
        // Spacing
        'px-6',
        'pb-8',
        'pt-0',
        // Shape
        {
          grow: state.maximized,
          'rounded-bl-lg': !instance.$slots.footer,
          'rounded-br-lg': !instance.$slots.footer
        },
        // Colors
        'bg-surface-0 ',
        'text-surface-300 dark:text-surface-0/80',
        // Misc
        'overflow-y-auto'
      ]
    }),
    footer: {
      class: [
        // Flexbox and Alignment
        'flex items-center justify-end',
        'shrink-0',
        'text-right',
        'gap-2',
        // Spacing
        'px-6',
        'pb-6',
        // Shape
        'border-t-0',
        'rounded-b-lg',
        // Colors
        'bg-surface-300 ',
        'text-surface-700 dark:text-surface-0/50'
      ]
    },
  }" @update:visible="() => (isVisibleRef = false)" @show="onDialogShow" @hide="onDialogBeforeHide" :draggable="false">
    <template #header>
      <div class="flex">
        <div class="flex rounded-full justify-center items-center h-12 w-12 bg-zinc-200">
          <vue-feather type="message-square"></vue-feather>
        </div>
        <div class="ml-4">
          <h2 class="font-semibold">ChatBot</h2>
          <div class="flex items-center">
            <div class="rounded-full h-1.5 w-1.5 bg-green-400"></div>
            <h5 class="ml-1 text-xs font-light">Online</h5>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="messages" v-chat-scroll>
        <MessageChat v-for="(message, indice) in messages" v-bind:key="indice" :title="message.title"
          :type="message.type" :value="message.value" :time="message.time" :green="message.green"
          @click="submitButton(message.payload, message.type)" />
        <LoadingMessage v-show="isLoading" />
      </div>
    </template>
    <template #footer>
      <div class="flex">
        <InputTextWithValidation v-on:keyup.enter="onSubmit" name="message" :placeholder="'enter a message'"
          style="width: 310px" />
        <div class="flex justify-center items-center cursor-pointer">
          <vue-feather @click="onSubmit" type="send" class="send flex bg-300 pl-4"></vue-feather>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.messages::-webkit-scrollbar {
  width: 3px;

}

.messages::-webkit-scrollbar-track {
  background: rgb(245, 228, 228);
  //  margin-left: 20px;

}

.messages {
  height: 30rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
}

.messages::-webkit-scrollbar-thumb {
  background: rgb(131, 129, 129);
}


.send {
  // background-color: rgb(138, 136, 136);
  color: black;
  transition: all 0.4s;

  &:focus,
  &:active {
    color: rgb(74, 168, 222);
  }

  &:hover {
    color: rgb(74, 168, 222);
  }
}
</style>
