<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import useUser from '@/composables/createUserApi.js'
import { onMounted, reactive } from 'vue';
import Swal from 'sweetalert2';
const { UserData, ErrorMessage, statusCode, GetUserLeaveStatus , UpdateUserLeave , deleteuserLeave
} = useUser();
onMounted(GetUserLeaveStatus);


const Approved_leave = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ms-2",
      cancelButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure Approved Leave?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Approved !",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      UpdateUserLeave(id , UserData.value)
    }
  });
};

const Rejected_leave = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ms-2",
      cancelButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure Rejected Leave?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Rejected !",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      deleteuserLeave(id)
      GetUserLeaveStatus()
    }
  });
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
                    <div class="pt-20 px-20 w-94">
                        <h1 class="text-lg mb-3">Leave Details</h1>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            User name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Leave type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            leave date
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            leave end date
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            leave Reason
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            leave status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        v-for="user in UserData">
                                        <th scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {{ user.user_id.name }}
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ user.Leave_type }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ user.leave_date }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ user.leave_end_date ? user.leave_end_date : user.leave_date }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ user.Reason}}
                                        </td>
                                        <td class="px-6 py-4">
                                            <button type="submit"
                                            @click="() => Approved_leave(user._id)"
                                                class="text-white me-2 inline-flex items-center bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                                                Approved
                                            </button>
                                            <button type="submit"
                                            @click="() => Rejected_leave(user._id)"
                                                class="text-white inline-flex items-center bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                                                Rejected
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<style></style>