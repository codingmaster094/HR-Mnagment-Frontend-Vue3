<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useUser from '@/composables/userApi.js';
import Swal from 'sweetalert2';
import { DesktopComputerIcon, UserIcon, CalendarIcon, ArchiveIcon, DatabaseIcon, ClipboardCheckIcon, LogoutIcon } from "@heroicons/vue/solid";


const { UserData, ErrorMessage, statusCode, logoutUser } = useUser();

const menuItems = ref([
    { label: 'My Desk', active: false, icon: DesktopComputerIcon, link: "Mydesk" },
    { label: 'Profile', active: false, icon: UserIcon, link: "UserProfile" },
    { label: 'Attendance', active: false, icon: CalendarIcon, link: "Home" },
    { label: 'Leave', active: false, icon: ClipboardCheckIcon, link: "Leave" },
    { label: 'Holiday', active: false, icon: ArchiveIcon, link: "Holiday" },
    { label: 'Payroll', active: false, icon: DatabaseIcon, link: "Payroll" },
]);

const logout = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ms-2",
            cancelButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure Logout?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            await logoutUser();
        }
    });
};

const setActive = (index) => {
    menuItems.value.forEach((item, i) => {
        item.active = i === index;
    });
};
</script>

<template>
    <div>
        <div class="text-gray-100 text-xl">
            <div class="p-2.5 mt-1 flex items-center">
                <h1 class="font-bold text-gray-200 text-[15px] ml-3">
                    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../../assets/logo.svg" class="h-8" alt="Flowbite Logo" width="150" height="90" />
                    </a>
                </h1>
            </div>
            <div class="my-2 bg-gray-200 h-[1px]"></div>
        </div>
        <div v-for="(item, index) in menuItems" :key="index">
            <RouterLink :to="{ name: item.link }">
                <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer"
                    :class="{ 'hover:bg-violet-600 hover:text-white': !item.active, 'text-black': !item.active, 'active': item.active }"
                    @click="setActive(index)">
                    <component :is="item.icon" class="h-6 w-6 ml-2" /> <!-- Use dynamic component rendering -->
                    <span class="text-[15px] ml-2 text-black-200 font-bold">{{ item.label }}</span>
                </div>
            </RouterLink>
        </div>


        <!-- Logout menu item -->
        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-violet-600 hover:text-white text-black"
            @click="logout">
            <LogoutIcon class="h-6 w-6 ml-2" />
            <span class="text-[15px] ml-2 text-black-200 font-bold">Logout</span>
        </div>
    </div>
</template>

<style>
.active {
    background-color: #6a39ff;
    color: aliceblue;
}
</style>