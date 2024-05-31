<script setup>
import Sidebar from "../commanComponent/Sidebar.vue";
import Navbar from "../commanComponent/Navbar.vue";
import useAttendance from "@/composables/Attendance.js";
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Cookies from "js-cookie";
import Datepicker from 'vue3-datepicker'

const { attendanceGetData, attendanceLeaveGetData, EmployeeTimeGetData, ErrorattendanceMessage, getAllAttendance_report, EmployeeGetData } = useAttendance();
const attendanceData = ref([]);
const EmployeeData = ref([]);
const yearOptions = ref([]);
const monthOptions = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);


const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const SearchingYD = reactive({
  selectedYear: currentYear,
  selectedMonth: currentMonth
});

const populateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  for (let i = -1; i <= 1; i++) {
    const year = currentYear + i;
    yearOptions.value.push(year);
  }
};

onMounted(populateYearOptions);

const fetchAttendanceData = async () => {
  await getAllAttendance_report(SearchingYD);
  await EmployeeGetData();
  attendanceData.value = attendanceGetData.value.map(record => ({
    ...record,
    date: new Date(record.date).toISOString().split('T')[0]
  }));
  EmployeeData.value = EmployeeTimeGetData.value.map(record => ({
    ...record,
    date: new Date(record.date).toISOString().split('T')[0]
  }));
};

onMounted(fetchAttendanceData);

watch(() => [SearchingYD.selectedYear, SearchingYD.selectedMonth], fetchAttendanceData);

const daysInMonth = computed(() => {
  const days = [];
  const year = SearchingYD.selectedYear;
  const month = SearchingYD.selectedMonth;
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    // Ensure the date is correctly set to midnight UTC to avoid timezone issues
    const date = new Date(Date.UTC(year, month, i));
    days.push(date);
  }
  return days;
});

const getStatusForDate = (date) => {
  const dateStr = date.toISOString().split('T')[0];
  const attendanceRecord = attendanceData.value.find(record => record.date === dateStr);
  const employeeTimeRecord = EmployeeData.value.find(record => record.date === dateStr);

  // Check if there is any leave record for the given date
  const attendanceLeaveRecord = attendanceLeaveGetData.value.find(record => {
    const leaveStart = new Date(record.leave_date);
    const leaveEnd = record.leave_end_date ? new Date(record.leave_end_date) : leaveStart;
    return date >= leaveStart && date <= leaveEnd;
  });

  let status = 'A';
  let timeDetails = { hours: '0', minutes: '0', seconds: '0' };

  if (attendanceRecord) {
    status = attendanceRecord.attendace_status;
    if (employeeTimeRecord) {
      timeDetails = {
        hours: employeeTimeRecord.attendace_Hours,
        minutes: employeeTimeRecord.attendace_Minutes,
        seconds: employeeTimeRecord.attendace_Seconds,
      };
    }
  } else if (attendanceLeaveRecord) {
    if (attendanceLeaveRecord.Leave_type === 'Paid Leave') {
      status = 'PL';
    } else if (attendanceLeaveRecord.Leave_type === 'Unpaid Leave') {
      status = 'UL';
    }
  } else {
    const dayOfWeek = date.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      status = 'H';
    } else if (date > currentDate) {
      status = '-';
    }
  }

  return { status, timeDetails };
};

const totalPresent = computed(() => attendanceData.value.filter(record => record.attendace_status === 'P').length);
const totalAbsent = computed(() => {
  let absentCount = 0;
  for (const date of daysInMonth.value) {
    const { status } = getStatusForDate(date);
    if (status === 'A') {
      absentCount++;
    }
  }
  return absentCount;
});
const totalPL = computed(() => {
  let plCount = 0;
  for (const date of daysInMonth.value) {
    const { status } = getStatusForDate(date);
    if (status === 'PL') {
      plCount++;
    }
  }
  return plCount;
});
const totalUL = computed(() => {
  let ulCount = 0;
  for (const date of daysInMonth.value) {
    const { status } = getStatusForDate(date);
    if (status === 'UL') {
      ulCount++;
    }
  }
  return ulCount;
});
const totalDays = computed(() => daysInMonth.value.length);

