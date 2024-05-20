<script setup lang="ts">
import { ref, toRaw } from "vue";
import Rating from 'primevue/rating';
import Avatar from 'primevue/avatar';
import LookingEyes from '@/presentation/components/animation/LookingEyes.vue';
import Dialog from 'primevue/dialog';
import PrimaryButton from '@/presentation/components/Buttons/PrimaryButton.vue';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea';
import PostButton from '@/presentation/components/animation/PostButton.vue';
import { useToast } from "primevue/usetoast";
import VirtualScroller from 'primevue/virtualscroller';
import Skeleton from 'primevue/skeleton';
import Toast from 'primevue/toast';
import { CreatePostStore } from "@/presentation/stores/Posts/CreatePostStore";
import { GetLatestsPostsStore } from "@/presentation/stores/Posts/GetLatestPostsStore";
import LoadingCube from "@/presentation/components/animation/LoadingCube.vue"
import { Post } from "@/domain/entities/Post"
import { onMounted } from "vue";
import { GetLatestsCommentsStore } from "@/presentation/stores/Comments/GetLatestCommentsStore";
import { CreateCommentStore } from "@/presentation/stores/Comments/CreateCommentStore";
import { NormalUser } from "@/domain/entities/NormalUser";
import type { Comment } from "@/domain/entities/Comment";

const visibleAddPostDialog = ref(false);
const visibleAddcomments = ref(false)



const post_type = ref<any>();
const content = ref('');
const rate = ref(0);
const image = ref();
const createPostStore = CreatePostStore();



var selectedFile;
const submitPostRate = async () => {
    await createPostStore.CreatePost({ content: content.value, post_type: post_type.value, postImage: image.value, rate: rate.value });

    if (createPostStore.isCreatedPostSuccess) {
        showSuccess(createPostStore.getSuccessMessage as string);
        visibleAddPostDialog.value = false;
        createPostStore.reset();
        image.value = "";
    }

    fetchData();
}



const customUploader = async (event: any) => {
    selectedFile = event.target.files[0];
    image.value = selectedFile;
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });

};


const cancelPost = () => {
    image.value = "";
}




// style 
const fileNameLabel = () => {
    return image.value ? `Selected: ${image.value.name}` : 'Choose a image';
}

const toast = useToast();
const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
    if (createPostStore.isCreatedPostSuccess) {
        toast.add({ severity: 'success', summary: 'Success Message', detail: msg, life: 3000, group: 'tl' });
    }

};
const showSuccessCreateComment = (msg: string) => {

    if (createCommentStore.isCreatedCommentSuccess) {
        toast.add({ severity: 'success', summary: 'Success Message', detail: msg, life: 3000, group: 'tl' });

    }
}

//************ creaet comments   ******************//
const commentInput = ref('');
const selectedPostId = ref('');
const createCommentStore = CreateCommentStore();

const createComment = async () => {
    await createCommentStore.CreateComment({ postId: selectedPostId.value, text: commentInput.value });
    // console.log(createCommentStore.CreateCommentLoading)
    showSuccessCreateComment(createCommentStore.getSuccessMessage)
    await fetchComments(selectedPostId.value);
}

//*************************************************//




//************** FETCH POSTS & COMMENTS **************/
const getLatestsPostsStore = GetLatestsPostsStore()
const getLatestCommentsStore = GetLatestsCommentsStore();



const fetchComments = async (postId: string) => {
    // console.log(postId)
    selectedPostId.value = postId
    await getLatestCommentsStore.GetLatestComments({ postId, page: 1 });
    // console.log(getLatestCommentsStore.GetLatestCommentsSuccess);
    comments.value = getLatestCommentsStore.GetLatestCommentsSuccess

}

const fetchData = async () => {
    await getLatestsPostsStore.GetLatestPosts({ page: 1 })
    const data = getLatestsPostsStore.GetLatestPostsSuccess
    items.value = toRaw(data)
    // console.log(toRaw(data))
};

onMounted(() => {
    fetchData();
})
//****************************************************************************** */


const items = ref<Post[]>([]);

const comments = ref();


</script>

