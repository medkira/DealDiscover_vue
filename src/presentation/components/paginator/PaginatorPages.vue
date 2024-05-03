<script setup lang="ts">
const prop = defineProps<({
    pages: any,
    currentPage: any
})>()

// console.log("CURRENT ", prop.currentPage)

const emit = defineEmits(['Previous', 'Next']);
// emit('Previous'); 
// emit('Next');

</script>

<template>
    <div class="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600">
        <div class="hidden items-center justify-between sm:flex" aria-label="Pagination">
            <button class="flex items-center gap-x-2" @click="emit('Previous')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                        clip-rule="evenodd" />
                </svg>
                Previous
            </button>
            <ul class="flex items-center gap-1">
                <li class="text-sm" v-for="(item) in prop.pages" :key="item.rate">
                    <div :class="{ 'active': prop.currentPage === item }">
                        {{ item }}
                    </div>
                </li>
            </ul>

            <button class="flex items-center gap-x-2" @click="emit('Next')">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>
        <!-- On mobile version -->
        <div
            class="mobile-pagination-container flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
            <a @click="emit('Previous')" class=" px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Previous</a>
            <div class="font-medium">
                Page {{ currentPage }}
            </div>
            <a @click="emit('Next')" class="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Next</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
// .mobile-pagination-container {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 15px;
//     background-color: #a9bac0;
// }



/* Base styles for all list items */
.flex li div {
    font-size: medium;
    padding: 10px 15px;
    /* Adjust padding as desired */
}

/* Styles for the active list item */
.active {
    background-color: white;
    border-radius: 9px;

    /* Adjust border radius as desired */
}

a {
    cursor: pointer;
    color: #011e29;
}

button {
    cursor: pointer;
    font-weight: 700;
    /* font-family: Helvetica, "sans-serif"; */
    transition: all .2s;
    padding: 10px 20px;
    border-radius: 100px;
    background: #3db3dd;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #f1f0f0;
}

button:hover {
    background: #36a3ca;
}

button>svg {
    width: 34px;
    margin-left: 10px;
    transition: transform .3s ease-in-out;
}

button:hover svg {
    transform: translateX(5px);
}

button:active {
    transform: scale(0.95);
}
</style>