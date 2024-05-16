import chatbotApi from './api-chatbot'

export async function resetSlots(sender: string) {
  console.log('testt from resetSlots')
  const url = `/conversations/${sender}/tracker/events`
  const slots = [
    {
      event: 'slot',
      name: 'convId',
      value: null
    },
    {
      event: 'slot',
      name: 'convName',
      value: null
    },
    {
      event: 'slot',
      name: 'beachType',
      value: null
    },
    {
      event: 'slot',
      name: 'activity',
      value: null
    },
    {
      event: 'slot',
      name: 'cuisine',
      value: null
    },
    {
      event: 'slot',
      name: 'location',
      value: null
    },
    {
      event: 'slot',
      name: 'type',
      value: null
    },
    {
      event: 'slot',
      name: 'dny',
      value: null
    },
    {
      event: 'slot',
      name: 'aff',
      value: null
    },
    {
      event: 'slot',
      name: 'personType',
      value: null
    },
    {
      event: 'slot',
      name: 'age',
      value: null
    },
    {
      event: 'slot',
      name: 'socialStatus',
      value: null
    }
  ]

  await Promise.all(slots.map((slot) => chatbotApi.post(url, slot)))
}
