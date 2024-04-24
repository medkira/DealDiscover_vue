<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
// import TheWelcome from '@/presentation/components/TheWelcome.vue'
import { toRaw, isProxy } from 'vue';

import { ref, onMounted } from "vue";

const handleSearch = async () => {
};

// onMounted(() => {
//   CountryService.getCountries().then((data) => (countries.value = data));
// });


// fetched data in array ob object(image, name)
const data = [{ imageUrl: "https://res.cloudinary.com/dpbb1gfnc/image/upload/v1711029428/imjtuqledcy4zrkmfabr.jpg", name: "test 0" },
{ imageUrl: "https://res.cloudinary.com/dpbb1gfnc/image/upload/v1711029428/imjtuqledcy4zrkmfabr.jpg", name: "test 1" }]

// const testImgUrl = "https://res.cloudinary.com/dpbb1gfnc/image/upload/v1711029428/imjtuqledcy4zrkmfabr.jpg"
const values = ref("");
const items = ref<any[]>();



// ? will take user input 
// ? => will fetch data and map it in a arrayData of objects(imageUrl, name)

const search = (event: any) => {
    // api_service => data source => repository(evnt.query) : return data
    console.log(event.query)


    // items.value = [...Array(10).keys()].map((item) => event.query + '-' + item + 1);
    // items.value.push([...Array(10).keys()].map((item) => event.query + '-' + item + 1))
    items.value = data
    console.log(toRaw(items.value))
}




const countries = ref();
const selectedCountry = ref();
const filteredCountries = ref();


// const search = (event: any) => {
//   setTimeout(() => {
//     if (!event.query.trim().length) {
//       filteredCountries.value = [...countries.value];
//     } else {
//       filteredCountries.value = countries.value.filter((country) => {
//         return country.name.toLowerCase().startsWith(event.query.toLowerCase());
//       });
//     }
//   }, 250);
// }

</script>

<template>
    <div class="search-container m-7 flex rounded-full  bg-gray-800 shadow-md py-3 px-3 w-full max-w-screen-md mx-auto">
        <input @keyup.enter="search" type="search" name="search" id="search" class="px-4 focus:outline-none   w-full
        focus:ring-opacity-50  text-gray-300 bg-transparent
         placeholder-gray-500" placeholder="Search">
        <button @click="handleSearch" class="btn"> <svg viewBox="0 0 24 24" class="search__icon">
                <g>
                    <path
                        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                    </path>
                </g>
            </svg></button>
    </div>
</template>


<style lang="scss" scoped>
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