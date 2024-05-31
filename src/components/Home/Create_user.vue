<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import useUser from '@/composables/createUserApi.js'
import { onMounted, reactive } from 'vue';
const { UserData, ErrorMessage, statusCode, createUser} = useUser();

const usercreateFormData = reactive({
  name: "",
  email: "",
  password: "",
  role: 1,
  mobile_no: "",
  designation: "",
  Doj: "",
  Dob: "",
  profile_image: null,
  salary: "",
});


const handleAddUserForm = async () => {
  await createUser(usercreateFormData);
};
</script>

<template>
  <div>
    <div>
      <div class="flex h-screen">
        <!-- sidebar -->
        <div class="flex flex-col w-64 bg-stone-50">
          <Sidebar />
        </div>
        <!-- Main content -->
        <div class="flex flex-col flex-1 overflow-y-auto">
          <div class="flex items-center justify-end px-10 h-16 bg-white border-b border-gray-200">
            <Navbar />
          </div>
          <div class="">
            <form class="flex flex-wrap m-2" @submit.prevent="handleAddUserForm">
              <div class="m-2 w-1/4">
                <label for="name" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                <input type="text" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.name" required />
              </div>
              
              <div class="m-2 w-1/4">
                <label for="email" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User email</label>
                <input type="email" id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.email" required />
              </div>

              <div class="m-2 w-1/4">
                <label for="password" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User
                  password</label>
                <input type="text" id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.password" required />
              </div>

              <div class="m-2 w-1/4">
                <label for="name" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User Role</label>
                <select type="" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.role" required>
                  <option :value="1">User</option>
                  <option :value="0">Admin</option>
                </select> 
              </div>

              <div class="m-2 w-1/4">
                <label for="mobile_no" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User
                  Mobile no</label>
                <input type="tel" id="mobile_no"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.mobile_no" required />
              </div>
              <div class="m-2 w-1/4">
                <label for="designation" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User
                  Designation</label>
                <input type="text" id="designation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.designation" required />
              </div>
              <div class="m-2 w-1/4">
                <label for="Doj" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User Doj</label>
                <input type="date" id="Doj"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.Doj" required />
              </div>
              <div class="m-2 w-1/4">
                <label for="Dob" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User Dob</label>
                <input type="date" id="Dob"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.Dob" required />
              </div>
              <div class="m-2 w-1/4">
                <label for="salary" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">User Salary</label>
                <input type="text" id="salary"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model.trim="usercreateFormData.salary" required />
              </div>
              
              <div class="m-5 w-1/1">
                <button type="submit"
                  class="w-full text-white bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                  in</button>
              </div>
            </form>
            <div class=" flex m-5 w-1/1" v-if="ErrorMessage" v-for="passError in ErrorMessage.passwordError">
              <p>Password Error : </p>
              <div class="text-red-500">{{ passError }}</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
