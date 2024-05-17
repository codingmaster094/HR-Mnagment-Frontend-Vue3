<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import useUserLeave from '@/composables/Leave.js';
import { computed, onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import LeaveCalender from "@/components/Leave/LeaveCalender.vue"

const showModal = ref(false);
const showModal1 = ref(false);
const LeaveTypeModal = ref(false);
const selectedLeaveType = ref('');
const selectedYear = ref('');
const yearOptions = ref([]);
const dateRange = ref(null)

const {
  get_UserLeave,
  UserLeaveData,
  LeaveBalance,
  ErrorLeaveMessage,
  statusLeaveCode,
  createUserLeave,
  FilterYearfun,
  LeaveType_getData
} = useUserLeave()

onMounted(async () => await FilterYearfun())
onMounted(async () => {
  await get_UserLeave();
});


// Computed property to filter paid leave data
const paidLeave = computed(() => {
  return UserLeaveData.value.filter(leave => leave.Leave_type === "Paid Leave");
});

// Computed property to filter unpaid leave data
const unpaidLeave = computed(() => {
  return UserLeaveData.value.filter(leave => leave.Leave_type === "Unpaid Leave");
});

// Computed property to calculate total paid leave for each month
const paidLeaveMonths = computed(() => {
  const months = Array(12).fill(""); // Initialize months array with 0
  paidLeave.value.forEach(leave => {
    if (leave.Leave_is_for === '2st half' || leave.Leave_is_for === '1st half') {
      const startDate = new Date(leave.leave_date);
      const endDate = leave.leave_end_date ? new Date(leave.leave_end_date) : startDate;
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const startMonth = startDate.getMonth();
      months[startMonth] += 0.5 * duration;
    } else {
      const startDate = new Date(leave.leave_date);
      const endDate = leave.leave_end_date ? new Date(leave.leave_end_date) : startDate;
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      for (let i = startDate.getMonth(); i <= endDate.getMonth(); i++) {
        months[i] += duration;
      }
    }
  });
  return months;
});


// Computed property to calculate total unpaid leave for each month
const unpaidLeaveMonths = computed(() => {
  const months = Array(12).fill("");
  unpaidLeave.value.forEach(leave => {
    if (leave.Leave_is_for === '2st half' || leave.Leave_is_for === '1st half') {
      const startDate = new Date(leave.leave_date);
      const endDate = leave.leave_end_date ? new Date(leave.leave_end_date) : startDate;
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const startMonth = startDate.getMonth();
      months[startMonth] += 0.5 * duration;
    } else {
      const startDate = new Date(leave.leave_date);
      const endDate = leave.leave_end_date ? new Date(leave.leave_end_date) : startDate;
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      for (let i = startDate.getMonth(); i <= endDate.getMonth(); i++) {
        months[i] += duration;
      }
    }
  });
  return months;
});

const populateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  for (let i = -1; i <= 1; i++) { // Adjust loop to include previous, current, and next year
    const year = currentYear + i;
    yearOptions.value.push(year);
    FilterYearfun(currentYear)
  }
  // Set default selected year
  selectedYear.value = currentYear.toString();
};

const FilterYear = async (e) => {
  FilterYearfun(e.target.value)
}

onMounted(populateYearOptions);

const ApplyLeave = (leaveType) => {
  if (leaveType == "Hourly Leave") {
    showModal1.value = true
  } else {
    showModal.value = true;
  }
  selectedLeaveType.value = leaveType; // Set the selected leave type
  formdata.Leave_type = leaveType;
};

const formdata = reactive({
  Leave_type: "",
  leave_for: "",
  leave_date: "",
  leave_end_date: "",
  Leave_is_for: "",
  From_Time: "",
  To_Time: "",
  recipients: "",
  Reason: "",
  Upload_file: ""
});

const handleFileChange = async (event) => {
  formdata.Upload_file = event.target.files[0];
};

