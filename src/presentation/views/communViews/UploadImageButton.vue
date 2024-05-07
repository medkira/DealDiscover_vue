<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import LoadingCube from "@/presentation/components/animation/LoadingCube.vue"
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Button from 'primevue/button';
import { CreateImageContributionsStore } from '@/presentation/stores/ImageContributions/CreateImageContributionsStore';

const props = defineProps<({
    place_id: any
})>();

// console.log(props.place_id);
const createImageContributionStore = CreateImageContributionsStore();


const visibleAddPostDialog = ref(false);
var selectedFile;
const image = ref();

const submit = async () => {
    console.log(props.place_id)
    await createImageContributionStore.CreateImageContribution({ postImage: image.value, place_id: props.place_id });

    if (createImageContributionStore.isCreatedSuccess) {
        showSuccess(createImageContributionStore.getSuccessMessage as string);
        visibleAddPostDialog.value = false;
        createImageContributionStore.reset();
        image.value = "";
    }

}

const customUploader = async (event: any) => {
    selectedFile = event.target.files[0];
    image.value = selectedFile;
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });

};


const cancelPost = () => {
    image.value = "";
}




// style 

const fileNameLabel = () => {
    return image.value ? `Selected: ${image.value.name}` : 'Choose a image';
}

const toast = useToast();
const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
    if (createImageContributionStore.isCreatedSuccess) {
        toast.add({ severity: 'success', summary: 'Success Message', detail: msg, life: 3000, group: 'tl' });
    }
};


</script>

<template>
    <button @click="[visibleAddPostDialog = true]">
        Contribute a photo
    </button>

    <Dialog :close-on-escape="true" :dismissable-mask="true" v-model:visible="visibleAddPostDialog" modal :pt="{
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }">


        <template #container="{ closeCallback }">
            <!-- LOADING VIEW -->
            <div v-if="createImageContributionStore.CreateImageContributionLoading"
                class="bg-[#2980b9] p-[200px] rounded-2xl flex flex-col items-center justify-between">
                <LoadingCube />
                <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
            </div>


            <!-- CREATE Image FORM -->
            <div v-else class="flex flex-col px-10 py-7 gap-5 " style="border-radius: 12px; background: #2980b9;">

                <div class="inline-flex flex-col gap-2">
                    <label for="image" class="text-primary-50 font-semibold">Image</label>
                    <Toast />
                    <!-- customUpload @uploader="customUploader" -->
                    <!-- <FileUpload accept="image/*" :maxFileSize="10000000" :v-on:change="customUploader" /> -->

                    <!-- UPLOAD BUTTON -->

                    <div class="uploadInput">

                        <label for="file" v-bind:textContent="fileNameLabel()" />

                        <input v-on:change="customUploader" type="file">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                stroke="#fffffff" stroke-width="2"></path>
                            <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>

                </div>




                <div class="flex items-center gap-2">
                    <Button @click="submit" label="Done" text
                        class="p-4 w-full text-primary-50 border border-white-alpha-30 hover:bg-white/10"></Button>
                    <Button label="Cancel" @click="[closeCallback(), cancelPost()]" text
                        class="p-4 w-full text-primary-50 border border-white-alpha-30 hover:bg-white/10"></Button>
                </div>
            </div>
        </template>


    </Dialog>

</template>



<style scoped lang="scss">
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




button {

    background-color: rgb(#f6f6f6, 0.5);
    border-radius: 50px;
    padding: 15px 20px 15px 20px;
    font-size: large;
    font-weight: 700;
    color: #3db3dd;
    border: 2px solid #3db3dd;
    transition: transform 0.14s ease-in;
}

button:hover {
    background-color: #3db3dd;
    color: #f1f0f0;
}

button:active {
    transform: scale(0.95);

}
</style>