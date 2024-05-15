<template>
    <main>
        <div class="container-failure" v-if="getLatestsPlacesStore.GetLatestPlacesFailure">
            <h1>No Place Contributions </h1>
            <button @click=" fetchData()" class="btn-class-name">
                <span class="back"></span>
                <span class="front"></span>
            </button>
            <p>Press to refresh</p>
        </div>
        <div v-else class="container">
            <section v-for="( item ) in   getLatestsPlacesStore.GetLatestPlacesSuccess  " :key="item.id">
                <div class="information">
                    <!-- <h1><span> Description:</span> {{ item.description }}</h1> -->
                    <h1><span>Menu</span> {{ }}</h1>

                    <h1><span>Place name:</span> {{ item.name }}</h1>
                    <h1><span>Type: </span> {{ item.type }}</h1>
                    <!-- <h1><span>Loscation: </span> {{ item.location }}</h1> -->
                </div>



                <div class="main-section">
                    <!-- <p class="menuImageDialog" @click="[visible = true, visiblePlace(index)]">Place Image</p> -->
                    <div class="buttons-container">

                        <button @click="[visibleUpdate = true, place_id = item.id]">Create</button>
                        <button @click="[visibleAddTomenu = true, place_id = item.id]">Add To menu</button>
                        <button @click="[visibleUpdate = true, place_id = item.id]">Delete</button>


                        <!-- <button @click="deletePlace(item.id)">Delete</button> -->
                    </div>
                </div>

                <div class="card overflow-hidden">
                    <Accordion :activeIndex="0" style=" font-size: larger; color: aliceblue; font-weight: bold;">
                        <AccordionTab header="View Menue">
                            <div v-if="fetchedData">
                                <FoodDataContainer :data="getLatestFoodStore.GetLatestFoodsSuccess" :place_id=place_id
                                    @fetchdata="fetchData" />
                            </div>
                        </AccordionTab>

                    </Accordion>
                </div>
            </section>


        </div>
    </main>

    <Dialog :visible="createMenuStore.CreateMenuLoading || createFoodStore.CreateFoodLoading" modal
        :style="{ width: '40rem' }" close-icon=false>
        <div class="bg-[#2980b9] p-[1rem] rounded-2xl flex flex-col items-center justify-center">
            <LoadingCube />
            <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
        </div>
    </Dialog>



    <Dialog :dismissable-mask="true" modal v-model:visible="visibleUpdate" :style="{ width: '30rem' }">

        <div class="main-update-container">
            <div class=" containerInputs">
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

                <section>
                    <div class="update-buttons-container">
                        <button @click="createMenu()">Update</button>
                        <button @click="visibleUpdate = false">cancel</button>
                    </div>
                </section>
            </div>
        </div>

    </Dialog>



    <Dialog :dismissable-mask="true" modal v-model:visible="visibleAddTomenu" :style="{ width: '30rem' }">

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
                        <button @click="createFood()">Update</button>
                        <button @click="visibleAddTomenu = false">cancel</button>
                    </div>
                </section>
            </div>
        </div>

    </Dialog>
</template>

<script setup lang="ts">

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { onMounted, ref } from 'vue';
import LoadingCube from '@/presentation/components/animation/LoadingCube.vue';
import { GetLatestsPlacesStore } from '@/presentation/stores/Places/GetLatestPlacesStore';
import { cookieAdapter } from '@/app/factory/di';
import { useToast } from 'primevue/usetoast';
import { CreateMenuStore } from '@/presentation/stores/Foods/CreateMenuStore';
import { GetLatestsFoodsStore } from '@/presentation/stores/Foods/GetLatestFoodStore';
import { CreateFoodStore } from '@/presentation/stores/Foods/CreateFoodStore';
const visible = ref(false);

const imgUrl = ref();


//**************** CreateFood *************//
const createFoodStore = CreateFoodStore();

const createFood = async () => {
    await createFoodStore.CreateFood({ name: nameInput.value, price: priceInput.value, place_id: place_id.value });
    fetchData();
    if (createFoodStore.CreateFoodgSuccess) {
        visibleAddTomenu.value = false
        showSuccess(createFoodStore.CreateFoodStatusMessage!);
        resetStates();
    }
}
//******************************************//



//********** FETCH Places  ***************/
// let fetchedData: any;
const getLatestsPlacesStore = GetLatestsPlacesStore();
const getLatestFoodStore = GetLatestsFoodsStore()

const fetchedData = ref()

