<template>


    <main>
        <TabsRoot class="max-w-screen-xl mt-2 mx-auto px-4 md:px-8" v-model="selectedTabInput">
            <TabsList class="hidden gap-x-3 py-1 overflow-x-auto px-px text-xl sm:flex"
                aria-label="Manage your account">
                <TabsTrigger v-for="(item, idx) in tabItems" :key="idx"
                    class="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 data-[state=active]:shadow-sm outline-gray-800 py-1.5 px-3 rounded-lg duration-150 text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-100 font-medium"
                    :value="item">
                    {{ item }}
                </TabsTrigger>
            </TabsList>
            <div class="relative text-gray-500 sm:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    class="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto">
                    <path fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                </svg>
                <select v-model="selectedTabInput"
                    class="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-gray-800 text-sm">
                    <option v-for="(item, idx) in tabItems" :key="idx" :value="item">
                        {{ item }}
                    </option>
                </select>
            </div>

            <TabsContent v-for="(item, idx) in    tabItems   " :key="idx" class="py-6 tabsContent" :value="item">
                <div v-if="item == 'Scraped Data'">
                    <div class="container-failure" v-if="getLatestsPlacesStore.GetLatestPlacesFailure">
                        <h1>No Place Contributions </h1>
                        <button @click=" fetchData()" class="btn-class-name">
                            <span class="back"></span>
                            <span class="front"></span>
                        </button>
                        <p>Press to refresh</p>
                    </div>
                    <div v-else class="container">

                        <section v-for="( place, index ) in   getLatestsPlacesStore.GetLatestPlacesSuccess  "
                            :key="place.id">
                            <div class="information">
                                <h1><span>Place name:</span> {{ place.name }}</h1>
                                <h1><span> Description:</span> {{ place.description }}</h1>
                                <h1><span>Type: </span> {{ place.type }}</h1>
                                <h1><span>Location: </span> {{ place.location }}</h1>
                                <h1><span>CreatedAt: </span> {{ dateFormat(place.createdAt) }}</h1>

                            </div>



                            <div class="main-section">

                                <p class="imageDialog" @click="[visible = true, visiblePlace(index)]">Place Image</p>
                                <div class="buttons-container">
                                    <button @click="[visibleUpdate = true, placeId = place.id]">Update</button>

                                    <button @click="deletePlace(place.id)">Delete</button>
                                </div>
                            </div>
                        </section>


                    </div>
                </div>

                <div v-if="item == 'Scrape Data'">
                    <div class="scrapedataContainer">

                        <div class="flex p-5 flex-wrap">

                            <div>
                                <h1><span>URL for data scraping</span> </h1>
                                <InputText id="Adress" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="UrlScrape" />
                            </div>



                            <div>
                                <h1><span>Place Type</span> </h1>
                                <InputText id="Adress" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="placeTypeScrape" />
                            </div>



                        </div>

                        <div class="p-5 px-9">
                            <PrimaryButton text="scrape" @click="scrapeData" />
                        </div>

                    </div>

                </div>

            </TabsContent>


        </TabsRoot>



    </main>

    <Dialog :visible="deletePlaceContributionStore.RefusePlaceContributionByIdLoading
            || updatePlaceContributionStore.UpdatePlaceLoading || placeDataScrapingStore.PlaceDataScrapingLoading
            " modal :style="{ width: '40rem' }" close-icon=false>
        <div class="bg-[#2980b9] p-[1rem] rounded-2xl flex flex-col items-center justify-center">
            <LoadingCube />
            <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
        </div>
    </Dialog>


    <Dialog v-model:visible="visible" modal header="Place Contribution" :style="{ width: '50rem' }"
        :dismissable-mask=true>
        <img class="rounded-md" :src=imgUrl alt="no Place">
    </Dialog>


    <Dialog :dismissable-mask="true" modal v-model:visible="visibleUpdate" :style="{ width: '50rem' }">

        <div class="main-update-container">
            <div class=" containerInputs">

                <section>
                    <label for="role" class="text-primary-50 font-semibold">Type</label>
                    <Dropdown id="role" v-model="selectedType" :options="roleOptions" placeholder="Select a type"
                        option-label="label" option-value="value" class="bg-white/90 border-0 p-4 text-primary-50">
                    </Dropdown>
                </section>
                <section>
                    <label for="Name" class="text-primary-50 font-semibold">Name</label>
                    <InputText id="Name" class="bg-white/90 border-0 p-4 text-primary-50" v-model="nameInput" />
                </section>

                <section>
                    <label for="Email" class="text-primary-50 font-semibold">Email</label>
                    <InputText id="Email" class="bg-white/90 border-0 p-4 text-primary-50" v-model="emailInput" />
                </section>

                <section>
                    <label for="description" class="text-primary-50 font-semibold">Description</label>
                    <InputText id="description" class="bg-white/90 border-0 p-4 text-primary-50"
                        v-model="descriptionInput" />
                </section>

                <section>
                    <label for="location" class="text-primary-50 font-semibold">Location</label>
                    <InputText id="location" class="bg-white/90 border-0 p-4 text-primary-50" v-model="locationInput" />
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

                <section>
                    <div class="update-buttons-container">
                        <button @click="updatetPlace()">Update</button>
                        <button @click="visibleUpdate = false">cancel</button>

                    </div>
                </section>
            </div>
        </div>

    </Dialog>
