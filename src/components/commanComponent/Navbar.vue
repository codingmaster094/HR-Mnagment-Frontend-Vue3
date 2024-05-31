<script setup>
import { RouterLink, useRouter } from "vue-router"
import useUser from "@/composables/userApi.js";
import { ref, onMounted, reactive } from "vue";
import { useStopwatchStore } from '../../stores/stopwatch.js';
import LeaveCalender from "@/components/Leave/LeaveCalender.vue"
import useRole from "@/composables/role.js";
const { userLoginData, profileADD, UserGet, Attendance_present_create } = useUser();
const stopwatchStore = useStopwatchStore();
const { Role , RoleAccess } = useRole();


const showModal = ref(false);
const userRole = ref(null);
const formData = reactive({
    profile_image: null,
});


let UserName = null;
onMounted(async () => {
    await UserGet()
    await RoleAccess();
    userRole.value = Role.value.role;  // Accessing the role property
})
if (userLoginData) {
    try {
        UserName = userLoginData;
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
}

const handleFileChange = async (event) => {
    formData.profile_image = event.target.files[0];
    profileADD(formData)
    await UserGet()
};

const toggleMode = (value) => {
    showModal.value = value
};
</script>

<template lang="">
    <nav class="border-gray-200 main flex reletive">
       <div class="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto ">
            <button type="button" @click="toggleMode(true)" class="mr-2 cursor-pointer flex items-center" v-if="userRole === 1">
                <div id="calender">
                    <p id="calender-date text-white">{{ new Date().getDate() }}</p>
                </div>
            </button>
            
                <div v-if="UserName.profile_image !== null">
                    <img v-if="UserName" :src="UserName.profile_image" class="rounded-full w-12 h-12 mr-2"/> 
                </div>
            
            <div v-else>   
                <div class="flex items-center justify-center rounded-full border-2 w-12 h-12 mr-2" v-if="userRole === 1">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center rounded-full w-12 h-12 cursor-pointer">
                        <div class="flex flex-col items-center justify-center pt-5 pb-3">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" @change="handleFileChange" />
                    </label>
                </div> 
            </div>
            <div class="flex gap-5 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div class="py-3" v-if="UserName">
                    <span class="block text-sm text-gray-900 dark:text-white">{{ UserName.name }}</span>
                    <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{ UserName.email }}</span>
                </div>
            </div>
        </div>
   </nav>
    <div v-if="showModal" class=" w-full fixed z-10 inset-0 overflow-y-auto overflow-x-hidden flex justify-center items-center bg-white bg-opacity-100">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <LeaveCalender/> 
            <button @click="toggleMode(false)" class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Close</button>
        </div>
    </div>
</template>
<style scoped>
.stopwatch {
    text-align: center;
    margin-top: 20px;
}

.display {
    font-size: 2em;
    margin-bottom: 20px;
}

.controls button {
    font-size: 1em;
    padding: 5px 10px;
    margin: 0 5px;
}

#calender {
    width: 30px;
    height: 30px;
    background-color: rgb(146, 72, 231);
    border: #fff;
    border-radius: 25%;
    box-shadow: 0 4px 4px 0 rgba(50, 50, 50, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

#calender>p {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 10px 0;
    margin: 0;
    color: #fff;
    text-align: center;
}

#calender-day {
    font-size: 16px;
}

#calender-month-year {
    font-size: 14px;
}

#calender-date {
    font-size: 64px;
    padding-top: 10px;
    padding-bottom: 0;
}
</style>