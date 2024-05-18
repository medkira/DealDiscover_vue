<template>
    <main>
        <!-- <div class="container-failure" v-if="getUserStore.GetLatestPlacesFailure">
            <h1>No Place Contributions </h1>
            <button @click=" fetchData()" class="btn-class-name">
                <span class="back"></span>
                <span class="front"></span>
            </button>
            <p>Press to refresh</p>
        </div> -->
        <div class="container">


            <TabsRoot class="max-w-screen-xl mt-2 mx-auto px-4 md:px-8" v-model="selectedTabInput">
                <TabsList class="hidden gap-x-3 py-1 overflow-x-auto px-px text-xl sm:flex"
                    aria-label="Manage your account">
                    <TabsTrigger v-for="(item, idx) in tabItems" :key="idx"
                        class="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 data-[state=active]:shadow-sm outline-gray-800 py-1.5 px-3 rounded-lg duration-150 text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-100 font-medium"
                        :value="item">
                        {{ item }}
                    </TabsTrigger>
                </TabsList>
                <div class="relative text-gray-500 sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto">
                        <path fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd" />
                    </svg>
                    <select v-model="selectedTabInput"
                        class="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-gray-800 text-sm">
                        <option v-for="(item, idx) in tabItems" :key="idx" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>
                <TabsContent v-for="(item, idx) in    tabItems   " :key="idx" class="py-6" :value="item">
                    <section v-if="item == 'Account Info'">
                        <div class="flex items-center">
                            <Avatar class=" Avatar m-7 " size="xlarge" shape="circle" :image=userInfo.profileImage />
                            <div class="uploadInput">
                                <label for="file" v-bind:textContent="fileNameLabel()" />
                                <input v-on:change="customUploader" type="file">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                        stroke="#fffffff" stroke-width="2"></path>
                                    <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>

                        <div class="information">

                            <div>
                                <h1><span>User Name</span> </h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.username" />
                            </div>
                            <div>
                                <h1><span>Email Adress</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.email" />
                            </div>

                            <div>
                                <h1><span>First Name</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.firstName" />
                            </div>

                            <div>
                                <h1><span>Last Name</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.lastName" />

                            </div>

                            <div>
                                <h1><span>Phone Number</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.phoneNumber" />

                            </div>

                            <div>
                                <h1><span>Country</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.country" />
                            </div>

                        </div>



                        <div class="main-section">
                            <!-- <p class="profileImageDialog" @click="[visible = true, visiblePlace(index)]">Place Image</p> -->
                            <div class="buttons-container">

                                <button @click="[visibleUpdate = true, updateUser()]">Update</button>
                                <!-- <button @click="[visibleAddTomenu = true]">Add To menu</button>
                        <button @click="[visibleUpdate = true]">Delete</button> -->


                                <!-- <button @click="deletePlace(item.id)">Delete</button> -->
                            </div>
                        </div>

                        <!-- <div class="card overflow-hidden">
                    <Accordion :activeIndex="0" style=" font-size: larger; color: aliceblue; font-weight: bold;">
                        <AccordionTab header="View Menue">
                            <div v-if="fetchedData">
                                <FoodDataContainer :data="getLatestFoodStore.GetLatestFoodsSuccess" :place_id=place_id
                                    @fetchdata="fetchData" />
                            </div>
                        </AccordionTab>

                    </Accordion>
                </div> -->
                    </section>
                    <section v-if="item == 'Personal Info'">
                        <!-- <Avatar icon=" user_image" class=" Avatar m-7 " size="xlarge" shape="circle" /> -->

                        <div class="information">

                            <div>
                                <h1><span>Address</span> </h1>
                                <InputText id="Adress" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.address" />
                            </div>
                            <div>
                                <h1><span>Job</span> {{ }}</h1>
                                <InputText id="job" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.jobTitle" />
                            </div>

                            <div>
                                <h1><span>Budget</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.budget" />
                            </div>

                            <div>
                                <h1><span>Social Status</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.socialStatus" />

                            </div>


                        </div>



                        <div class="main-section">
                            <!-- <p class="profileImageDialog" @click="[visible = true, visiblePlace(index)]">Place Image</p> -->
                            <div class="buttons-container">

                                <button @click="[visibleUpdate = true, updateUser()]">Update</button>
                                <!-- <button @click="[visibleAddTomenu = true]">Add To menu</button>
                        <button @click="[visibleUpdate = true]">Delete</button> -->


                                <!-- <button @click="deletePlace(item.id)">Delete</button> -->
                            </div>
                        </div>

                        <!-- <div class="card overflow-hidden">
                    <Accordion :activeIndex="0" style=" font-size: larger; color: aliceblue; font-weight: bold;">
                        <AccordionTab header="View Menue">
                            <div v-if="fetchedData">
                                <FoodDataContainer :data="getLatestFoodStore.GetLatestFoodsSuccess" :place_id=place_id
                                    @fetchdata="fetchData" />
                            </div>
                        </AccordionTab>

                    </Accordion>
                </div> -->
                    </section>
                    <section v-if="item == 'Security Info'">
                        <!-- <Avatar icon=" user_image" class=" Avatar m-7 " size="xlarge" shape="circle" /> -->

                        <!-- <div class="information">

                            <div>
                                <h1><span>Address</span> </h1>
                                <InputText id="Adress" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.address" />
                            </div>
                            <div>
                                <h1><span>Job</span> {{ }}</h1>
                                <InputText id="job" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.jobTitle" />
                            </div>

                            <div>
                                <h1><span>Budget</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.budget" />
                            </div>

                            <div>
                                <h1><span>Social Status</span> {{ }}</h1>
                                <InputText id="emailInput" class="bg-white/20 border-0 p-4 text-primary-50"
                                    v-model="userInfo.socialStatus" />

                            </div>


                        </div> -->



                        <div class="main-section">
                            <!-- <p class="profileImageDialog" @click="[visible = true, visiblePlace(index)]">Place Image</p> -->
                            <div class="buttons-container">

                                <button @click="[verifyEmail()]">Validate Email</button>
                                <button @click="[resetPassword()]">Reset Password</button>

                                <!-- <button @click="[visibleAddTomenu = true]">Add To menu</button>
                        <button @click="[visibleUpdate = true]">Delete</button> -->


                                <!-- <button @click="deletePlace(item.id)">Delete</button> -->
                            </div>
                        </div>

                        <!-- <div class="card overflow-hidden">
                    <Accordion :activeIndex="0" style=" font-size: larger; color: aliceblue; font-weight: bold;">
                        <AccordionTab header="View Menue">
                            <div v-if="fetchedData">
                                <FoodDataContainer :data="getLatestFoodStore.GetLatestFoodsSuccess" :place_id=place_id
                                    @fetchdata="fetchData" />
                            </div>
                        </AccordionTab>

                    </Accordion>
                </div> -->
                    </section>
                </TabsContent>
            </TabsRoot>
        </div>
    </main>

    <Dialog :visible="updateUserStore.UpdateUserLoading" modal :style="{ width: '40rem' }" close-icon=false>
        <div class="bg-[#2980b9] p-[1rem] rounded-2xl flex flex-col items-center justify-center">
            <LoadingCube />
            <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
        </div>
    </Dialog>






    <!-- <Dialog :dismissable-mask="true" modal v-model:visible="visibleAddTomenu" :style="{ width: '30rem' }">

        <div class="main-update-container">
            <div class="containerInputs">
                <section>
                    <label for="Name" class="text-primary-50 font-semibold">Name</label>
                    <InputText id="Name" class="bg-white/90 border-0 p-4 text-primary-50" v-model="nameInput" />

                    <label for="Price" class="text-primary-50 font-semibold">Price</label>
                    <InputText id="Price" class="bg-white/90 border-0 p-4 text-primary-50" v-model="priceInput" />
                    <div class="uploadInput">
                        <label for="file" v-bind:textContent="fileNameLabel()" />
                        <input v-on:change="customUploader" type="file">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                stroke="#fffffff" stroke-width="2"></path>
                            <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>

                </section>

                <section>
                    <div class="update-buttons-container">
                        <button @click="createFood()">Update</button>
                        <button @click="visibleAddTomenu = false">cancel</button>
                    </div>
                </section>
            </div>
        </div>

    </Dialog> -->
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { onMounted, ref } from 'vue';
import LoadingCube from '@/presentation/components/animation/LoadingCube.vue';
import { useToast } from 'primevue/usetoast';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue';
import { GetUserStore } from '@/presentation/stores/Users/GetUserStore';
import { UpdateUserStore } from '@/presentation/stores/Users/UpdateUserStore';
import { appServiceClientInstance } from '@/app/factory/di';


