<script setup>
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import useUser from '@/composables/createUserApi.js'
import { onMounted, reactive, ref } from 'vue';

const { UserData, UserAttendace, UserAttendace_id, ErrorMessage, statusCode,
    AllUserGet,
    GetUserAttendance,
    get_EmployeesTime_id,
    UpdateEmployeeTimeData
} = useUser();

onMounted(AllUserGet);
const yearOptions = ref([]);
const monthOptions = ref([
    { label: "Jan", value: 1 },
    { label: "Feb", value: 2 },
    { label: "Mar", value: 3 },
    { label: "Apr", value: 4 },
    { label: "May", value: 5 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 8 },
    { label: "Sep", value: 9 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 11 },
    { label: "Dec", value: 12 }
]);

const TodayDate = new Date();
const currentYear = TodayDate.getFullYear();
const currentMonth = TodayDate.getMonth() + 1;

const SearchingYD = reactive({
    selectedUserId: "",
    selectedYear: currentYear,
    selectedMonth: currentMonth
});

const showModal = ref(false);

const handleSelectUser = (e, name) => {
    if (name === 'user') {
        SearchingYD.selectedUserId = e.target.value;
    }
    if (name === 'year') {
        SearchingYD.selectedYear = parseInt(e.target.value, 10);
    }
    if (name === 'month') {
        SearchingYD.selectedMonth = parseInt(e.target.value, 10);
    }
    GetUserAttendance(SearchingYD)
};

const toggleEditMode = (id) => {
    get_EmployeesTime_id(id)
    console.log('UserAttendace_id', UserAttendace_id)
    showModal.value = !showModal.value;
    GetUserAttendance()
};

const updateEmployeeTime = (id) => {
    UpdateEmployeeTimeData(id, UserAttendace_id.value)
    showModal.value = false
};

// Helper function to get the current date without time
const getCurrentDate = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
};

const currentDate = getCurrentDate();

const populateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    for (let i = -1; i <= 1; i++) {
        const year = currentYear + i;
        yearOptions.value.push(year);
    }
};

onMounted(populateYearOptions);



</script>

<template>
    <div>
        <div class="flex h-screen">
            <div class="flex flex-col w-64 bg-stone-50">
                <Sidebar />
            </div>
            <div class="flex flex-col flex-1 overflow-y-auto">
                <div class="flex items-center justify-end px-10 h-16 bg-white border-b border-gray-200">
                    <Navbar />
                </div>
                <div class="pt-10 px-20 w-94">
                    <div class="flex items-center mb-5 justify-end me-12">
                        <div class="me-2 w-1/3 mb-6">
                            <label for="name" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                                User</label>
                            <select
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                @change="(e) => handleSelectUser(e, 'user')" required>
                                <option value="">Select User</option>
                                <option v-for="user in UserData" :key="user._id" :value="user._id">{{ user.name }}
                                </option>
                            </select>
                        </div>

                        <div class="inline-block w-60 me-2 leave-history-year-selector text-sm">
                            <select v-model="SearchingYD.selectedYear" @change="(e) => handleSelectUser(e, 'year')"
                                :disabled="SearchingYD.selectedUserId !== '' ? false : true"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}
                                </option>
                            </select>
                        </div>
                        <div class="inline-block w-60 leave-history-year-selector text-sm">
                            <select v-model="SearchingYD.selectedMonth" @change="(e) => handleSelectUser(e, 'month')"
                                :disabled="SearchingYD.selectedUserId !== '' ? false : true"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="(month, index) in monthOptions" :key="month" :value="month.value">{{month.label }}</option>
                            </select>
                        </div>

                    </div>
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        User name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Working Time
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Update Attendance
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    v-for="user in UserAttendace" :key="user._id">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ user.user_id.name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ new Date(user.date).toISOString().split('T')[0] }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ user.attendace_Hours }} : {{ user.attendace_Minutes }} : {{
                                            user.attendace_Seconds }}
                                    </td>
                                    <td class="px-6 py-4"
                                        v-if="new Date(user.date).toISOString().split('T')[0] !== currentDate">
                                        <button type="submit" @click="toggleEditMode(user._id)"
                                            class="text-white me-2 inline-flex items-center bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Update
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

    <div v-if="showModal" v-for="userTIme in UserAttendace_id" :key="userTIme"
        class="fixed z-10 inset-0 overflow-y-auto overflow-x-hidden flex justify-center items-center bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Update Employee Time
                    </h3>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5" @submit.prevent="updateEmployeeTime(userTIme._id)">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                date</label>
                            <input type="date" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Date" v-model="userTIme.date.split('T')[0]" disabled>
                        </div>
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hours</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Hours" v-model="userTIme.attendace_Hours" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minutes</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Minutes" v-model="userTIme.attendace_Minutes" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Secound</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Secound" v-model="userTIme.attendace_Seconds" required="">
                        </div>
                    </div>
                    <button type="submit"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                        Save
                    </button>
                    <button type="button"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
                        @click="showModal = false">
                        Close
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped></style>