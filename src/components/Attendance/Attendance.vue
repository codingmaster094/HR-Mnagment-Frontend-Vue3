<script setup>
import Sidebar from "../commanComponent/Sidebar.vue";
import Navbar from "../commanComponent/Navbar.vue";
import useAttendance from "@/composables/Attendance.js";
import { computed, onMounted, ref } from 'vue';
import Cookies from "js-cookie";

const { attendanceGetData, ErrorattendanceMessage, getAllAttendance_report } = useAttendance();
const attendanceData = ref([]);

onMounted(async () => {
  await getAllAttendance_report();
  attendanceData.value = attendanceGetData.value.map(record => ({
    ...record,
    date: new Date(record.date).toISOString().split('T')[0]
  }));
});

const daysInMonth = computed(() => {
  const days = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInCurrentMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push(new Date(Date.UTC(year, month, i)));
  }
  return days;
});

const getStatusForDate = (date) => {
  const currentDate = new Date();
  const dateStr = date.toISOString().split('T')[0];
  const attendanceRecord = attendanceData.value.find(record => record.date === dateStr);

  if (attendanceRecord) {
    return attendanceRecord.attendace_status;
  }

  // Check if the day is after the current date and not a holiday
  if (date > currentDate && (date.getUTCDay() !== 0 && date.getUTCDay() !== 6)) {
    return '-';
  }

  // Check if the day is a weekend (Saturday or Sunday)
  const dayOfWeek = date.getUTCDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return 'H';
  }

  return 'A';
};

const totalPresent = computed(() => attendanceData.value.filter(record => record.attendace_status === 'P').length);
const totalAbsent = computed(() => {
  let absentCount = 0;
  for (const date of daysInMonth.value) {
    const status = getStatusForDate(date);
    if (status === 'A') {
      absentCount++;
    }
  }
  return absentCount;
});
const totalDays = computed(() => daysInMonth.value.length);
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
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ date.getDate() }}
                  </th>
                </template>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-2 whitespace-nowrap">Status</td>
                <!-- Render second row with attendance status -->
                <template v-for="date in daysInMonth" :key="date">
                  <td class="px-4 py-2 whitespace-nowrap" :class="{
                      'border-2 text-white bg-green-700 font-semibold': getStatusForDate(date) === 'P',
                      'border-2 text-white bg-red-700 font-semibold': getStatusForDate(date) === 'A',
                      'border-2 text-white bg-purple-700 font-semibold':  getStatusForDate(date) === 'H'
                    }" >{{ getStatusForDate(date) }}</td>
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
                <td class="px-4 py-4 whitespace-nowrap">Total Days</td>
                <td class="px-4 py-4 whitespace-nowrap text-yellow-600 font-semibold">{{ totalDays }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