</template>

<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue';

import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import { onMounted, ref } from 'vue';
import LoadingCube from '@/presentation/components/animation/LoadingCube.vue';
import { GetLatestsPlacesStore } from '@/presentation/stores/Places/GetLatestPlacesStore';
import { RefusePlaceContributionStore } from '@/presentation/stores/Places/RefusePlaceSotre';
import { cookieAdapter } from '@/app/factory/di';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import { UpdatePlaceStore } from '@/presentation/stores/Places/UpdatePlaceStore';
import PrimaryButton from '@/presentation/components/Buttons/PrimaryButton.vue';
import { PlaceDataScrapingStore } from '@/presentation/stores/Places/PlaceDataScrapingStore';
function dateFormat(d: any) {
    var date = new Date(d);
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
}

const placeTypeScrape = ref('')
const UrlScrape = ref('')

const placeDataScrapingStore = PlaceDataScrapingStore()
const scrapeData = async () => {
    await placeDataScrapingStore.PlaceDataScraping({ placeType: placeTypeScrape.value, url: UrlScrape.value });
    await fetchData()
    showSuccess(placeDataScrapingStore.getSuccessMessage);
}

const visible = ref(false);

const selectedTabInput = ref("Scrape Data");
const tabItems = [
    "Scrape Data",
    "Scraped Data",

];

const imgUrl = ref();
const visiblePlace = (index: number) => {
    // console.log(index);

    imgUrl.value = getLatestsPlacesStore.GetLatestPlacesSuccess[index].placeImage[0];
}


//**** accept & refuse **********************/
const updatePlaceContributionStore = UpdatePlaceStore();
const deletePlaceContributionStore = RefusePlaceContributionStore()

const updatetPlace = async () => {
    await updatePlaceContributionStore.UpdatePlace({
        description: descriptionInput.value
        , location: locationInput.value, name: nameInput.value, placeImage: image.value, type: selectedType.value
        , placeId: placeId.value
    });
    if (updatePlaceContributionStore.UpdatePlacegSuccess) {
        visibleUpdate.value = false
        showSuccess(updatePlaceContributionStore.UpdatePlaceStatusMessage!);
        resetStates();
    }
    fetchData();
}

const deletePlace = async (id: string) => {
    await deletePlaceContributionStore.RefusePlaceContributionById(id);

    fetchData();

}

//*********************************************//


//********** FETCH Places COntrubutions ***************/
// let fetchedData: any;
const getLatestsPlacesStore = GetLatestsPlacesStore();

