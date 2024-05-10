<template>
    <main>
        <div>
            <deep-chat :request="{
                url: 'http://192.168.1.104:5005/webhooks/rest/webhook',
                method: 'POST',
            }" :requestInterceptor="requestInterceptor" :responseInterceptor="responseInterceptor" class="deep-chat"
                :demo="false" :introMessage="{ text: 'Hi I am your recommendation assistant, ask me anything!' }" />
        </div>
    </main>

</template>

<script setup lang="ts">
import 'deep-chat';
import type { RequestInterceptor, ResponseInterceptor } from 'deep-chat/dist/types/interceptors';
const constinitialMessages = [
    { role: 'user', text: 'Hey, how are you today?' },
    { role: 'ai', text: 'I am doing very well!' },
]

const requestInterceptor: RequestInterceptor = (details) => {
    console.log(details)
    details.body = {
        message: details.body.messages[0].text
    }
    // console.log(details)
    return details;
}

const responseInterceptor: ResponseInterceptor = (details) => {
    // console.log(details[0])
    // console.log("Response ", details[0].text);

    // <button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 5px">{{button.title}}</button>
    var buttons = ""
    if (details[0].buttons) {
        details[0].buttons.map((button: any) => {
            const bt = `<button class="deep-chat-button deep-chat-suggestion-button deep-chat-temporary-message style="margin-top: 5px">${button.title}</button>`
            buttons = buttons + bt
        })
    }


    return { text: details[0].text, html: buttons }
    // return details
}

</script>

<style scoped>
main {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    justify-content: center;

    div {
        position: fixed;
        top: 15rem;
        bottom: 0;
    }

}
</style>