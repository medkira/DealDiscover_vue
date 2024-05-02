<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import Rating from 'primevue/rating';
import Paginator from 'primevue/paginator';
import Avatar from 'primevue/avatar';
import WriteReview from './WriteReview.vue';
import CrouselCards from '@/presentation/views/communViews/CrouselCrads.vue'
import { GetLatestsRatesStore } from '@/presentation/stores/Rates/GetLatestRatesStore';
import type { Rate } from '@/domain/entities/Rates';
import { onBeforeUnmount } from 'vue';
import Button from 'primevue/button';
import PaginatorPages from '@/presentation/components/paginator/PaginatorPages.vue';
const route = useRoute();
const ratedId = ref()
ratedId.value = route.params.id as string;

const rate = ref(6);
const nReviews = ref(166);




//************** FETCH Reviews  **************//
// const reviews = ref<Rate[]>([]);
const getLatestsRatesStore = GetLatestsRatesStore()
const currentPage = ref(1);
const fetchData = async (page: number = 1) => {
    await getLatestsRatesStore.GetLatestRates({ page, rated_id: ratedId.value })


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
    getLatestsRatesStore.$reset;
})







//********* developement test  ************/

// const reviews = ref([{ content: 'Foo', user_name: "testUser", rate: 4 }, { content: 'TEST', user_name: "testUser", rate: 2 },
// { content: "I 'v been in that restaurant with my wife in Dec. 2013, they have a delicious seafood , I like it so much, quite , clean, service is good, near by hotel instate in. I 'v been in that restaurant with my wife in Dec. 2013, they have a delicious seafood , I like it so much, quite  I 'v been in that restaurant with my wife in Dec. 2013, they have a delicious seafood , I like it so much, quite I 'v been in that restaurant with my wife in Dec. 2013, they have a delicious seafood , I like it so much, quite ", user_name: "testUser", rate: 2 }, { content: "I 'v been in that restaurant with my wife in Dec. 2013, they have a delicious seafood , I like it so much, quite , clean, service is good, near by hotel instate in.", user_name: "testUser", rate: 2 }, { content: 'TEST', user_name: "testUser", rate: 4 },
// { content: "I 'v been in that restaurant with my wife in Dec. 2013, they have a delicious seafood , I like it so much, quite , clean, service is good, near by hotel instate in.", user_name: "testUser", rate: 4 }, { content: "I 'v been in that restaurant with my wife in Dec. 2013, they have a delicious seafood , I like it so much, quite , clean, service is good, near by hotel instate in.", user_name: "testUser", rate: 4 }, { content: 'TEST', user_name: "testUser", rate: 4 },
// { content: 'Foo', user_name: "testUser", rate: 4 }, { content: 'TEST', user_name: "testUser", rate: 3 },])

</script>



<template>
    <main>

        <header>
            <section>
                <h1>The The Temple Restaurant</h1>
                <div class="pi pi-heart " style="font-size: 3rem"></div>
            </section>
            <div>
                <Rating v-model="rate" :stars="7" :cancel="false" :disabled="true" />
                <p>{{ nReviews }} Reviews</p>
            </div>
        </header>
        <div class="galleria">
            <CrouselCards title="" sub-title="" :data=[] />
        </div>
        <div class="content">
            <div class="images-container">

            </div>
            <div class="contribute">
                <h1>Contribute</h1>

                <div class="contribute-buttons">
                    <WriteReview text="Write a review" :rated_id=ratedId />

                    <button>
                        upload a photo
                    </button>

                    <button>
                        Ask a question
                    </button>

                </div>

            </div>
            <div class="reviews-qa">
                <div class="posts-container">

                    <div class="post-container" v-for="(   item   ) in     getLatestsRatesStore.getReviews"
                        :key="item.rate">

                        <div class="user-container">
                            <Avatar class=" Avatar " size="large" shape="circle" />
                            <h1>{{ item.user_name }}</h1>
                        </div>

                        <h2 class="post-text">{{ item.review }} </h2>

                        <Rating v-model="item.rate" :stars="7" :cancel="false" readonly />

                    </div>

                </div>

                <div class="card">
                    <PaginatorPages @next="nextPage" @previous="previousPage" :pages="4" :current-page="currentPage" />
                </div>

            </div>
        </div>
    </main>
</template>





<style scoped lang="scss">
.card {
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

@media (max-width: 1024px) {
    header {
        // background-color: #29413f;
        padding-top: 40%;
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
    justify-content: space-between;
    width: 100%;
    min-width: 1250px;


    h1 {
        font-size: 45px;
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

@media (max-width: 1024px) {
    section {
        min-width: 0px;
        margin-left: -50px;

        h1 {
            padding-right: 50%;

            // background-color: red;
            font-size: 20px;
        }
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

.contribute {
    width: 100%;
    border-radius: 20px;
    padding: 37px;

    background-color: rgb(#f6f6f6, 0.17);

    h1 {
        color: #f6f6f6;
        font-size: 35px;
        margin-bottom: 15px;

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



.posts-container {
    border-radius: 20px;

    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    padding: 50px;
    justify-content: center;
    background-color: rgb(#f6f6f6, 0.17);
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

/* div {
    width: 500px;
    background-color: red;
} */
</style>
