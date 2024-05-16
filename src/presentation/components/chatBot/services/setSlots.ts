import chatbotApi from './api-chatbot'

export interface SetSlots {
  sender: string
  convId: string
  convName: string
}

export async function setSlots(data: SetSlots) {
  const url = `/conversations/${data.sender}/tracker/events`
  const slots = [
    {
      event: 'slot',
      name: 'convId',
      value: data.convId
    },
    {
      event: 'slot',
      name: 'convName',
      value: data.convName
    }
  ]

  await Promise.all(slots.map((slot) => chatbotApi.post(url, slot)))
}