const fetchData = async (page: number = 1) => {
    const userId = cookieAdapter.getIdFromToken();

    getLatestsPlacesStore.$reset();
    await getLatestsPlacesStore.GetLatestPlaces({ page: page, is_verified: true, user_id: userId ?? "" });
    // console.log(getLatestsPlacesStore.GetLatestPlacesSuccess)
    const { id } = getLatestsPlacesStore.GetLatestPlacesSuccess[0];
    place_id.value = id

    await getLatestFoodStore.GetLatestFoods({ place_id: place_id.value });
    // console.log(getLatestFoodStore.GetLatestFoodsSuccess)
    fetchedData.value = getLatestFoodStore.GetLatestFoodsSuccess
}



//*********************************************//





//*************** CREATE MENU **************//

const createMenuStore = CreateMenuStore();

const createMenu = async () => {
    await createMenuStore.CreateMenu({
        menuImage: menuImage.value, place_id: place_id.value
    });
    if (createMenuStore.CreateMenugSuccess) {
        visibleUpdate.value = false
        showSuccess(createMenuStore.CreateMenuStatusMessage!);
        resetStates();
    }
    fetchData();
}



const visibleAddTomenu = ref(false);
const visibleUpdate = ref(false)
const place_id = ref();
const menuImage = ref();
const nameInput = ref();
const priceInput = ref();



//********* File Image *****************//
let selectedFile;

const customUploader = async (event: any) => {
    console.log("menuImage: ", event)
    selectedFile = event.target.files[0];
    menuImage.value = selectedFile;
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });

};

const fileNameLabel = () => {
    return menuImage.value ? `Selected: ${menuImage.value.name}` : 'Choose food image';
}

const toast = useToast();
const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
    if (createMenuStore.isCreatedMenuSuccess) {
        toast.add({ severity: 'success', summary: createMenuStore.getSuccessMessage, detail: msg, life: 3000, group: 'tl' });
    }
};
//********************************************/


onMounted(() => {
    fetchData();
})


const resetStates = () => {
    place_id.value = '';
    menuImage.value = '';
    nameInput.value = '';
    priceInput.value = '';

}



</script>

<style scoped lang="scss">
main {
    position: absolute;
    border-radius: 20px;
    padding: 37px 5px 37px 5px;
    background-color: rgb(#f6f6f6, 0.17);
    left: 0px;
    right: 0px;
    margin: 10rem 2rem 0 2rem;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: 41rem;
    overflow: scroll;

    .container-failure {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;

        h1 {
            font-weight: bold;
            font-size: x-large;
            color: #d9534f;
        }

        p {
            font-weight: bold;
            font-size: x-large;
            color: #ffffff;
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;


        section {
            display: flex;
            flex-direction: column;
            background-color: rgb(#f6f6f6, 0.17);
            width: 100%;
            border-radius: 1rem;
            overflow: hidden;

            h1 {
                padding: 1rem 1rem 0rem 1rem;
                font-weight: 500;
                font-size: large;
                color: #f6f6f6;

                span {
                    font-weight: bolder;
                    font-size: x-large;
                    margin-right: 0.5rem;
                }

            }

            .information {

                display: flex;
                flex-direction: column;
                gap: 0.2rem;
                margin-bottom: 1rem;
            }

            .main-section {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;

                gap: 1rem;
                background-color: rgb(#f6f6f6, 0.17);

                justify-content: space-between;
                padding: 1rem;

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

        }


    }

}

.buttons-container {
    display: flex;
    gap: 1.1rem;
    width: 100%;
    justify-content: center;
}

.menuImageDialog {
    cursor: pointer;
    font-weight: bold;
    font-size: larger;

    &:hover {
        color: #f7f6f6;

    }
}


@media (min-width: 1024px) {

    .menuImageDialog {
        font-size: larger;

    }

    main {
        margin: 7rem 29rem 0rem 29rem;
        padding: 2rem 2.3rem 0rem 2.3rem;
        height: 50rem;


    }

    .buttons-container {
        display: flex;
        gap: 1.1rem;
        width: 100%;
        justify-content: start;
    }


}




//*********************************UPDATE ***************************//

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
    // position: absolute;
    // border-radius: 20px;
    // padding: 37px;
    // margin: 7rem 35rem 0 35rem;
    // left: 0px;
    // right: 0px;
    // max-width: 50vh;

    .containerInputs {
        display: flex;
        flex-direction: column;
        gap: 20px;
        // max-width: 50vh;

        section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            // div {
            //     display: flex;
            //     flex-direction: column;
            //     gap: 1rem;

            // }
        }



        // section:nth-last-child(-n+2) {
        //     // background-color: red;
        //     display: flex;
        //     align-items: center;
        // }
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
</style>
