import chatbotApi from "./api-chatbot"



export type PostMessage = {
  message: string
  sender: string
}

export type Button = {
  title: string;
  payload: string;
};

export interface ResponseChatBot {
  [key: string]: string | string[] | Button[];
}


export async function postMessage(data: PostMessage): Promise<ResponseChatBot[]> {
  try {
    const url = '/webhooks/rest/webhook';
    const response = await chatbotApi.post(url, data);
    
    const responseData: ResponseChatBot[] = response.data;
    //  console.log('from chatbot postMessage',responseData)
    // Validate the structure of each message
   
    return responseData;
  } catch (error) {
    // Handle errors or log them
    console.error('Error while processing response:', error);
    throw error; // Propagate the error to the caller
  }
}
