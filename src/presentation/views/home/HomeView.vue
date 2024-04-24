<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
// import TheWelcome from '@/presentation/components/TheWelcome.vue'
import { toRaw, isProxy } from 'vue';

import { ref, onMounted } from "vue";

import SearchBar from '@/presentation/components/search-bar/SearchBar.vue';
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
  <main>
    <div class="titles">
      <div class="font">
        <h2 class="title">Time To <span class="highlight">Discover</span></h2>
        <h3 class="subtitle">Let The Chat <span class="highlight">Choose</span> For You</h3>
      </div>
    </div>


    <search-bar />
    <div class="image-container" data-aos="fade-up" data-aos-duration="2500" data-aos-once="true"
      data-aos-anchor-placement="center-center" data-aos-easing="ease-out-cubic">
      <h1 class="text">Thinking About Exploring El Jam!</h1>
      <img src="/src/presentation/resources/images/photoElJam.jpg" alt="" />

    </div>


  </main>
</template>

<style scoped lang="scss">
@media (max-width: 1024px) {
  .titles {
    margin-top: 20%;
  }

}

img {

  display: block;
  // width: 100%;
  // width: 2000px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition:
    transform 0.41s ease-in-out;
}

.image-container:hover img {
  transform: scale(1.04);
}

.text {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.3rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

  transition:
    transform 0.41s ease-in-out;
}

main {
  height: 1100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  // gap: 4px;
}





.titles {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 7%;
}

.font {
  font-size: 60px;
  font-weight: 400;
  font-style: normal;
}

.subtitle {
  font-weight: bold;
  color: #f6f6f6;
  margin-bottom: 1rem;
}

.title {
  font-weight: bold;
  color: #f0f0f0;
  padding-right: 55px;
}

.highlight {
  color: #243c54;
  font-weight: bold;
}



.container {
  position: relative;
  background: linear-gradient(135deg, rgb(179, 208, 253) 0%, rgb(164, 202, 248) 100%);
  border-radius: 1000px;
  padding: 10px;
  display: grid;
  place-content: center;
  z-index: 0;
  max-width: 300px;
  margin: 0 10px;
}

.input {
  padding: 10px;
  width: 100%;
  background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
  border: none;
  color: #9EBCD9;
  font-size: 20px;
  border-radius: 50px;
}

.input:focus {
  outline: none;
  background: linear-gradient(135deg, rgb(239, 247, 255) 0%, rgb(214, 229, 247) 100%);
}
</style>


<!-- <div class="card flex justify-content-center">
      <AutoComplete v-model="values" :suggestions="items" @complete="search">
        <template #option="slotProps">
          <div class="flex align-options-center w-60">
            <img :src="slotProps.option.imageUrl" alt="no image provided">
          </div>
          <div>{{ slotProps.option.name }}</div>
        </template>
</AutoComplete>
</div> -->
<!-- 
    <div class="card flex justify-content-center">
      <AutoComplete v-model="selectedCountry" optionLabel="name" :suggestions="filteredCountries" @complete="search">
        <template #option="slotProps">
          <div class="flex align-options-center">
            <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </AutoComplete>
    </div> -->
