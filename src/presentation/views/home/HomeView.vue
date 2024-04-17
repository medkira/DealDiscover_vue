<script setup lang="ts">
// import TheWelcome from '@/presentation/components/TheWelcome.vue'
</script>

<template>
  <main>

    <div class="titles">
      <div class="font">
        <h2 class="title">Time To <span class="highlight">Discover</span></h2>
        <h3 class="subtitle">Let The Chat <span class="highlight">Choose</span> For You</h3>
      </div>
    </div>



    <!-- search -->
    <!-- 
    <div class="container">
      <div class="search-container">
        <input class="input" type="text">
        <svg viewBox="0 0 24 24" class="search__icon">
          <g>
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
            </path>
          </g>
        </svg>
      </div>
    </div> -->


    <div class="search-container m-7 flex rounded-full  bg-gray-800 shadow-md py-3 px-3 w-full max-w-screen-md mx-auto">
      <input type="search" name="search" id="search" class="px-4 focus:outline-none   w-full
        focus:ring-opacity-50  text-gray-300 bg-transparent
         placeholder-gray-500" placeholder="Search">
      <!-- <button type="submit"
        class="px-4 py-3 text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-r-lg">
        Search
      </button> -->
      <button class="btn">Search</button>
    </div>

  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  align-items: center;
  flex-direction: column;
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
  }

  input:focus {
    outline: none;
    // background: linear-gradient(135deg, rgb(239, 247, 255) 0%, rgb(214, 229, 247) 100%);
  }
}

.btn {
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 16px;
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

  // background: #008cff;

  // box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff, 0 0 100px #008cff;
  // color: #ffffff;

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



.search-container:focus-within {
  box-shadow: 0 0px 1px #ffffff, 0 0 25px #ffffff, 0 0 50px #d2d6d9,
}



.titles {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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

// .search-container {
//   position: relative;
//   width: 100%;
//   border-radius: 50px;
//   background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
//   padding: 5px;
//   display: flex;
//   align-items: center;
// }

// .search-container::after,
// .search-container::before {
//   content: "";
//   width: 100%;
//   height: 100%;
//   border-radius: inherit;
//   position: absolute;
// }

// .search-container::before {
//   top: -1px;
//   left: -1px;
//   background: linear-gradient(0deg, rgb(218, 232, 247) 0%, rgb(255, 255, 255) 100%);
//   z-index: -1;
// }

// .search-container::after {
//   bottom: -1px;
//   right: -1px;
//   background: linear-gradient(0deg, rgb(163, 206, 255) 0%, rgb(211, 232, 255) 100%);
//   box-shadow: rgba(79, 156, 232, 0.7019607843) 3px 3px 5px 0px, rgba(79, 156, 232, 0.7019607843) 5px 5px 20px 0px;
//   z-index: -2;
// }

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
