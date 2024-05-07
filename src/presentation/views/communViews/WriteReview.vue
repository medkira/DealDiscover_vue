<script setup lang="ts">
import { ref, toRaw } from "vue";
import Rating from 'primevue/rating';
import Dialog from 'primevue/dialog';
import PrimaryButton from '@/presentation/components/Buttons/PrimaryButton.vue';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

import { Rate, rated_name } from "@/domain/entities/Rates";
import { CreateRateStore } from "@/presentation/stores/Rates/CreateRateStore";
import { GetLatestsRatesStore } from "@/presentation/stores/Rates/GetLatestRatesStore";
import LoadingCube from "@/presentation/components/animation/LoadingCube.vue";

const props = defineProps<({
    text: String,
    rated_id: any
})>()

const visibleAddRateDialog = ref(false);
// const post_type = ref<any>();
const content = ref('');
const rate = ref(0);
// const image = ref();


const createRateStore = CreateRateStore();


const submitRateRate = async () => {
    // console.log("from write review", props.rated_id)
    await createRateStore.CreateRate({ rate: rate.value, rated_id: props.rated_id, rated_name: rated_name.PLACE, review: content.value, });

    if (createRateStore.isCreatedRateSuccess) {
        showSuccess(createRateStore.getSuccessMessage as string);
        visibleAddRateDialog.value = false;
        createRateStore.$reset
        // image.value = "";
        //! CURRENT solition need to be fixed
        const getLatestsRatesStore = GetLatestsRatesStore();
        getLatestsRatesStore.$reset();
        content.value = '';
    }

}
const toast = useToast();
const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
    if (createRateStore.isCreatedRateSuccess) {
        toast.add({ severity: 'success', summary: 'Success Message', detail: msg, life: 3000, group: 'tl' });
    }
};



//************** FETCH Reviews  **************/
// const items = ref<Rate[]>([]);

// const getLatestsRatesStore = GetLatestsRatesStore()


// const fetchData = async () => {
//     await getLatestsRatesStore.GetLatestRates({ page: 1, reted_id: props.rated_id })
//     const data = getLatestsRatesStore.GetLatestRatesSuccess
//     items.value = toRaw(data)
//     // console.log(toRaw(data))
// };
// fetchData()
//****************************************************************************** */
</script>
<template>
    <button @click="[visibleAddRateDialog = true]" class="primary-button">{{ text }}</button>
    <Dialog :close-on-escape="true" :dismissable-mask="true" v-model:visible="visibleAddRateDialog" modal :pt="{
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }">


        <template #container="{ closeCallback }">
            <!-- LOADING VIEW -->
            <div v-if="createRateStore.CreateRateLoading"
                class="bg-[#2980b9] p-[200px] rounded-2xl flex flex-col items-center justify-between">
                <LoadingCube />
                <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
            </div>


            <!-- CREATE Rate FORM -->
            <div v-else class="flex flex-col px-10 py-7 gap-5 " style="border-radius: 12px; background: #2980b9;">
                <!-- <div v-if="logingStore.loginStatusMessage"
                                class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50">
                                {{ logingStore.loginStatusMessage }}
                            </div> -->
                <!-- <div class="inline-flex flex-col gap-2">
                    <label for="post type" class="text-primary-50 font-semibold">Rate type</label>
                    <InputText v-model="post_type" id="post type" class="bg-white/20 border-0 p-4 text-primary-50"
                        type="post type">
                    </InputText>
                </div> -->

                <div class="inline-flex flex-col gap-2">
                    <label for="content" class="text-primary-50 font-semibold">Your Review</label>
                    <Textarea v-model="content" id="content" class="bg-white/20 border-0 p-10 text-primary-50">
                            </Textarea>
                </div>
                <!-- 
                <div class="inline-flex flex-col gap-2">
                    <label for="image" class="text-primary-50 font-semibold">Image</label>
                    <Toast />

                </div> -->

                <div class="inline-flex flex-col gap-2">
                    <label for="rate" class="text-primary-50 font-semibold">Your Rate</label>

                    <Rating v-model="rate" :stars="7" :cancel="false" />
                </div>



                <div class="flex items-center gap-2">
                    <Button @click="submitRateRate" label="Done" text
                        class="p-4 w-full text-primary-50 border border-white-alpha-30 hover:bg-white/10"></Button>
                    <Button label="Cancel" @click="[closeCallback()]" text
                        class="p-4 w-full text-primary-50 border border-white-alpha-30 hover:bg-white/10"></Button>
                </div>
            </div>
        </template>


    </Dialog>
