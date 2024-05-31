<script setup>
import { ref, reactive, onMounted } from "vue";
import useUser from "@/composables/userApi.js";
import { useRouter } from "vue-router";
import base64 from 'base-64';
import useprotect from "../../composables/ProtectiveRoute.js";
import useRole from "@/composables/role.js";

const { Role , RoleAccess } = useRole();
const { UserData, ErrorMessage, statusCode, LoginUser } = useUser();
const { NonprotectiveFun } = useprotect();
const router = useRouter();
const userRole = ref(null);

onMounted(async() => {
  await RoleAccess();
  userRole.value = Role.value.role;
})

const inpData = reactive({
  email: localStorage.getItem('fmlejwt') ? base64.decode(localStorage.getItem('fmlejwt')) : '',
  password: localStorage.getItem('fmlpjwt') ? base64.decode(localStorage.getItem('fmlpjwt')) : '',
  remember: localStorage.getItem('fmlejwt') && localStorage.getItem('fmlpjwt') ? true : false,
});

const formData = reactive({
  email: inpData.email || '',
  password: inpData.password || '',
});

const handleLoginserForm = async () => {
  if (formData.email && formData.password) {
    await LoginUser(formData);

    if (ErrorMessage) {
      return; // handle error appropriately
    }

    // Only store in localStorage if remember checkbox is checked and both email and password are provided
    const rememberCheckbox = document.getElementById('remember');
    if (rememberCheckbox.checked) {
      localStorage.setItem('fmlejwt', base64.encode(formData.email));
      localStorage.setItem('fmlpjwt', base64.encode(formData.password));
    } else {
      localStorage.removeItem('fmlejwt');
      localStorage.removeItem('fmlpjwt');
    }
    if(userRole.role === 1){
      router.push("/Home"); // navigate to the home page on successful login
    }else{
      router.push("/createuser"); // navigate to the home page on successful login
    }
  } else {
    // Clear localStorage if email and password are not provided
    localStorage.removeItem('fmlejwt');
    localStorage.removeItem('fmlpjwt');
  }
};


onMounted(() => {
  NonprotectiveFun();
});
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          LOGIN
        </a>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="handleLoginserForm">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" v-model.trim="formData.email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com" required>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                  v-model="formData.password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required>
              </div>
              <div v-if="ErrorMessage" class="text-red-500">{{ ErrorMessage.passwordError }}</div>
              <div v-if="ErrorMessage" class="text-red-500">{{ ErrorMessage.passwordNotMatch }}</div>
  
              <div>
                <input type="checkbox" name="checkbox" id="remember" v-model="inpData.remember"> Remember Me
              </div>
  
              <button type="submit"
                class="w-full text-white bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  