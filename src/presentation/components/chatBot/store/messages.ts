import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Message {
  type: string
  value: string
  time: string
  green: boolean
  payload: string
  title: string

}
// export interface MessageButton {
//   type: string
//   title: string
//   time: string
//   payload: string
// }

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])

  function addMessage(message: Message) {
    messages.value.push(message)
  }
  // function addMessageButton(message: MessageButton) {
  //   messages.value.push(message)
  // }

  function clearMessages() {
    console.log("testt from clear message")
    messages.value = []
  }

  function getMessages(): Message[] {
    return messages.value
  }

  

  return {
    messages,
    addMessage,
    // addMessageButton,
    clearMessages,
    getMessages,
  }
})
