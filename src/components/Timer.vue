<template>
    <div class="flex flex-wrap items-center me-12">
        <div class="stopwatch me-5">
        <div class="display">{{ formatTime() }}</div>
    </div>
    <div class="controls">
      <button @click="startStopwatch" :disabled="isRunning" class="w-50 text-white me-3 bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Start
       </button>
       <button @click="stopStopwatch" :disabled="!isRunning" class="w-50 text-white me-3 bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Stop
       </button>
    </div>
</div>
  </template>

<script setup>
import { reactive, ref } from 'vue';
import useUser from "@/composables/userApi.js";

const { userLoginData, profileADD, UserGet, Attendance_present_create } = useUser();

const startTime = ref(null);
const elapsedTime = ref(0);
const isRunning = ref(false);
let interval = null;


const formdata = reactive({
    date: new Date(),
    attendace_status: "P"
})
const AttendanceIN = () => {
    Attendance_present_create(formdata)
};

const formatTime = () => {
    const hours = Math.floor(elapsedTime.value / 3600000);
    const minutes = Math.floor((elapsedTime.value % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime.value % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const startStopwatch = () => {
    startTime.value = Date.now() - elapsedTime.value;
    interval = setInterval(() => {
        elapsedTime.value = Date.now() - startTime.value;
    }, 1000);
    isRunning.value = true;
    AttendanceIN()
};

const stopStopwatch = () => {
    clearInterval(interval);
    isRunning.value = false;
};

const resetStopwatch = () => {
    elapsedTime.value = 0;
    isRunning.value = false;
};
</script>

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