const Submit_leave = () => {
  createUserLeave(formdata)
  showModal1.value = false;
  showModal.value = false;
};

const LeaveTypeData = (year, leaveType) => {
  if (leaveType == 'Paid Leave') {
    LeaveType_getData(year, leaveType)
    LeaveTypeModal.value = true
  }
  if (leaveType == 'Unpaid Leave') {
    LeaveType_getData(year, leaveType)
    LeaveTypeModal.value = true
  }
};

function getFirstAndLastDateOfMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-based, so we add 1

    // Get the first day of the month
    const firstDate = new Date(year, month - 1, 1);

    // Get the last day of the next month, then subtract one day to get the last day of the current month
    const lastDate = new Date(year, month, 0);

    // Format the dates as DD-MM-YYYY
    const formattedFirstDate = formatDate(firstDate);
    const formattedLastDate = formatDate(lastDate);

    return `${formattedFirstDate} - ${formattedLastDate}`;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
 dateRange.value = getFirstAndLastDateOfMonth();
console.log('LeaveBalance', LeaveBalance._rawValue)
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
          <div class="mx-60">
            <div class="text-xl flex justify-between">
              <div>
                <h1>My leave balance</h1>
              </div>
            </div>

            <div class="flex gap-5 mt-5 justify-between">
              <div class="flex gap-5 mt-5">
                <div class="w-300 min-h-full flex items-center justify-center">
                  <div>
                    <div class="bg-sky-100  py-3 px-4 rounded-t-lg">
                      <p class="">Hourly Leave</p>
                      <p class="">24 Hrs 0 Mins</p>
                    </div>
                    <div class="bg-white pt-2 px-5 border-2 rounded-b-lg">
                      <p class="flex gap-2 mb-3"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                          View Logs
                      </p>
                      <p class="flex gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                          Ledger
                      </p>
                      <p class="flex gap-2 pb-3">
                        <button type="button"
                          class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          @click="ApplyLeave('Hourly Leave')">
                          Apply Now
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-300 min-h-full   flex items-center justify-center">
                  <div>
                    <div class="bg-sky-100  py-3 px-4 rounded-t-lg">
                      <p class="">Paid Leave</p>
                      <p class="">3.00 Days</p>
                    </div>
                    <div class="bg-white pt-2 px-5 border-2 rounded-b-lg">
                      <p class="flex gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                        <button @click="LeaveTypeData(new Date().getFullYear(), 'Paid Leave')">
                          View Logs
                        </button>
                      </p>
                      <p class="flex gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                        <a href="#">
                          Ledger
                        </a>
                      </p>
                      <p class="flex gap-2 pb-3">
                        <button type="button"
                          class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          @click="ApplyLeave('Paid Leave')">
                          Apply Now
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-300 min-h-full flex items-center justify-center">
                  <div>
                    <div class="bg-sky-100  py-3 px-4 rounded-t-lg">
                      <p class="">Unpaid Leave</p>
                      <p class="">1.00 Lop days used</p>
                    </div>
                    <div class="bg-white pt-2 px-5 border-2 rounded-b-lg">
                      <p class="flex gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-5 h-5 ">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                        <button @click="LeaveTypeData(new Date().getFullYear(), 'Unpaid Leave')">
                          View Logs
                        </button>
                      </p>
                      <p class="flex gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                        <a href="#">
                          Ledger
                        </a>
                      </p>
                      <p class="flex gap-2 pb-3">
                        <button type="button"
                          class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          @click="ApplyLeave('Unpaid Leave')">
                          Apply Now
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <LeaveCalender />
              </div>
            </div>

            <div class="pb-20 pt-20 px-20 w-94">
              <span class="leaveBalance-title">Leave History</span>
              <div class="inline-block w-60 ml-20 leave-history-year-selector text-sm">
                <select v-model="selectedYear"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  @change="FilterYear">
                  <option v-for="year in yearOptions" :key="year" :value="year">{{ `Jan-${year} to Dec-${year}` }}
                  </option>
                </select>
              </div>
            </div>

            <div class="p-4 bg-sky-100 shadow-md rounded">
              <div class="grid grid-cols-12">
                <div class="col-span-12 sm:col-span-2 md:col-span-2">Leave Name</div>
                <div class="col-span-12 sm:col-span-10 md:col-span-10">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Jan</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Feb</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Mar</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Apr</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">May</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Jun</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Jul</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Aug</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Sep</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Oct</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Nov</div>
                    <div class="col-span-12 sm:col-span-1 md:col-span-1 text-center ">Dec</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 bg-white shadow-md border-2 rounded">
              <div class="grid grid-cols-12">
                <div class="col-span-12 sm:col-span-2 md:col-span-2">
                  <p class="mt-4">Paid Leave</p>
                </div>
                <div class="col-span-12 sm:col-span-10 md:col-span-10">
                  <div class="grid grid-cols-12">
                    <!-- Display Paid Leave for each month -->
                    <div v-for="(month, index) in paidLeaveMonths" :key="index"
                      class="col-span-12 sm:col-span-1 md:col-span-1">
                      <p class="text-center mt-15"><strong class="text-green-700">{{ month }}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Display Unpaid Leave -->
            <div class="p-4 bg-white shadow-md rounded">
              <div class="grid grid-cols-12">
                <div class="col-span-12 sm:col-span-2 md:col-span-2">
                  <p class="mt-4">Unpaid Leave</p>
                </div>
                <div class="col-span-12 sm:col-span-10 md:col-span-10">
                  <div class="grid grid-cols-12">
                    <!-- Display Unpaid Leave for each month -->
                    <div v-for="(month, index) in unpaidLeaveMonths" :key="index"
                      class="col-span-12 sm:col-span-1 md:col-span-1">
                      <p class="text-center mt-15"><strong class="text-red-700">{{ month }}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal"
    class="fixed z-10 inset-0 overflow-y-auto overflow-x-hidden flex justify-end items-center bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Apply Leave
          </h3>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5" @submit.prevent="Submit_leave">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave type</label>
              <input v-model="formdata.Leave_type" id="leaveType"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="" disabled />
            </div>
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apply leave
                for</label>
              <div class="flex gap-3 items-baseline">
                <div class="flex items-center mb-4">
                  <input id="LeaveFor-radio-1" type="radio" value="single day" name="LeaveFor-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    v-model="formdata.leave_for">
                  <label for="LeaveFor-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Single day
                  </label>
                </div>
                <div class="flex items-center">
                  <input id="LeaveFor-radio-2" type="radio" value="multiple days" name="LeaveFor-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    v-model="formdata.leave_for">
                  <label for="LeaveFor-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Multiple days
                  </label>
                </div>
              </div>
            </div>


            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your leave
                date</label>
              <input type="date" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name" required="" v-model="formdata.leave_date">
            </div>

            <div class="col-span-2" v-if="formdata.leave_for == 'multiple days'">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave end
                date</label>
              <input type="date" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name" required="" v-model="formdata.leave_end_date">
            </div>

            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave is
                for</label>
              <div class="flex gap-3 items-baseline">
                <div class="flex items-center mb-4">
                  <input id="LeaveIs-radio-1" type="radio" value="Full day" name="LeaveIs-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    v-model="formdata.Leave_is_for">
                  <label for="LeaveIs-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Full day</label>
                </div>
                <div class="flex items-center">
                  <input id="LeaveIs-radio-2" type="radio" value="1st half" name="LeaveIs-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    v-model="formdata.Leave_is_for">
                  <label for="LeaveIs-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    1st half</label>
                </div>
                <div class="flex items-center">
                  <input id="LeaveIs-radio-3" type="radio" value="2st half" name="LeaveIs-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    v-model="formdata.Leave_is_for">
                  <label for="LeaveIs-radio-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    2st half</label>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional
                recipients</label>
              <input type="text" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name" required="" v-model="formdata.recipients">
            </div>
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reason for
                request</label>
              <textarea type="text" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name" required="" v-model="formdata.Reason"></textarea>
            </div>
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
              <input type="file" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name" @change="handleFileChange">
            </div>
          </div>
          <button type="submit"
            class="text-white inline-flex items-center bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
            Apply Leave
          </button>
          <button type="button"
            class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
            @click="showModal = false">
            Close
          </button>
        </form>
      </div>
    </div>
  </div>

  <div v-if="selectedLeaveType == 'Hourly_Leave'">
    <div v-if="showModal1"
      class="fixed z-10 inset-0 overflow-y-auto overflow-x-hidden flex justify-end items-center bg-black bg-opacity-50">
      <div class="relative p-4 w-full max-w-xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Apply Leave
            </h3>
          </div>
          <!-- Modal body -->
          <form class="p-4 md:p-5" @submit.prevent="Submit_leave">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave
                  type</label>
                <input v-model="formdata.Leave_type" id="leaveType"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="" disabled />
              </div>

              <div class="col-span-2">
                <input type="date" name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name" required="" v-model="formdata.leave_date">
              </div>

              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Time</label>
                <input type="time" name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name" required="" v-model="formdata.From_Time">
              </div>

              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Time</label>
                <input type="time" name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name" required="" v-model="formdata.To_Time">
              </div>

              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional
                  recipients</label>
                <input type="text" name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name" required="" v-model="formdata.recipients">
              </div>
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reason for
                  request</label>
                <textarea type="text" name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name" required="" v-model="formdata.Reason"></textarea>
              </div>
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload
                  file</label>
                <input type="file" name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name" @change="handleFileChange">
              </div>
            </div>
            <button type="submit"
              class="text-white inline-flex items-center bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
              Apply Leave
            </button>
            <button type="button"
              class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
              @click="showModal1 = false">
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>


  <div v-if="LeaveTypeModal"
    class="fixed z-10 inset-0 overflow-y-auto overflow-x-hidden flex justify-end bg-black bg-opacity-50">
    <div class="relative w-full max-w-xl h-full">
      <!-- Modal content --> 
      <div class="relativeData bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 v-for=" (Leavedata , index) in LeaveBalance">
            <span v-if="index === 0">
              {{ Leavedata.Leave_type == 'Paid Leave' ? "Paid Leave" : Leavedata.Leave_type == 'Unpaid Leave' ? "Unpaid Leave" : ""}}
            </span>
          </h3>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{dateRange}}
          </h3>
        </div>
          <div v-if="LeaveBalance.length !=0" v-for="(Leaverecord , index) in LeaveBalance" :key="Leaverecord">
            <h3  class=" flex text-md font-semibold text-gray-900 dark:text-white p-2">
              <img :src="Leaverecord.user_id.profile_image" alt="profile_image" class="rounded-full w-12 h-12 mr-2"> 
              <div>
                {{ Leaverecord.user_id.name }} has applied for Leave for {{`${Leaverecord.leave_date} - ${Leaverecord.leave_end_date !="" ? Leaverecord.leave_end_date : Leaverecord.leave_date} `}} 
                <div> Reason :   {{Leaverecord.Reason}} </div>
                <div> Status :   {{Leaverecord.Leave_status == true ? "Approved" : "Rejected"}} </div>
              </div>
            </h3>
          </div>
          <h3 v-else class="p-4">Data Not Found</h3>
          <button type="button"
            class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
            @click="LeaveTypeModal = false">
            Close
          </button>
      </div>
    </div>
  </div>
</template>

<style>
@import "qalendar/dist/style.css";

.is-trash-icon {
  display: none;
}

.is-edit-icon {
  display: none;
}

.agenda__content-events-list {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.dp__icon {
  display: none
}
.relativeData{
  height: 100vh !important;
}
</style>
