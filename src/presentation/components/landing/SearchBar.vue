<script setup lang="ts">
import type { Place } from '@/domain/entities/Place';
import router from '@/presentation/router';
import { AutoCompletePlaceSearchStore } from '@/presentation/stores/Places/autoCompletePlaceSearchStore';
// import TheWelcome from '@/presentation/components/TheWelcome.vue'
import { ref, watch } from "vue";
import { date } from 'yup';
// const handleSearch = async () => {
// };



// fetched data in array ob object(image, name)
// const data = [{ imageUrl: "https://res.cloudinary.com/dpbb1gfnc/image/upload/v1711029428/imjtuqledcy4zrkmfabr.jpg", name: "test 0" },
// { imageUrl: "https://res.cloudinary.com/dpbb1gfnc/image/upload/v1711029428/imjtuqledcy4zrkmfabr.jpg", name: "test 1" }]

const items = ref<Place[]>([]);
// const items1 = ref([{ post: 'Foo', user: "testUser", rate: 4 }, { post: 'Bar', user: "testUser", rate: 2 },
// { post: 'Foo', user: "testUser", rate: 2 }, { post: 'Foo', user: "testUser", rate: 2 }])




// ? will take user input 
// ? => will fetch data and map it in a arrayData of objects(imageUrl, name)
const visibleList = ref(false);
const query = ref('')

const autoCompletePlaceSearchStore = AutoCompletePlaceSearchStore()


const navigateTo = (id: string) => {
    router.push({ name: 'place', params: { id: id } });
}



const search = async () => {
    items.value = []
    visibleList.value = true;
    // api_service => data source => repository(evnt.query) : return data

    // data.push(event.data) /// this will be replaced with searchStore.search
    await autoCompletePlaceSearchStore.autoCompletePlaceSearch({ query: query.value });
    // data.push(autoCompletePlaceSearchStore.autoCompletePlaceSearchSuccess)

    items.value = autoCompletePlaceSearchStore.autoCompletePlaceSearchSuccess // this wil be replace with searchStore.result

}

watch(query, search);

const onClickAway = () => {
    visibleList.value = false;
}



</script>

<template>
    <section class="main-container">
        <div
            class="search-container mt-7 mb-2 flex rounded-full bg-gray-800 shadow-md py-3 px-3 w-full max-w-screen-md mx-auto">
            <input @keyup.enter="search" type="search" name="search" id="search" class="px-4 focus:outline-none   w-full
        focus:ring-opacity-50  text-gray-300 bg-transparent
         placeholder-gray-500" v-model="query" placeholder="Search">

            <button @click="search" class="btn"> <svg viewBox="0 0 24 24" class="search__icon">
                    <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                        </path>
                    </g>
                </svg></button>
        </div>

        <ul v-if="items && visibleList" class="search-list" ref="divRef" v-click-away="onClickAway">
            <li v-for="item in items" :key="item.name" @click="navigateTo(item.id)">
                <div>
                    <img :src="item.placeImage as string" />
                </div>

                <h1>
                    {{ item.name }}

                </h1>
            </li>
        </ul>


    </section>

    <!-- <div class="card flex justify-content-center">
        <AutoComplete v-model="selectedCountry" forceSelection optionLabel="name" :suggestions="filteredCountries"
            @complete="search" />
    </div> -->



</template>


<style lang="scss" scoped>
.main-container {
    padding: 0 2rem 0 2rem;
    display: flex;
    flex-direction: column;
    position: relative;

    // background-color: #008cff;

    .search-list {
        background-color: rgb(31 41 55);
        text-align: center;
        border-radius: 25px;
        position: absolute;
        overflow: visible;
        z-index: 3;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        left: 0;
        right: 0;
        top: 130px;
        max-width: 768px;
        overflow: hidden;
        max-height: calc(100vh - 210px);
        overflow-y: auto;

        li {
            display: flex;
            gap: 20px;
            margin-bottom: 2px;
            padding: 15px;
            align-items: center;
            cursor: pointer;
            width: 100%;

            &:hover {
                background-color: rgb(91, 181, 216, 0.85)
            }

            div {
                width: 25%;
                height: 25%;
                border-radius: 0.7rem;
                // background-color: #d2d6d9;
                object-fit: cover;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            h1 {
                text-align: center;
                font-weight: bolder;
                font-size: larger;
            }
        }



    }

}


.search-container {
    // justify-content: space-evenly;
    transition: 0.50s ease;
    user-select: none;

    input {
        padding: 10px;
        padding-left: 20px;
        width: 100%;
        // background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
        border: none;
        color: #9EBCD9;
        font-size: 24px;
        // border-radius: 50px;
        // background-color: red;
    }

    input:focus {
        outline: none;
        // background: linear-gradient(135deg, rgb(239, 247, 255) 0%, rgb(214, 229, 247) 100%);
    }



}

.btn {
    padding: 10px 20px;
    text-transform: uppercase;
    border-radius: 44px;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff80;
    text-shadow: none;
    background: transparent;
    cursor: pointer;
    box-shadow: transparent;
    // border: 1px solid #ffffff80;
    transition: 0.40s ease;
    user-select: none;
    // transition: transform .3s ease-in-out;
}

.btn:hover,
.btn:focus {
    color: #ffffff;
    background: #008cff;
    // border: 1px solid #008cff;
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
    box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff,
        0 0 100px #008cff;
}


.btn:active {
    transform: scale(0.95);
}



.search-container:focus-within {
    box-shadow: 0 0px 1px #ffffff, 0 0 25px #ffffff, 0 0 50px #d2d6d9,
}


.search__icon {
    width: 50px;
    aspect-ratio: 1;
    border-left: 2px solid white;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-radius: 50%;
    padding-left: 12px;
    margin-right: 10px;
}

.search__icon:hover {
    border-left: 3px solid white;
}

.search__icon path {
    fill: white;
}
</style>






<!-- 
<template>
    <div class="card flex justify-content-center">
        <AutoComplete v-model="value" :suggestions="items" @complete="search" variant="filled" />
    </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const items = ref([]);

const search = (event) => {
    items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}
</script> -->


<!-- 
// items.value = [...Array(2).keys()].map((item) => event.query + '-' + item + 1 + data[item].name);
// items.value.push([...Array(10).keys()].map((item) => event.query + '-' + item + 1))
// items.value = data
// console.log(items.value)
// console.log(toRaw(items.value))

// data.forEach(element => {

// });

// items.value = [data.length].map((item) => event.query + '-' + data[item].name);
// console.log(data.length) -->

<!-- // !!!!!! what is this :) !!!!!!!!!!!!!!!!!
// const search = async (event: any) => {

//     if (event.inputType === "deleteContentBackward") {
//         query.value = query.value.slice(0, -1)
//     } else if (event.data !== undefined) {
//         console.log(event)
//         query.value = query.value + event.data
//         console.log(query.value)
//     }


//     if (query.value) {
//         items.value = []
//         visibleList.value = true;
//         // api_service => data source => repository(evnt.query) : return data

//         // data.push(event.data) /// this will be replaced with searchStore.search
//         await autoCompletePlaceSearchStore.autoCompletePlaceSearch({ query: query.value });
//         // data.push(autoCompletePlaceSearchStore.autoCompletePlaceSearchSuccess)

//         items.value = autoCompletePlaceSearchStore.autoCompletePlaceSearchSuccess // this wil be replace with searchStore.result
//     }


// } -->