<script setup lang="ts">
import PrimaryButton from '@/presentation/components/Buttons/PrimaryButton.vue';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import { CreatePlaceStore } from '@/presentation/stores/Places/CreatePlaceStore';
import Dialog from 'primevue/dialog';
import LoadingCube from "@/presentation/components/animation/LoadingCube.vue";

var selectedFile;
const image = ref();
const nameInput = ref();
const emailInput = ref();
const descriptionInput = ref();
const locationInput = ref();
const visibleLoadingDialog = ref(false);

const selectedType = ref('');
const roleOptions = [
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Cafe', value: 'cafe' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'adventure', value: 'adventure' }
];

const createPlaceStore = CreatePlaceStore();

const submitCreatePlace = async () => {
    // visibleLoadingDialog.value = true;
    console.log(selectedType.value)
    await createPlaceStore.CreatePlace({
        description: descriptionInput.value, name: nameInput.value, location: locationInput.value,
        placeImage: image.value, type: selectedType.value
    });

    if (createPlaceStore.isCreatedPlaceSuccess) {
        visibleLoadingDialog.value = false;

        showSuccess(createPlaceStore.getSuccessMessage as string);
        createPlaceStore.reset();
        image.value = "";
    } else {
        visibleLoadingDialog.value = false;

    }

}

const customUploader = async (event: any) => {
    selectedFile = event.target.files[0];
    image.value = selectedFile;
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });

};


const fileNameLabel = () => {
    return image.value ? `Selected: ${image.value.name}` : 'Choose a image';
}

const toast = useToast();
const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
    if (createPlaceStore.isCreatedPlaceSuccess) {
        toast.add({ severity: 'success', summary: createPlaceStore.getSuccessMessage, detail: msg, life: 3000, group: 'tl' });
    }
};


</script>

<template>

    <main>



        <Dialog :close-on-escape="true" :dismissable-mask="true" v-model:visible="visibleLoadingDialog" modal :pt="{
            mask: {
                style: 'backdrop-filter: blur(2px)'
            }
        }">
            <template #container="{ }">
                <!-- LOADING VIEW -->
                <div class="bg-[#2980b9] p-[200px] rounded-2xl flex flex-col items-center justify-between">

                    <div class="containerInputs">

                        <section>
                            <label for="role" class="text-primary-50 font-semibold">Type</label>
                            <Dropdown id="role" v-model="selectedType" :options="roleOptions"
                                placeholder="Select a Role" option-label="label" option-value="value"
                                class="bg-white/20 border-0 p-4 text-primary-50">
                            </Dropdown>
                        </section>
                        <section>
                            <label for="Name" class="text-primary-50 font-semibold">Name</label>
                            <InputText id="Name" class="bg-white/20 border-0 p-4 text-primary-50" v-model="nameInput" />
                        </section>

                        <section>
                            <label for="Email" class="text-primary-50 font-semibold">Email</label>
                            <InputText id="Email" class="bg-white/20 border-0 p-4 text-primary-50"
                                v-model="emailInput" />
                        </section>

                        <section>
                            <label for="description" class="text-primary-50 font-semibold">Description</label>
                            <InputText id="description" class="bg-white/20 border-0 p-4 text-primary-50"
                                v-model="descriptionInput" />
                        </section>

                        <section>
                            <label for="location" class="text-primary-50 font-semibold">Location</label>
                            <InputText id="location" class="bg-white/20 border-0 p-4 text-primary-50"
                                v-model="locationInput" />
                        </section>

                        <section>
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
                        </section>


                    </div>
                </div>

            </template>

        </Dialog>


        <button @click="[visibleLoadingDialog = true, submitCreatePlace()]" class=" text-[#f0f0f0] "
            style="font-size: 1.5rem  ">update </button>>

    </main>
</template>


<style scoped lang="scss">
main {
    position: absolute;
    border-radius: 20px;
    padding: 37px;
    background-color: rgb(#f6f6f6, 0.17);
    margin: 7rem 35rem 0 35rem;
    left: 0px;
    right: 0px;

    .containerInputs {
        display: flex;
        flex-direction: column;
        gap: 20px;

        section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }



        section:nth-last-child(-n+2) {
            // background-color: red;
            display: flex;
            align-items: center;
        }
    }

}

.uploadInput {
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.75rem 1.5rem;
    background: #3db3dd;
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


@media (max-width: 1014px) {
    main {

        margin: 10rem 0.5rem 0 0.5rem;


    }
}
</style>