<template>


    <main>

        <div class="do-post-container">
            <LookingEyes />

            <h1 class="text-[#f6f6f6]">Waiting for your Post-Rate! </h1>


            <PrimaryButton @click="[visibleAddPostDialog = true]" class="primary-button" text="POST" />

            <Dialog :close-on-escape="true" :dismissable-mask="true" v-model:visible="visibleAddPostDialog" modal :pt="{
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }">


                <template #container="{ closeCallback }">
                    <!-- LOADING VIEW -->
                    <div v-if="createCommentStore.CreateCommentLoading || createPostStore.CreatePostLoading"
                        class="bg-[#2980b9] p-[200px] rounded-2xl flex flex-col items-center justify-between">
                        <LoadingCube />
                        <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
                    </div>


                    <!-- CREATE POST FORM -->
                    <div v-else class="flex flex-col px-10 py-7 gap-5 "
                        style="border-radius: 12px; background: #2980b9;">
                        <!-- <div v-if="logingStore.loginStatusMessage"
                                class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50">
                                {{ logingStore.loginStatusMessage }}
                            </div> -->
                        <div class="inline-flex flex-col gap-2">
                            <label for="post type" class="text-primary-50 font-semibold">Post type</label>
                            <InputText v-model="post_type" id="post type"
                                class="bg-white/20 border-0 p-4 text-primary-50" type="post type">
                            </InputText>
                        </div>

                        <div class="inline-flex flex-col gap-2">
                            <label for="content" class="text-primary-50 font-semibold">Content</label>
                            <Textarea v-model="content" id="content" class="bg-white/20 border-0 p-4 text-primary-50">
                            </Textarea>
                        </div>

                        <div class="inline-flex flex-col gap-2">
                            <label for="image" class="text-primary-50 font-semibold">Image</label>
                            <Toast />
                            <!-- customUpload @uploader="customUploader" -->
                            <!-- <FileUpload accept="image/*" :maxFileSize="10000000" :v-on:change="customUploader" /> -->

                            <!-- UPLOAD BUTTON -->

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

                        <div class="inline-flex flex-col gap-2">
                            <label for="rate" class="text-primary-50 font-semibold">Your Rate</label>

                            <Rating v-model="rate" :stars="7" :cancel="false" />
                        </div>



                        <div class="flex items-center gap-2">
                            <Button @click="submitPostRate" label="Post Rate" text
                                class="p-4 w-full text-primary-50 border border-white-alpha-30 hover:bg-white/10"></Button>
                            <Button label="Cancel" @click="[closeCallback(), cancelPost()]" text
                                class="p-4 w-full text-primary-50 border border-white-alpha-30 hover:bg-white/10"></Button>
                        </div>
                    </div>
                </template>


            </Dialog>

        </div>




        <!-- view Lates Posts -->
        <h1 class="title">Latest Post-Rates</h1>
        <div class="posts-container">

            <div class="post-container" v-for="(  post  ) in    getLatestsPostsStore.GetLatestPostsSuccess   "
                :key="post.id">

                <!-- "/src/presentation/resources/images/Beach/bizerteBeach.jpg"  -->
                <!-- <img clas="tes" :src=post.postImage[0] alt="post rate image" loading="lazy"> -->
                <img clas="tes" :src=post.postImage alt="post rate image" loading="lazy">



                <div class="user-container">
                    <Avatar class=" Avatar " size="large" shape="circle" />
                    <h1>{{ post.user_name }}</h1>
                </div>

                <h2 class="post-text">{{ post.content }} </h2>

                <Rating v-model="post.rate" :stars="7" :cancel="false" readonly />
                <div>
                    <PostButton @click="[visibleAddcomments = true, fetchComments(post.id)]" />
                </div>
            </div>



        </div>

        <!-- View Post and Add comment dialog -->
        <Dialog :dismissableMask="true" :close-on-escape="true" class="   w-[90%]   lg:w-[35%]"
            v-model:visible="visibleAddcomments" modal :pt="{
                mask: {
                    style: 'backdrop-filter: blur(5px'
                },

            }">
            <template #container="{ closeCallback }">
                <div v-if="createCommentStore.CreateCommentLoading"
                    class="bg-[#2980b9] p-[200px] rounded-2xl flex flex-col items-center justify-between  ">
                    <LoadingCube />
                    <h1 class="font-bold text-3xl pt-32">Loading ....</h1>
                </div>
                <div v-else class="flex flex-col px-10 py-7 gap-5 " style="border-radius: 12px; background: #2980b9;
