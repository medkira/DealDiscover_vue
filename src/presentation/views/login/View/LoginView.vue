<!-- <script setup lang="ts">
import { ref } from 'vue';
// import { LoginStore } from '../Store/LoginStore';

const username = ref('');
const password = ref('');
const showPassword = ref(false);

// const togglePasswordVisibility = () => {
//     showPassword.value = !showPassword.value;
// };


// const authStore = LoginStore();


const submitLogin = async () => {
    await authStore.login({ email: username.value, password: password.value });
};
</script>
<template>
    <div class="login-container dark">
        <div class="login-form">
            <h1>Login</h1>
            <div v-if="authStore.loginStatusMessage" class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50">
                {{ authStore.loginStatusMessage }}
            </div>
            <form @submit.prevent="submitLogin">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="username" required />
                </div>

                <div class="form-group">

                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required />
                    <!-- <span class="toggle-password" @click="togglePasswordVisibility">
                        <i class="fas fa-eye-slash"></i>
                        <i class="fas fa-eye"></i>
                    </span> -->
</div>

<button type="submit">Login</button>
</form>
</div>
</div>
</template>

<style lang="scss" scoped>
.login-container.dark {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100vh;
    // background-color: #222;
    margin: 30px;
    padding: 20px;
    /* Dark background */

}

.login-form {
    background-color: #333;
    /* Darker gray form background */
    border-radius: 5px;
    padding: 30px;
    color: #fff;
    /* White text for dark theme */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    /* Darker shadow */
    width: 350px;
    transform: scale(1.2);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input,
button {
    width: 100%;
    padding: 10px;
    border: 1px solid #444;
    /* Darker border */
    border-radius: 3px;
    font-size: 16px;
    color: #131313;
    /* White text for dark theme */
}

button {
    background-color: #4CAF50;
    /* Green */
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

button:hover {
    background-color: #45A049;
    /* Green darkened */
}

.toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #ad1d1d;
    /* Light gray icon color for dark theme */
}

.toggle-password i {
    display: none;
}

.toggle-password.show-password .fas.fa-eye-slash {
    display: none;
}

.toggle-password.show-password .fas.fa-eye {
    display: block;
}

input[type="password"]:focus+.toggle-password {
    color: #4CAF50;
    /* Green */
}
</style> -->
