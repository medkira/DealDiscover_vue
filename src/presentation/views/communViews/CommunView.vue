<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Rating from 'primevue/rating';
import Avatar from 'primevue/avatar';
import WriteReview from './WriteReview.vue';
import { GetLatestsRatesStore } from '@/presentation/stores/Rates/GetLatestRatesStore';
import { onBeforeUnmount } from 'vue';
import PaginatorPages from '@/presentation/components/paginator/PaginatorPages.vue';
import { GetPlaceByIdStore } from '@/presentation/stores/Places/GetPlaceByIdStore';
import LikeButton from '@/presentation/components/Buttons/LikeButton.vue';
import { appServiceClientInstance } from '@/app/factory/di';
import type { Place } from '@/domain/entities/Place';
import { GetLatestsPlacesStore } from '@/presentation/stores/Places/GetLatestPlacesStore';
import { GetFavouritePlaceStore } from '@/presentation/stores/Places/GetFavouritePlacesStore';
import { toRaw } from 'vue';
import UploadImageButton from './UploadImageButton.vue';
import GalleryCards from './GalleryCards.vue';
const route = useRoute();
const placeId = ref()
placeId.value = route.params.id as string;
const rate = ref(6);
const nReviews = ref(166);


// ************** Add/Remove PLace Favourites ****************//

const addToFavourites = async () => {
    await appServiceClientInstance.addPlaceFavourites({ placeId: placeId.value });
}
const removeFromFavourites = async () => {
    await appServiceClientInstance.removePlaceFavourites({ placeId: placeId.value });

}
/**********************************/
const isChecked = ref(false);
const getFavouritePlace = GetFavouritePlaceStore();
const getFavouritesPlaces = async () => {
    await getFavouritePlace.GetFavouritePlaces(placeId.value);
    // console.log(getFavouritePlace.isLiked);
    isChecked.value = getFavouritePlace.isLiked
}

getFavouritesPlaces();
//*********************************************//






//************** FETCH Reviews & Places **************//
// const reviews = ref<Rate[]>([]);
const getLatestsRatesStore = GetLatestsRatesStore();
const getPlaceByIdStore = GetPlaceByIdStore()
const fetchedData = ref();

const currentPage = ref(1);
const fetchData = async (page: number = 1) => {
    await getLatestsRatesStore.GetLatestRates({ page, rated_id: placeId.value })
    await getPlaceByIdStore.GetPlaceById(placeId.value);
    fetchedData.value = getPlaceByIdStore.placeData
    // const place = getPlaceByIdStore.placeData

    // // console.log("FROM communview data", place)


    // no need  for this now we get the state from pinia directelys
    // reviews.value = toRaw(getLatestsRatesStore.GetLatestRatesSuccess)
    // console.log(reviews.value)
};


fetchData();
//*********************************************//

const nextPage = () => {
    getLatestsRatesStore.$reset;
    currentPage.value = currentPage.value + 1;
    fetchData(currentPage.value)
}

const previousPage = () => {
    // getLatestsRatesStore.$reset;
    currentPage.value = currentPage.value - 1;
    fetchData(currentPage.value)
}

onBeforeUnmount(() => {
    getLatestsRatesStore.$reset();
    getFavouritePlace.$reset();
})



</script>



<template>
    <main>

        <header>
            <section>
                <h1>{{ getPlaceByIdStore.placeData.name }}</h1>
                <!-- <div class="pi pi-heart-fill" style="font-size: 3rem"></div> -->
                <div>
                    <p style="text-align: center;">Add favourite</p>

                    <LikeButton :is-checked=isChecked @add="addToFavourites" @remove="removeFromFavourites" />
                </div>

            </section>
            <div>
                <Rating v-model="rate" :stars="5" :cancel="false" :disabled="true" />
                <p>{{ nReviews }} Reviews</p>
            </div>
        </header>
        <div class="galleria">
            <GalleryCards v-if="fetchedData" title="" sub-title="" :data=getPlaceByIdStore.placeData />
        </div>
        <div class="content">
            <div class="images-container">

            </div>
            <div class="description">
                <h1>Description</h1>

                <p>{{ getPlaceByIdStore.placeData.description }}</p>

            </div>
            <div class="description">
                <h1>Location</h1>

                <p>{{ getPlaceByIdStore.placeData.location }}</p>

            </div>
            <div class="contribute">
                <h1>Contribute</h1>

                <div class="contribute-buttons">
                    <WriteReview text="Write a review" :rated_id=placeId />

                    <UploadImageButton :place_id="placeId" />

                    <button>
                        Ask a question
                    </button>


                </div>

            </div>
            <div class="reviews-qa">
                <h1>Reviews</h1>
                <div class="posts-container">
                    <div class="post-container" v-for="(   item   ) in     getLatestsRatesStore.getReviews"
                        :key="item.rate">

                        <div class="user-container">
                            <Avatar class=" Avatar " size="large" shape="circle" />
                            <h1>{{ item.user_name }}</h1>
                        </div>

                        <h2 class="post-text">{{ item.review }} </h2>

                        <Rating v-model="item.rate" :stars="5" :cancel="false" readonly />

                    </div>

                </div>

                <div class="pagination-container">
                    <PaginatorPages @next="nextPage" @previous="previousPage" :pages="4" :current-page="currentPage" />
                </div>
            </div>
        </div>
    </main>
