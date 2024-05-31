<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import useUser from '@/composables/createUserApi.js'
import { onMounted, reactive } from 'vue';
const { UserData, ErrorMessage, statusCode, userLoginData, AllUserGet } = useUser();
onMounted(AllUserGet);
console.log('UserData', UserData)
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
                    <div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            email
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        v-for="user in UserData">
                                        <th scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {{ user.name }}
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ user.email }}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <RouterLink :to="{ name: 'PersonalDetails' }">
                                        <button type="button"
                                            class="text-white m-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add
                                            Data</button>
                                    </RouterLink>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>