const selectedTabInput = ref("Account Info");

const tabItems = [
    "Account Info",
    "Personal Info",
    "Security Info"
    // "Integration",
    // "Billing",
    // "Transactions",
    // "plans",
];

// const handleTabChange = (e: any) => {
//     selectedTabInput.value = e.target.value;
// };


//**************** Update User Info *************//
const updateUserStore = UpdateUserStore();

const updateUser = async () => {


    //* check if value changed => create a a new object nad inject it in updateStore *//

    const compareBeforeUPload = (obj1: any, obj2: any) => {
        return Object.keys(obj1).reduce((diff: any, key) => {
            // Check if key exists in both objects
            // Values are different
            if (obj1[key] !== obj2[key]) {
                diff[key] = obj1[key]; // Store value from obj1
            }

            return diff;
        }, {});
    }



    const differences = compareBeforeUPload(userInfo.value, getUserStore.GetUserSuccess);
    console.log("differences", differences);
    await updateUserStore.UpdateUser(differences);

    fetchData();
    if (updateUserStore.UpdateUsergSuccess) {
        visibleAddTomenu.value = false
        showSuccess(updateUserStore.UpdateUserStatusMessage!);
        resetStates();
    }
}
//******************************************//


// const usernameInput = ref('');
// const emailInput = ref('');
// const firstNameInput = ref('');
// const lastNameInput = ref('');
// const phoneNumberInput = ref('');
// const countryInput = ref('');
// const addressInput = ref('');
// const jobTitleInput = ref('');
// const budgetInput = ref('');
// const socialStatusInput = ref('');
// const profileImageInput = ref();


