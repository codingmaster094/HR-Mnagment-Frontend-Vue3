<script setup>
import { RouterLink, useRouter } from "vue-router"
import useUser from "@/composables/userApi.js";
import { ref, onMounted, reactive } from "vue";
import LeaveCalender from "@/components/Leave/LeaveCalender.vue"
import Timer from "../Timer.vue";
const { userLoginData, profileADD, UserGet, Attendance_present_create } = useUser();

let UserName = null;
onMounted(async () => {
    await UserGet()
})
if (userLoginData) {
    try {
        UserName = userLoginData;
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
}

</script>
<template lang="">
   <nav class="border-gray-200 main flex ">
    <Timer />
    <div class="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto">
        <button type="button" @click="toggleEditMode" class="mr-2 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 2.5H1.5C0.948 2.5 0.5 2.948 0.5 3.5V14.5C0.5 15.052 0.948 15.5 1.5 15.5H14.5C15.052 15.5 15.5 15.052 15.5 14.5V3.5C15.5 2.948 15.052 2.5 14.5 2.5Z" stroke="#0D0D0D" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 0.5V2.5" stroke="#0D0D0D" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.5 0.5V2.5" stroke="#0D0D0D" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.55372 7.98994C7.79593 8.08617 8.2259 8.17288 8.97501 8.29415C9.55985 8.40164 10.0405 8.61464 10.374 8.94325C10.7056 9.26982 10.9 9.7185 10.9 10.3162C10.9 11.0677 10.6076 11.6785 10.0823 12.1064C9.55478 12.5361 8.78422 12.7879 7.82009 12.8C6.84989 12.7999 6.20614 12.6184 5.80685 12.3202C5.41297 12.026 5.24343 11.608 5.24343 11.0962V10.4898C5.73782 10.8242 6.45728 11.0987 7.46215 11.0987C7.92022 11.0987 8.24004 11.0441 8.4481 10.9312C8.55432 10.8736 8.63345 10.7996 8.68521 10.709C8.73678 10.6186 8.75737 10.5183 8.75737 10.4137C8.75737 10.3215 8.74646 10.2274 8.69253 10.141C8.63857 10.0546 8.55047 9.98975 8.4255 9.93514C8.18077 9.82819 7.74821 9.74149 6.99862 9.63229C6.35199 9.53637 5.87943 9.34052 5.56877 9.03802C5.26078 8.73812 5.1 8.32163 5.1 7.75685C5.1 6.91517 5.49376 6.27976 6.08926 5.85147C6.68755 5.42119 7.49069 5.19998 8.2988 5.19998C9.07559 5.19998 9.69294 5.36226 10.113 5.64876C10.529 5.93252 10.7566 6.34091 10.7566 6.85498V7.46902C10.2375 7.12285 9.50388 6.90123 8.56175 6.90123C8.09008 6.90123 7.76014 6.96236 7.54466 7.0739C7.43552 7.1304 7.35296 7.20129 7.29794 7.28618C7.24259 7.37155 7.21873 7.46555 7.21873 7.56185C7.21873 7.64403 7.23028 7.72987 7.28745 7.8087C7.34287 7.88513 7.43131 7.94131 7.55372 7.98994Z" fill="#1E8CED" stroke="white" stroke-width="0.2"/>
            </svg>
        </button>
        <div v-if="UserName.profile_image !== null">
            <img v-if="UserName" :src="UserName.profile_image" class="rounded-full w-12 h-12 mr-2"/> 
        </div>
        <div v-else>   
        <div class="flex items-center justify-center rounded-full border-2 w-12 h-12 mr-2">
            <label for="dropzone-file" class="flex flex-col items-center justify-center rounded-full w-12 h-12 cursor-pointer">
                <div class="flex flex-col items-center justify-center pt-5 pb-3">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                </div>
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
</style>