</template>





<style scoped lang="scss">
.pagination-container {
    margin-top: 15px;
    background-color: rgb(#f6f6f6, 0.17);
    // background-color: red;
    border-radius: 20px;
    padding: 1px;
    padding-bottom: 20px;

}



main {
    padding-top: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    overflow: hidden;
    padding: 70px;

}



header {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-top: 5%;

    div {
        display: flex;
        align-items: center;

        p {
            font-size: large;
            margin-left: 16px;
            font-size: 20px;
            font-weight: bold;
        }
    }

}


.galleria {
    width: 100%;
    border-radius: 20px;

    background-color: rgb(#f6f6f6, 0.17);


}


section {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    // background-color: #29413f;
    width: 100%;
    // min-width: 1250px;
    // padding-right: 30px;


    h1 {
        font-size: 30px;
        text-align: start;
        width: 93%;
        color: #f6f6f6;
        margin-bottom: -15px;
        font-weight: bolder;
    }

    div {
        cursor: pointer;
    }

}


.content {
    // padding: 37px;
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: scroll;
    flex-direction: column;
    gap: 16px;
}

.contribute,
.description {
    width: 100%;
    border-radius: 20px;
    padding: 37px;
    background-color: rgb(#f6f6f6, 0.17);

    h1 {
        color: #f6f6f6;
        font-size: 35px;
        margin-bottom: 15px;

    }

    p {
        color: #f6f6f6;
        font-size: 25px;
        margin-bottom: 15px;
        font-weight: 400
    }

    .contribute-buttons {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;

        button:nth-child(1) {

            background: #3db3dd;
            border-radius: 50px;
            font-size: large;
            font-weight: 700;
            color: #f1f0f0;

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

        button:hover,
        :active {
            background-color: #3db3dd;
            color: #f1f0f0;
        }

        button:active {
            transform: scale(0.95);

        }
    }
}

.reviews-qa {
    border-radius: 20px;
    background-color: rgb(#f6f6f6, 0.17);
    padding: 50px;


    h1:nth-child(1) {
        color: #f6f6f6;
        font-size: 38px;
        margin-bottom: 35px;
        text-align: start;

    }
}


.posts-container {

    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    flex-direction: row;




    .post-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        cursor: pointer;
        background-color: rgb(#29413f, 0.3);
        padding: 18px;
        border-radius: 25px;
        transition: transform 0.14s ease-in;
        max-width: 450px;
        overflow: hidden;
        max-height: calc(100vh - 510px);
        overflow-y: auto;

        &:hover {
            transform: scale(1.02);

        }

        img {
            border-radius: 21px;
            width: 290px;

        }
    }

    .user-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: 20px;
        padding: 11px;

        h1 {
            color: #f6f6f6;
            font-size: 23px;
            padding-bottom: 10px;
        }
    }

    .post-text {
        color: #f6f6f6;
        font-size: 26px;
        padding-left: 10px;
        overflow: scroll;
    }


    div {
        cursor: pointer;
        background-color: rgb(#acd6d3, 0.45);
        padding: 18px;
        border-radius: 25px;
        transition: transform 0.14s ease-in;



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

// * for paginatipn container
@media (max-width: 1024px) {
    main {
        padding: 10px;
        // background-color: #29413f;
    }

    .pagination-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px
    }

    .reviews-qa {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .posts-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .description {
        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1.3rem;
        }
    }

}

@media (max-width: 1024px) {
    header {
        // background-color: #29413f;
        padding-top: 40%;
        padding-left: 8%;
        padding-right: 6%;
    }

    section {
        // min-width: 0px;
        // background-color: #29413f;
        display: flex;
        flex-direction: row;
        gap: 5vh;
        align-items: center;
        // background-color: #3db3dd;
        justify-content: center;


        div {
            // background-color: red;
        }


        h1 {


            // background-color: red;
            font-size: 1.2rem
        }
    }

}
</style>
