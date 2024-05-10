<template>
    <main>
        <!-- <div class="container-failure" v-if="getFavouritePlace.GetLatestPlacesFailure">
            <h1>No Place Contributions </h1>
            <button @click=" fetchData()" class="btn-class-name">
                <span class="back"></span>
                <span class="front"></span>
            </button>
            <p>Press to refresh</p>
        </div> -->
        <div class="container">
            <section v-for="( item, index ) in  data " :key="item.id">
                <div class="information">
                    <h1><span> Description:</span> {{ item.description }}</h1>
                    <h1><span>Place name:</span> {{ item.name }}</h1>
                    <h1><span>Type: </span> {{ item.type }}</h1>
                    <h1><span>Location: </span> {{ item.location }}</h1>
                </div>



                <div class="main-section">
                    <p class="imageDialog" @click="[visible = true, visiblePlace(index)]">Place Image</p>
                    <div class="buttons-container">
                        <!-- <button @click="acceptPlace(item.id)">Accept</button>
                        <button @click="refusePlace(item.id)">Refuse</button> -->
                        <LikeButton @remove="removeFromFavourites(item.id)" :is-checked="true" />
                    </div>
                </div>
            </section>


        </div>
    </main>

    <!-- <Dialog :visible="refusePlaceContributionStore.RefusePlaceContributionByIdLoading
                || acceptPlaceContributionStore.AcceptPlaceContributionByIdLoading
                " modal :style="{ width: '40rem' }" close-icon=false>
        <div class="bg-[#2980b9] p-[1rem] rounded-2xl flex flex-col items-center justify-center">
            <LoadingCube />
            <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
        </div>
    </Dialog> -->


    <Dialog v-model:visible="visible" modal header="Place Contribution" :style="{ width: '50rem' }"
        :dismissable-mask=true>
        <img class="rounded-md" :src=imgUrl alt="no Place">
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
// import Button from 'primevue/button';
import { onMounted, ref, toRaw } from 'vue';

import LoadingCube from '@/presentation/components/animation/LoadingCube.vue';
import { GetLatestsPlacesStore } from '@/presentation/stores/Places/GetLatestPlacesStore';
import { RefusePlaceContributionStore } from '@/presentation/stores/Places/RefusePlaceSotre';
import { AcceptPlaceContributionStore } from '@/presentation/stores/Places/AcceptPlaceStore';
import { GetFavouritePlaceStore } from '@/presentation/stores/Places/GetFavouritePlacesStore';
import { GetPlaceByIdStore } from '@/presentation/stores/Places/GetPlaceByIdStore';
import LikeButton from '@/presentation/components/Buttons/LikeButton.vue';
import { appServiceClientInstance } from '@/app/factory/di';
const visible = ref(false);

const imgUrl = ref();
const visiblePlace = (index: number) => {
    // console.log(index);

    imgUrl.value = toRaw(data.value[index]).placeImage[0]
}

const data = ref<any>([]);
const getFavouritePlace = GetFavouritePlaceStore();

const getFavouritesPlaces = async () => {
    await getFavouritePlace.GetFavouritePlaces("");

    let placeIds = getFavouritePlace.GetFavouritePlaceSuccess as any
    placeIds = toRaw(placeIds)

    for (let i = 0; i < placeIds.length; i++) {
        await getPlaceById(placeIds[i]);
        const place = getPlaceByIdStore.GetPlaceByIdSuccess
        data.value.push(place)

    }

}

console.log(data.value)
const getPlaceByIdStore = GetPlaceByIdStore();

const getPlaceById = async (placeId: string) => {
    // console.log(toRaw(getPlaceByIdStore.GetPlaceByIdSuccess))
    return await getPlaceByIdStore.GetPlaceById(placeId);
}

getFavouritesPlaces();


// ************** Add/Remove PLace Favourites ****************//

// const addToFavourites = async () => {
//     await appServiceClientInstance.addPlaceFavourites({ placeId: placeId.value });
// }
const removeFromFavourites = async (id: string) => {
    await appServiceClientInstance.removePlaceFavourites({ placeId: id });
    // getFavouritePlace.$reset();
    data.value = [];

    await getFavouritesPlaces();

}
/**********************************/


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

.imageDialog {
    cursor: pointer;

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
</style>