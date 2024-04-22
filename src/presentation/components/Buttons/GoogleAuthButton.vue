<script setup lang="ts">
// import { appServiceClientInstance } from "@/app/factory/di";
import IconGoogle from "@/presentation/components/icons/IconGoogle.vue"
import { NetworkConstants } from "@/app/constants";
import { ref } from 'vue';
// export default {
//     name: 'SignInButton',
// };
// defineProps({
// });

const props = defineProps<{
    buttonName: string
}>()
const { buttonName } = props

const loginGoogle = async () => {
    window.location.href = `${NetworkConstants.BASE_URL}/google`;
    // const res = await appServiceClientInstance.authGoogle()
    // console.log("data: ", res.data)
}
</script>

<template>
    <button class="signin" @click="loginGoogle">
        <IconGoogle />
        {{ buttonName }}
    </button>

</template>



<style scoped>
.signin {
    float: right;
    /* max-width: 320px; */
    min-width: 280px;
    display: flex;
    padding: 0.5rem 1.4rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.25);
    gap: 0.75rem;
    color: #c4d2dc;
    background-color: #19242b;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0, 0.87, 0.12, 1);
    justify-content: center;
}

.signin:hover {
    transform: scale(1.025);
}

.signin:active {
    transform: scale(0.975);
}

button svg {
    height: 24px;
    width: auto;
}
</style>