const fetchData = async (page: number = 1) => {
    // const userId = cookieAdapter.getIdFromToken();
    // console.log("USER Id", userId)

    getLatestsPlacesStore.$reset();
    await getLatestsPlacesStore.GetLatestPlaces({ page: page, user_id: "0000" });
    // fetchedData = getPlaceContributionsStore.imageContributionsData
    // console.log("DATA IMAGE contributions: ", fetchedData)
}



//*********************************************//





//*************** UPDATE PLACE **************//
const visibleUpdate = ref(false)

const placeId = ref();
const image = ref();
const nameInput = ref();
const emailInput = ref();
const descriptionInput = ref();
const locationInput = ref();
// const visibleLoadingDialog = ref(false);

const selectedType = ref('');
const roleOptions = [
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Cafe', value: 'cafe' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'adventure', value: 'adventure' }
];



let selectedFile;

const customUploader = async (event: any) => {
    console.log("image: ", event)
    selectedFile = event.target.files[0];
    image.value = selectedFile;
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });

};

const fileNameLabel = () => {
    return image.value ? `Selected: ${image.value.name}` : 'Choose a image';
}

const toast = useToast();
const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
    if (updatePlaceContributionStore.isUpdatedPlaceSuccess) {
        toast.add({ severity: 'success', summary: updatePlaceContributionStore.getSuccessMessage, detail: msg, life: 3000, group: 'tl' });
    }
    if (placeDataScrapingStore.PlaceDataScrapingSuccess) {
        toast.add({ severity: 'success', summary: "Scraped data successfully. Check the data in the Scraped Section.", detail: msg, life: 5000, group: 'tl' });
    }
};
//********************************************/


onMounted(() => {
    fetchData();
})


const resetStates = () => {
    placeId.value = '';
    image.value = '';
    nameInput.value = '';
    emailInput.value = '';
    descriptionInput.value = '';
    locationInput.value = '';
}



</script>

<style scoped lang="scss">
.scrapedataContainer {
    display: flex;
    flex-direction: column;
    background-color: rgb(#f6f6f6, 0.17);
    // width: 100%;
    border-radius: 1rem;
    overflow: hidden;

    h1 {
        padding: 1rem 1rem 0.5rem 1rem;
        font-weight: 500;
        font-size: large;
        color: #f6f6f6;

        span {
            font-weight: bolder;
            font-size: x-large;
            margin-right: 0.5rem;
        }

    }

}

.tabsContent {
    // display: flex;
    // align-items: flex-start;
    // justify-content: center;
    margin: 1%;
    height: 41rem;
    overflow: scroll;

}

main {
    position: absolute;
    border-radius: 20px;
    padding: 37px 5px 37px 5px;
    background-color: rgb(#f6f6f6, 0.17);
    left: 0px;
    right: 0px;
    margin: 10rem 2rem 0 2rem;


    .information {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        // align-items: center;
        // justify-content: start;
        padding-left: 4%;
        gap: 2vw;
        // background-color: #04aa6d;
        max-width: 90% // div {
        //     width: 40%;
        // }
    }

    // .scrapedDataContainer {
    //     background-color: #3db3dd;
    //     width: 100%;
    // }

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
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        row-gap: 3rem;
        column-gap: 3rem;


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

    @media (max-width: 1024px) {
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;

            * {
                transform: scale(0.9);
            }
        }

    }
}

.buttons-container {
    display: flex;
    gap: 0.5rem;
}

.imageDialog {
    cursor: pointer;
    font-weight: bold;
    font-size: larger;

    &:hover {
        color: #f7f6f6;

    }
}


@media (min-width: 1024px) {

    .imageDialog {
        font-size: larger;

    }

    main {
        margin: 7rem 29rem 0rem 29rem;
        padding: 2rem 2.3rem 0rem 2.3rem;
        height: 50rem;


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

    .containerInputs {
        display: flex;
        flex-direction: column;
        gap: 20px;

        section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
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