const userInfo = ref({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    address: '',
    jobTitle: '',
    budget: '',
    socialStatus: '',
    profileImage: '',
});

//********** FETCH User Info  ***************/
// let fetchedData: any;
const getUserStore = GetUserStore();

// const fetchedData = ref()

const fetchData = async () => {
    // const userId = cookieAdapter.getIdFromToken();
    await getUserStore.GetUser();
    const { username, address, email, profileImage, salary, jobTitle, phoneNumber, lastName, firstName, socialStatus, country } = getUserStore.GetUserSuccess;

    userInfo.value = {
        username,
        email,
        address,
        jobTitle,
        phoneNumber,
        firstName,
        lastName,
        socialStatus,
        budget: salary, // Assuming budget is intended for salary
        country,
        profileImage: profileImage as string,
    };

}
//*********************************************//



//*************** Security Verify Email && reset Password *************//
//!!!!!! this worng 
const verifyEmail = async () => {
    try {
        console.log(userInfo.value.email)
        await appServiceClientInstance.verifyEmail({ email: userInfo.value.email });
        toast.add({
            severity: 'success',
            summary: "Email Verification Sent",
            detail: `A verification email has been sent to ${userInfo.value.email}. Please check your inbox and follow the instructions to verify your email address.`,
            life: 3000,
            group: 'tl'
        });
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: "Verification Failed",
            detail: `There was an error sending the verification email to ${userInfo.value.email}. Please try again later.`,
            life: 3000,
            group: 'tl'
        });
    }
}

const resetPassword = async () => {
    try {
        await appServiceClientInstance.resetPassword({ email: userInfo.value.email });
        toast.add({
            severity: 'success',
            summary: "Password Reset Email Sent",
            detail: `A password reset link has been sent to ${userInfo.value.email}. Please check your inbox and follow the instructions to reset your password.`,
            life: 3000,
            group: 'tl'
        });
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: "Reset Failed",
            detail: `There was an error sending the password reset email to ${userInfo.value.email}. Please try again later.`,
            life: 3000,
            group: 'tl'
        });
    }
}




const visibleAddTomenu = ref(false);
const visibleUpdate = ref(false)
// const place_id = ref();
// const nameInput = ref();
// const priceInput = ref();



//********* File Image *****************//
let selectedFile;

const customUploader = async (event: any) => {
    // console.log("profileImage: ", event)
    selectedFile = event.target.files[0];
    userInfo.value.profileImage = selectedFile;
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });

};

const fileNameLabel = () => {

    return userInfo.value.profileImage !== getUserStore.GetUserSuccess.profileImage ? `Selected new image!` : 'Chage profile Image';
}

