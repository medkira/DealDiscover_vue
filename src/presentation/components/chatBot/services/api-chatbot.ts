import axios from 'axios'

const chatbotApi = axios.create({
  baseURL: 'http://localhost:5005', // Set the base URL to your desired endpoint
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export default chatbotApi
