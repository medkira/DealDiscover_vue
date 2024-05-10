<template>
    <main>
        <div class="container-failure" v-if="getImageContributionsStore.GetImageContributionsStoreFailure">
            <h1>No Image Contributions</h1>
            <button @click="fetchData()" class="btn-class-name">
                <span class="back"></span>
                <span class="front"></span>
            </button>
            <p>Press to refresh</p>
        </div>
        <div v-else class="container">
            <section v-for="(item, index) in  getImageContributionsStore.GetImageContributionsStoreSuccess "
                :key="item.id">
                <div class="flex ">
                    <h1>User name: {{ item.user_name }}</h1>
                    <h1>Place name: {{ item.place_name }}</h1>
                </div>



                <div class="main-section">
                    <Avatar icon="user_image" class=" Avatar " size="large" shape="circle" />
                    <!-- <Button label="Show"/> -->
                    <p class="imageDialog" @click="[visible = true, visibleImage(index)]">Image</p>
                    <div class="buttons-container">
                        <button @click="acceptImage(item.id)">Accept</button>
                        <button @click="refuseImage(item.id)">Refuse</button>
                    </div>
                </div>
            </section>


        </div>
    </main>

    <Dialog :visible="refuseImageContributionStore.RefuseImageContributionByIdLoading
            || acceptImageContributionStore.AcceptImageContributionByIdLoading" modal :style="{ width: '40rem' }"
        close-icon=false>
        <div class="bg-[#2980b9] p-[1rem] rounded-2xl flex flex-col items-center justify-center">
            <LoadingCube />
            <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
        </div>
    </Dialog>


    <Dialog v-model:visible="visible" modal header="Image Contribution" :style="{ width: '50rem' }"
        :dismissable-mask=true>
        <img class="rounded-md" :src=imgUrl alt="no Image">
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
// import Button from 'primevue/button';
import { ref } from 'vue';
import { GetImageContributionsStoreStore } from '@/presentation/stores/ImageContributions/GetImageContributionsStore';
import { onMounted } from 'vue';
import { AcceptImageContributionStore } from '@/presentation/stores/ImageContributions/AcceptImageContributionStore';
import { RefuseImageContributionStore } from '@/presentation/stores/ImageContributions/RefuseImageContributionStore';
import LoadingCube from '@/presentation/components/animation/LoadingCube.vue';
const visible = ref(false);

const imgUrl = ref();
const visibleImage = (index: number) => {
    // console.log(index);

    imgUrl.value = getImageContributionsStore.imageContributionsData[index].image[0];
}


//**** accept & refuse **********************/
const acceptImageContributionStore = AcceptImageContributionStore();
const refuseImageContributionStore = RefuseImageContributionStore()

const acceptImage = async (id: string) => {
    await acceptImageContributionStore.AcceptImageContributionById(id);

    fetchData();
}

const refuseImage = async (id: string) => {
    // visibleLoadingDialog.value = true;

    await refuseImageContributionStore.RefuseImageContributionById(id);
    // if (refuseImageContributionStore.RefuseImageContributionByIdSuccess) {
    //     visibleLoadingDialog.value = false;

    // } else {
    //     visibleLoadingDialog.value = false;

    // }
    // getImageContributionsStore.$reset()
    fetchData();

}

//*********************************************//


//********** FETCH ImagesContributions ***************/
// let fetchedData: any;
const getImageContributionsStore = GetImageContributionsStoreStore();

const fetchData = async (page: number = 1) => {
    getImageContributionsStore.$reset();
    await getImageContributionsStore.GetImageContributions({ page: page });
    // fetchedData = getImageContributionsStore.imageContributionsData
    // console.log("DATA IMAGE contributions: ", fetchedData)
}



//*********************************************//

// *** Get loading ****/ 
const visibleLoadingDialog = ref(false);

// const isLoading = () => {
//     visibleLoadingDialog.value =   refuseImageContributionStore.RefuseImageContributionByIdLoading
// }

onMounted(() => {
    fetchData();
})




// const loading = ref(false);

// const load = div() => {
//     loading.value = true;
//     setTimeout(() => {
//         loading.value = false;
//     }, 2000);
// };
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
        // justify-content: center;
        // background-color: #d9534f;


        section {
            display: flex;
            flex-direction: column;
            background-color: rgb(#f6f6f6, 0.17);
            width: 100%;
            border-radius: 1rem;

            h1 {
                padding: 1rem 1rem 0rem 1rem;
                font-weight: bold;
                font-size: large;
                color: #f6f6f6;

            }

            .main-section {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;

                gap: 1rem;

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
    gap: 0.5rem;
    // background-color: red;
}

.imageDialog {
    cursor: pointer;
    font-weight: bold;

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
        // background: #c9302c;
        height: 50rem;


    }


}





.btn-class-name {
    --primary: 255, 90, 120;
    --secondary: 150, 50, 60;
    width: 60px;
    height: 50px;
    border: none;
    outline: none;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    outline: 10px solid rgb(var(--primary), .5);
    border-radius: 100%;
    position: relative;
    transition: .3s;
}

.btn-class-name .back {
    background: rgb(var(--secondary));
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.btn-class-name .front {
    background: linear-gradient(0deg, rgba(var(--primary), .6) 20%, rgba(var(--primary)) 50%);
    box-shadow: 0 .5em 1em -0.2em rgba(var(--secondary), .5);
    border-radius: 100%;
    position: absolute;
    border: 1px solid rgb(var(--secondary));
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: inherit;
    transform: translateY(-15%);
    transition: .15s;
    color: rgb(var(--secondary));
}

.btn-class-name:active .front {
    transform: translateY(0%);
    box-shadow: 0 0;
}
</style>
