<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
// import TheWelcome from '@/presentation/components/TheWelcome.vue'
import { toRaw, isProxy } from 'vue';
import { ref, onMounted } from "vue";
const handleSearch = async () => {
};



// fetched data in array ob object(image, name)
const data = [{ imageUrl: "https://res.cloudinary.com/dpbb1gfnc/image/upload/v1711029428/imjtuqledcy4zrkmfabr.jpg", name: "test 0" },
{ imageUrl: "https://res.cloudinary.com/dpbb1gfnc/image/upload/v1711029428/imjtuqledcy4zrkmfabr.jpg", name: "test 1" }]

// const testImgUrl = "https://res.cloudinary.com/dpbb1gfnc/image/upload/v1711029428/imjtuqledcy4zrkmfabr.jpg"
const values = ref("");
const items = ref<any[]>(["ok"]);
const items1 = ref([{ post: 'Foo', user: "testUser", rate: 4 }, { post: 'Bar', user: "testUser", rate: 2 },
{ post: 'Foo', user: "testUser", rate: 2 }, { post: 'Foo', user: "testUser", rate: 2 }])

// items1.value = []


// ? will take user input 
// ? => will fetch data and map it in a arrayData of objects(imageUrl, name)
const visibleList = ref(false);

const search = (event: any) => {
    visibleList.value = true;
    // api_service => data source => repository(evnt.query) : return data
    console.log(event.data);
    data.push(event.data) /// this will be replaced with searchStore.search
    items1.value = [event.data, ...items1.value] // this wil be replace with searchStore.result


}

const onClickAway = () => {
    visibleList.value = false;
}



</script>

<template>
    <div class="main-container">
        <div
            class="search-container mt-7 mb-2 flex rounded-full  bg-gray-800 shadow-md py-3 px-3 w-full max-w-screen-md mx-auto">
            <input @keyup.enter="search" type="search" name="search" id="search" class="px-4 focus:outline-none   w-full
        focus:ring-opacity-50  text-gray-300 bg-transparent
         placeholder-gray-500" placeholder="Search" @input="search">

            <button @click="handleSearch" class="btn"> <svg viewBox="0 0 24 24" class="search__icon">
                    <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                        </path>
                    </g>
                </svg></button>
        </div>

        <ul v-if="items && visibleList" class="search-list" ref="divRef" v-click-away="onClickAway">
            <li v-for="item in items1" :key="item.user" @click="handleSearch">
                <div>
                    image
                </div>

                <h1>
                    {{ item }}

                </h1>
            </li>
        </ul>


    </div>

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
                width: 70px;
                height: 70px;
                border-radius: 10px;
                background-color: #d2d6d9;
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