">

                    <!-- Post content -->
                    <div class="flex flex-col gap-2 mb-4">
                        <h2 class="text-lg font-bold text-primary-50">Post Title</h2>
                        <p class="text-sm text-primary-50">Post content...</p>
                        <!-- <img class="h-[300px] w-[300px]" src="/src/presentation/resources/images/Beach/bizerteBeach.jpg"
                            alt="" loading="lazy"> -->

                    </div>

                    <!-- Add comment section -->
                    <div class="flex flex-col gap-2">
                        <label for="comment" class="text-primary-50 font-semibold">Add a comment</label>
                        <InputText v-model="commentInput" id="comment" class="bg-white/20 border-0 p-4 text-primary-50"
                            type="text">
                        </InputText>
                        <Button @click="createComment()" label="Comment" text
                            class="p-4 w-full text-primary-50 border border-white-alpha-30 hover:bg-white/10"></Button>
                    </div>
                    <!-- View comments section -->
                    <div class="card flex flex-wrap justify-content-center gap-5 ">
                        <div>
                            <span class="font-bold block mb-2">Comments</span>
                            <VirtualScroller :items="comments" :itemSize="70" showLoader :delay="250"
                                :class="[' w-[60vh] h-[300px]  ']"
                                class="no-scrollbar custom-scroller border-1 surface-border border-round">
                                >
                                <template v-slot:item="{ item }">
                                    <div class="flex align-items-center p-2 gap-5 al" style="height: 70px">
                                        <Avatar :image="item.profileImage" :size="'large'" shape="circle" />
                                        <div class="ml-2">
                                            <span class=" text-primary-50 text-xl">{{ item.username }}</span>
                                            <p class=" text-primary-50 text-lg">{{ item.text }}</p>
                                        </div>
                                    </div>
                                </template>
                                <template v-slot:loader="{ options }">
                                    <div :class="['flex align-items-center p-2', { 'surface-hover': options.odd }]">
                                        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                                        <div>
                                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                                            <Skeleton height=".5rem"></Skeleton>
                                        </div>
                                    </div>
                                </template>
                            </VirtualScroller>
                        </div>
                    </div>

                    <!-- Cancel button -->
                    <Button label="Cancel" @click="closeCallback" text
                        class="p-4 w-full text-primary-50 border border-white-alpha-30 hover:bg-white/10"></Button>
                </div>


            </template>
        </Dialog>

    </main>
</template>

<style scoped lang="scss">
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.uploadInput {
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.75rem 1.5rem;
    background-color: #488aec;
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


.primary-button {
    font-size: x-large;
    transform: scale(1.1);
    color: #f6f6f6;
}

.do-post-container {
    margin-top: 29px;
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(#f6f6f6, 0.17);
    padding: 25px 0px 25px 0;
    gap: 50px;
    border-radius: 25px;
    text-align: center;

    h1 {
        font-size: 30px;
        font-weight: bold;
    }
}

@media (max-width: 1024px) {

    .do-post-container {
        width: 50%;


    }
}

.title {
    font-size: 45px;
    text-align: start;
    // background-color: red;
    width: 93%;
    color: #f6f6f6;
    margin-bottom: -15px;
    font-weight: bolder;
}

main {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
}

.posts-container {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    padding: 50px;
    justify-content: center;
    background-color: rgb(#f6f6f6, 0.17);
    border-radius: 0.5rem;

    .post-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
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
    }


    div {
        cursor: pointer;
        background-color: rgb(#acd6d3, 0.45);
        padding: 18px;
        border-radius: 25px;
        transition: transform 0.14s ease-in;

        &:hover {
            transform: scale(1.05);
            background-color: rgb(#acd6d3, 0.69);

        }

        img {
            border-radius: 21px;
            width: 290px;

        }
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
</style>



<!-- 
        <div class="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8">
            <div>
                <img src="/src/presentation/resources/images/Beach/bizerteBeach.jpg" alt="" loading="lazy">
            </div>

            <div class="col-start-3">
                <img src="/src/presentation/resources/images/Beach/bizerteBeach.jpg" alt="" loading="lazy">
            </div>

            <div>
                <img src="/src/presentation/resources/images/Beach/bizerteBeach.jpg" alt="" loading="lazy">
            </div>

            <div>
                <img src="/src/presentation/resources/images/Beach/bizerteBeach.jpg" alt="" loading="lazy">
            </div>

            <div class="row-start-1 col-start-2 col-span-2">
                <img src="/src/presentation/resources/images/Beach/bizerteBeach.jpg" alt="" loading="lazy">
            </div>
            
        </div> -->

<!-- 
    // SOLUTION 0 
    // const selectedFile = event.target.files[0];
    // const formData = new FormData();
    // formData.append('postImage', selectedFile);
    // formData.append('content', content.value);
    // // formData.append('rate', rate.value);
    // formData.append('post_type', postType.value);

    // console.log(formData.getAll('postImage'));
    // await createPostStore.CreatePost(formData) -->