const YearMonthHandler = (e, name) => {
  if (name === 'year') {
    SearchingYD.selectedYear = parseInt(e.target.value, 10);
  }
  if (name === 'month') {
    SearchingYD.selectedMonth = parseInt(e.target.value, 10);
  }
  getAllAttendance_report(SearchingYD)
};
</script>


<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="flex flex-col w-64 bg-stone-50">
      <Sidebar />
    </div>
    <!-- Main content -->
    <div class="flex flex-col flex-1 overflow-y-auto">
      <div class="flex items-center justify-end px-10 h-16 bg-white border-b border-gray-200">
        <Navbar />
      </div>
      <div class="m-5">
        <div class="flex items-center mb-5 justify-end me-12">
          <div class="inline-block w-60 me-1 leave-history-year-selector text-sm">
            <select v-model="SearchingYD.selectedYear" @change="(e) => YearMonthHandler(e, 'year')"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}
              </option>
            </select>
          </div>
          <div class="inline-block w-60 leave-history-year-selector text-sm">
            <select v-model="SearchingYD.selectedMonth" @change="(e) => YearMonthHandler(e, 'month')"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="(month, index) in monthOptions" :key="month" :value="index">{{ month }}</option>
            </select>
          </div>
        </div>
        <div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <!-- Render first row with dates -->
                <template v-for="date in daysInMonth" :key="date">
                  <th scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{
                      date.getDate() }}
                  </th>
                </template>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-2 whitespace-nowrap">Status</td>
                <!-- Render second row with attendance status -->
                <template v-for="date in daysInMonth" :key="date">
                  <td class="relative px-4 py-2 whitespace-nowrap" :class="{
                    'border-2 text-white bg-green-700 font-semibold': getStatusForDate(date).status === 'P',
                    'border-2 text-white bg-red-700 font-semibold': getStatusForDate(date).status === 'A',
                    'border-2 text-white bg-purple-700 font-semibold': getStatusForDate(date).status === 'H',
                    'border-2 text-white bg-yellow-700 font-semibold': getStatusForDate(date).status === 'PL',
                    'border-2 text-white bg-red-400 font-semibold': getStatusForDate(date).status === 'UL'
                  }">
                    {{ getStatusForDate(date).status }}
                    <div v-if="getStatusForDate(date).status === 'P'"
                      class="hidden absolute top-full left-0 mt-1 bg-red-700 shadow-lg rounded-md text-xs z-10 px-2 py-1 time-details">
                      <div>{{ getStatusForDate(date).timeDetails.hours }} Hr</div>
                      <div>{{ getStatusForDate(date).timeDetails.minutes }} Min</div>
                      <div>{{ getStatusForDate(date).timeDetails.seconds }} Sec</div>
                    </div>
                  </td>
                </template>
              </tr>
              <tr>
                <td class="px-4 py-4 whitespace-nowrap">Total Present</td>
                <td class="px-4 py-4 whitespace-nowrap text-green-700 font-semibold">{{ totalPresent }}</td>
              </tr>
              <tr>
                <td class="px-4 py-4 whitespace-nowrap">Total Absent</td>
                <td class="px-4 py-4 whitespace-nowrap text-red-700 font-semibold">{{ totalAbsent }}</td>
              </tr>
              <tr>
                <td class="px-4 py-4 whitespace-nowrap">Total Paid Leave</td>
                <td class="px-4 py-4 whitespace-nowrap text-yellow-700 font-semibold">{{ totalPL }}</td>
              </tr>
              <tr>
                <td class="px-4 py-4 whitespace-nowrap">Total Unpaid Leave</td>
                <td class="px-4 py-4 whitespace-nowrap text-red-400 font-semibold">{{ totalUL }}</td>
              </tr>
              <tr>
                <td class="px-4 py-4 whitespace-nowrap">Total Days</td>
                <td class="px-4 py-4 whitespace-nowrap text-yellow-600 font-semibold">{{ totalDays }}</td>
              </tr>
            </tbody>
          </table>
          <div class="salary_slip">
            <button type="button"
              class="w-50 text-white mt-5 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              disabled>
              Generate Salary Slip
            </button>
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
.time-details {
  display: none;
}

.relative:hover .time-details {
  display: block;
}
</style>