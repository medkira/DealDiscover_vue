<script setup lang="ts">
import { ref } from "vue";
import Sidebar from 'primevue/sidebar';
import Button from "primevue/button";

const visible = ref(true);
</script>


<template>
    <div class="card flex justify-content-center">
        <Sidebar :dismissable=true v-model:visible="visible" header="Board Admin">
            <nav>

                <div>
                    <RouterLink to="/admin/ImageContributions">Images</RouterLink>
                    <RouterLink to="/admin/adminPlacesManagement">Places</RouterLink>
                    <RouterLink to="/admin/usersManagement">Users</RouterLink>

                    <!-- <RouterLink to="/foods">Foods</RouterLink>
                    <RouterLink to="/posts">Posts</RouterLink> -->

                </div>

            </nav>
        </Sidebar>
        <Button icon="pi pi-arrow-right" @click="visible = true"
            style="transform: scale(1.5); padding: 2rem;    margin-left: 0;" />

        <!-- <RouterView /> -->
        <slot />

    </div>
</template>


<style scoped lang="scss">
nav {
    div {
        display: flex;
        flex-direction: column;
        gap: 20px;
        font-size: 1.5rem;
        padding-top: 20px;

        a {
            padding: 5px;
            border-radius: 0.3rem;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;

        }
    }
}
</style>
