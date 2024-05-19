<template>
    <div class="card">
        <div v-for="(item, index) in props.data" :key="index" class="col-12">
            <div class="row flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                :class="{ 'border-top-1 surface-border': index !== 0 }">
                <!-- <div class="md:w-10rem relative">
                    <img class="block xl:block mx-auto border-round w-full"
                        :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                    <Tag :value="item.inventoryStatus" class="absolute" style="left: 4px; top: 4px"></Tag>
                </div> -->
                <!-- <img :src="item" /> -->
                <h1>{{ item.name }}</h1>
                <h1>{{ item.price }} dinar</h1>
                <div class="buttons-container">
                    <button @click="visibleUpdateFood = true, food_id = item.id">Update</button>
                    <button @click="deleteFood(item.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <Dialog :visible="deleteFoodSotre.DeleteFoodByIdLoading || updateFoodStore.UpdateFoodLoading" modal
        :style="{ width: '40rem' }" close-icon=false>
        <div class="bg-[#2980b9] p-[1rem] rounded-2xl flex flex-col items-center justify-center">
            <LoadingCube />
            <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
        </div>
    </Dialog>

    <Dialog :dismissable-mask="true" modal v-model:visible="visibleUpdateFood" :style="{ width: '30rem' }">

        <div class="main-update-container">
            <div class="containerInputs">
                <section>
                    <label for="Name" class="text-primary-50 font-semibold">Name</label>
                    <InputText id="Name" class="bg-white/90 border-0 p-4 text-primary-50" v-model="nameInput" />

                    <label for="Price" class="text-primary-50 font-semibold">Price</label>
                    <InputText id="Price" class="bg-white/90 border-0 p-4 text-primary-50" v-model="priceInput" />
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

                <section>
                    <div class="update-buttons-container">
                        <button @click="updateFood()">Update</button>
                        <button @click="visibleUpdateFood = false">cancel</button>
                    </div>
                </section>
            </div>
        </div>

    </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import type { Food } from "@/domain/entities/Food";
import { DeleteFoodStore } from "@/presentation/stores/Foods/DeleteFoodStore";
import { UpdateFoodStore } from "@/presentation/stores/Foods/UpdateFoodStore";
import LoadingCube from "@/presentation/components/animation/LoadingCube.vue";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";


const props = defineProps<{
    data: Food[] | undefined;
    place_id: string | undefined;
}>();

console.log("from menu ", props.data)

const emit = defineEmits(['fetchdata']);

const food_id = ref();
const nameInput = ref();
const priceInput = ref();

const visibleUpdateFood = ref(false);

//************ update & delete ************//
const updateFoodStore = UpdateFoodStore();
const deleteFoodSotre = DeleteFoodStore();

const updateFood = () => {
    updateFoodStore.UpdateFood({ FoodId: food_id.value, price: priceInput.value, name: nameInput.value })
    emit('fetchdata');

}
const deleteFood = (id: string) => {
    deleteFoodSotre.DeleteFoodById(id);
    emit('fetchdata');
}
//****************************************//


const foodImage = ref();

//********* File Image *****************//
let selectedFile;

const customUploader = async (event: any) => {
    console.log("foodImage: ", event)
    selectedFile = event.target.files[0];
    foodImage.value = selectedFile;
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });

};

const fileNameLabel = () => {
    return foodImage.value ? `Selected: ${foodImage.value.name}` : 'Choose food image';
}

const toast = useToast();
// const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
//     if (createMenuStore.isCreatedMenuSuccess) {
//         toast.add({ severity: 'success', summary: createMenuStore.getSuccessMessage, detail: msg, life: 3000, group: 'tl' });
//     }
// };
//********************************************/

</script>

<style scoped lang="scss">
.row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;

    h1 {
        font-weight: 800;
        width: 30%;
    }
}

.buttons-container {
    display: flex;
    gap: 1.1rem;
    justify-content: end;
}

button {
    background-color: #04aa6d;

    border-radius: 50px;
    padding: 15px 20px 15px 20px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #f1f0f0;
    border: 2px solid #04aa6d;
    transition: transform 0.14s ease-in;
}


button:hover {
    background-color: #19bd81;
    border: 2px solid #19bd81;

    color: #f1f0f0;
}

button:active {
    transform: scale(0.95);

}

/* Base style for the button */
button:last-child {
    background-color: #d9534f;
    /* Reddish color for refuse button */
    border-radius: 50px;
    padding: 15px 20px 15px 20px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #f1f0f0;
    border: 2px solid #d9534f;
    /* Border color matches background color */
    transition: transform 0.14s ease-in;
    /* Add transition for smooth effect */
}

/* Hover state - slight color change and darker border */
button:hover:last-child {
    background-color: #c9302c;
    border: 2px solid #c0302c;
    cursor: pointer;
    /* Indicate clickable action */
}

/* Active state - slight scale down */
button:active:last-child {
    transform: scale(0.95);
}






.update-buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    button {
        background-color: #04aa6d;

        border-radius: 50px;
        padding: 15px 20px 15px 20px;
        font-size: 0.8rem;
        font-weight: 700;
        color: #f1f0f0;
        border: 2px solid #04aa6d;
        transition: transform 0.14s ease-in;
    }


    button:hover {
        background-color: #19bd81;
        border: 2px solid #19bd81;

        color: #f1f0f0;
    }

    button:active {
        transform: scale(0.95);

    }

    /* Base style for the button */
    button:last-child {
        background-color: #d9534f;
        /* Reddish color for refuse button */
        border-radius: 50px;
        padding: 15px 20px 15px 20px;
        font-size: 0.8rem;
        font-weight: 700;
        color: #f1f0f0;
        border: 2px solid #d9534f;
        /* Border color matches background color */
        transition: transform 0.14s ease-in;
        /* Add transition for smooth effect */
    }

    /* Hover state - slight color change and darker border */
    button:hover:last-child {
        background-color: #c9302c;
        border: 2px solid #c0302c;
        cursor: pointer;
        /* Indicate clickable action */
    }

    /* Active state - slight scale down */
    button:active:last-child {
        transform: scale(0.95);
    }

}


.main-update-container {

    .containerInputs {
        display: flex;
        flex-direction: column;
        gap: 20px;

        section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;

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
        height: 50px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        background-color: red;
        cursor: pointer;
    }

    input[type="file"]::file-selector-button {
        cursor: pointer;
        width: 0px;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        position: absolute;

    }

    /* file upload button hover state */
    input[type="file"]::file-selector-button:hover {
        cursor: pointer;

    }


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
</style>