const toast = useToast();
const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
    if (getUserStore.GetUserSuccess) {
        toast.add({ severity: 'success', summary: getUserStore.getSuccessMessage, detail: msg, life: 3000, group: 'tl' });
    }
};
//********************************************/



//* data bainding */
onMounted(() => {
    fetchData();
})


const resetStates = () => {
    // place_id.value = '';
    userInfo.value.profileImage = '';
    // nameInput.value = '';
    // priceInput.value = '';

}



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
    // height: 41rem;
    // overflow: scroll;

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


        section {
            display: flex;
            flex-direction: column;
            background-color: rgb(#f6f6f6, 0.17);
            width: 100%;
            border-radius: 1rem;
            overflow: hidden;

            h1 {
                padding: 1rem 1rem 0.5rem 1rem;
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
                flex-direction: row;
                flex-wrap: wrap;
                margin-bottom: 1rem;
                align-items: center;
                justify-content: start;
                padding-left: 4%;
                gap: 2vw;
                // background-color: #04aa6d;
                max-width: 90% // div {
                //     width: 40%;
                // }
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

                // button:last-child {
                //     background-color: #d9534f;
                //     border-radius: 50px;
                //     padding: 15px 20px 15px 20px;
                //     font-size: 0.8rem;
                //     font-weight: 700;
                //     color: #f1f0f0;
                //     border: 2px solid #d9534f;
                //     transition: transform 0.14s ease-in;
                // }

                // button:hover:last-child {
                //     background-color: #c9302c;
                //     border: 2px solid #c0302c;
                //     cursor: pointer;
                // }

                // button:active:last-child {
                //     transform: scale(0.95);
                // }

            }

        }


    }

}

.buttons-container {
    display: flex;
    gap: 1.1rem;
    width: 100%;
    justify-content: center;
}

.profileImageDialog {
    cursor: pointer;
    font-weight: bold;
    font-size: larger;

    &:hover {
        color: #f7f6f6;

    }
}


@media (min-width: 1024px) {

    .profileImageDialog {
        font-size: larger;

    }

    main {
        margin: 7rem 29rem 0rem 29rem;
        padding: 2rem 2.3rem 0rem 2.3rem;
        height: 50rem;


    }

    .buttons-container {
        display: flex;
        gap: 1.1rem;
        width: 100%;
        justify-content: start;
    }


}




//*********************************UPDATE ***************************//

.update-buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

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



.main-update-container {
    // position: absolute;
    // border-radius: 20px;
    // padding: 37px;
    // margin: 7rem 35rem 0 35rem;
    // left: 0px;
    // right: 0px;
    // max-width: 50vh;

    .containerInputs {
        display: flex;
        flex-direction: column;
        gap: 20px;
        // max-width: 50vh;

        section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            // div {
            //     display: flex;
            //     flex-direction: column;
            //     gap: 1rem;

            // }
        }



        // section:nth-last-child(-n+2) {
        //     // background-color: red;
        //     display: flex;
        //     align-items: center;
        // }
    }

}






.uploadInput {
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.75rem 1.5rem;
    background: #3db3dd;
    color: #ffffff;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    user-select: none;
    gap: 0.75rem;
    box-shadow: 0 4px 6px -1px #488aec31, 0 2px 4px -1px #488aec17;
    transition: all .6s ease;
    cursor: pointer;
    height: 20%;

    label {
        font-size: large;
        user-select: none;
    }

    input[type="file"] {
        // width: 100%;
        height: 50px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        // z-index: -1;
        background-color: red;
        cursor: pointer;
    }

    input[type="file"]::file-selector-button {
        cursor: pointer;
        width: 0px;
        // opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        position: absolute;

    }

    /* file upload button hover state */
    input[type="file"]::file-selector-button:hover {
        cursor: pointer;

    }

    /* file upload button active state */
    // input[type="file"]::file-selector-button:active {
    //     background-color: #e5e7eb;
    // }
}


.uploadInput:hover {
    box-shadow: 0 10px 15px -3px #488aec4f, 0 4px 6px -2px #488aec17;
}

.uploadInput:focus,
.uploadInput:active {
    opacity: .85;
    box-shadow: none;
}

.uploadInput svg {
    width: 1.25rem;
    height: 1.25rem;
}
</style>