</template>


<style scoped lang="scss">
button {

    background-color: rgb(#f6f6f6, 0.5);
    border-radius: 50px;
    padding: 15px 20px 15px 20px;
    font-weight: 700;
    color: #3db3dd;
    border: 2px solid #3db3dd;
    transition: transform 0.14s ease-in;
}

button:nth-child(1) {

    background: #3db3dd;
    border-radius: 50px;
    font-size: large;
    font-weight: 700;
    color: #f1f0f0;

}

button:active {
    transform: scale(0.95);

}

.uploadInput {
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.75rem 1.5rem;
    background-color: #488aec;
    color: #ffffff;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    user-select: none;
    gap: 0.75rem;
    box-shadow: 0 4px 6px -1px #488aec31, 0 2px 4px -1px #488aec17;
    transition: all .6s ease;
    cursor: pointer;

    label {
        font-size: large;
        user-select: none;
    }

    input[type="file"] {
        // width: 100%;
        height: 50px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        // z-index: -1;
        background-color: red;
        cursor: pointer;
    }

    input[type="file"]::file-selector-button {
        cursor: pointer;
        width: 0px;
        // opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        position: absolute;

    }

    /* file upload button hover state */
    input[type="file"]::file-selector-button:hover {
        cursor: pointer;

    }

    /* file upload button active state */
    // input[type="file"]::file-selector-button:active {
    //     background-color: #e5e7eb;
    // }
}



.uploadInput:hover {
    box-shadow: 0 10px 15px -3px #488aec4f, 0 4px 6px -2px #488aec17;
}

.uploadInput:focus,
.uploadInput:active {
    opacity: .85;
    box-shadow: none;
}

.uploadInput svg {
    width: 1.25rem;
    height: 1.25rem;
}


.primary-button {
    font-size: x-large;
    transform: scale(1.1);
    color: #f6f6f6;
}

.do-post-container {
    margin-top: 29px;
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(#f6f6f6, 0.17);
    padding: 25px 0px 25px 0;
    gap: 50px;
    border-radius: 25px;
    text-align: center;

    h1 {
        font-size: 30px;
        font-weight: bold;
    }
}

@media (max-width: 1024px) {

    .do-post-container {
        width: 50%;


    }
}

.title {
    font-size: 45px;
    text-align: start;
    // background-color: red;
    width: 93%;
    color: #f6f6f6;
    margin-bottom: -15px;
    font-weight: bolder;
}

main {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
}

.posts-container {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    padding: 50px;
    justify-content: center;
    background-color: rgb(#f6f6f6, 0.17);

    .post-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .user-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
        padding: 11px;

        h1 {
            color: #f6f6f6;
            font-size: 23px;
        }
    }

    .post-text {
        color: #f6f6f6;
        font-size: 26px;
        padding-left: 10px;
    }


    div {
        cursor: pointer;
        background-color: rgb(#acd6d3, 0.45);
        padding: 18px;
        border-radius: 25px;
        transition: transform 0.14s ease-in;

        &:hover {
            transform: scale(1.05);
            background-color: rgb(#acd6d3, 0.69);

        }

        img {
            border-radius: 21px;
            width: 290px;

        }
    }

}

@media (min-width: 1024px) {
    .posts-container {
        padding-left: 170px;
        padding-right: 170px;

        div {
            img {

                width: 350px;
            }
        }
    }

}
</style>
