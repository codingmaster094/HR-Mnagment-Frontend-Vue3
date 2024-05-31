<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import { computed, onMounted, ref } from "vue";
import useDesk from "../../composables/Mydesk.js";
import LeaveCalender from '../Leave/LeaveCalender.vue';
import useUserLeave from '@/composables/Leave.js';
import moment from 'moment';

const cakeIcon = '🎂';
const briefcaseIcon = '💼';
const GiftIcon = '';
const { UserData, ErrorMessage, statusCode, GetClockIN_out } = useDesk();
const { CelebrateEvents, AllUserGet } = useUserLeave();
const currentDate = moment();
const currentMonth = currentDate.month();
const nextMonth = currentDate.clone().add(1, 'months').month();
const currentYear = currentDate.year();

onMounted(async () => {
  await GetClockIN_out();
  await AllUserGet();
});

const presentUsers = computed(() => {
  return UserData.value.filter(user => user.attendance_today.length > 0);
});

const onLeaveUsers = computed(() => {
  return UserData.value.filter(user => user.leave_today.length > 0);
});

const absentUsers = computed(() => {
  return UserData.value.filter(user => user.attendance_today.length === 0 && user.leave_today.length === 0);
});

const filteredCelebrateEvents = computed(() => {
  return CelebrateEvents.value.filter(user => {
    const dob = moment(user.Dob).set('year', currentYear);
    const doj = moment(user.Doj).set('year', currentYear);

    return ((dob.month() === currentMonth || dob.month() === nextMonth) && dob.isSameOrAfter(currentDate)) ||
      ((doj.month() === currentMonth || doj.month() === nextMonth) && doj.isSameOrAfter(currentDate));
  });
});
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
          <div class="flex items-center w-full">
            <div class="m-5 grid grid-cols-1 gap-5"> <!-- Set width to 50% -->
              <div class="border border-l-4 border-red-500 w-2/3 rounded p-2 overflow-y-scroll">
                <h3 class="text-lg mb-3">Absent</h3>
                <div class="flex flex-wrap -mx-2">
                  <div v-for="user in absentUsers" :key="user._id" class="flex items-center px-2">
                    <div class="text-center relative attendance-reletive mt-2 mb-2" v-if="user.profile_image != null">
                      <img :src="user.profile_image" class="rounded-full w-10 h-10 mr-2" alt="Profile Image">
                      <div
                        class="hidden absolute top-5 left-0 mt-1 bg-red-700 shadow-lg rounded-md text-white text-xs z-10 px-2 py-1 time-details">
                        {{ user.name }}
                      </div>
                    </div>
                    <div class="text-center relative attendance-reletive mt-2 mb-2" v-else>
                      <img src="../../assets/user.png" class="rounded-full w-10 h-10 mr-2" alt="Profile Image">
                      <div
                        class="hidden absolute top-5 left-0 mt-1 bg-red-700 shadow-lg rounded-md text-white text-xs z-10 px-2 py-1 time-details">
                        {{ user.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border border-l-4 border-green-500 w-2/3 rounded p-2 overflow-y-scroll">
                <h3 class="text-lg mb-3">Present</h3>
                <div class="flex flex-wrap -mx-2">
                  <div v-for="user in presentUsers" :key="user._id" class="flex items-center px-2">
                    <div class="text-center relative attendance-reletive mt-2 mb-2" v-if="user.profile_image != null">
                      <img :src="user.profile_image" class="rounded-full w-10 h-10 mr-2" alt="Profile Image">
                      <div
                        class="hidden absolute top-5 left-0 mt-1 bg-green-700 shadow-lg rounded-md text-white text-xs z-10 px-2 py-1 time-details">
                        {{ user.name }}
                      </div>
                    </div>
                    <div class="text-center relative attendance-reletive mt-2 mb-2" v-else>
                      <img src="../../assets/user.png" class="rounded-full w-10 h-10 mr-2" alt="Profile Image">
                      <div
                        class="hidden absolute top-5 left-0 mt-1 bg-green-700 shadow-lg rounded-md text-white text-xs z-10 px-2 py-1 time-details">
                        {{ user.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border border-l-4 border-yellow-500 w-2/3 rounded p-2 overflow-y-scroll">
                <h3 class="text-lg mb-3">On leave</h3>
                <div class="flex flex-wrap -mx-2">
                  <div v-for="user in onLeaveUsers" :key="user._id" class="flex items-center px-2">
                    <div class="text-center relative attendance-reletive mt-2 mb-2" v-if="user.profile_image != null">
                      <img :src="user.profile_image" class="rounded-full w-10 h-10 mr-2" alt="Profile Image">
                      <div
                        class="hidden absolute top-5 left-0 mt-1 bg-yellow-700 shadow-lg rounded-md text-white text-xs z-10 px-2 py-1 time-details">
                        {{ user.name }}
                      </div>
                    </div>
                    <div class="text-center relative attendance-reletive mt-2 mb-2" v-else>
                      <img src="../../assets/user.png" class="rounded-full w-10 h-10 mr-2" alt="Profile Image">
                      <div
                        class="hidden absolute top-5 left-0 mt-1 bg-yellow-700 shadow-lg rounded-md text-white text-xs z-10 px-2 py-1 time-details">
                        {{ user.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="m-5 grid grid-cols-1 gap-5 w-1/1 m-5">
              <LeaveCalender />
            </div>
          </div>

          <div class="m-5 grid grid-cols-1 gap-5 w-1/4 m-5">
            <div class="mb-6">
              <div class="mb-2">
                <span class="flex items-center justify-between p-2 shadow">
                  <img src="../../assets/celebrate.png" class="rounded-full w-6 h-6 mr-2" alt="Profile Image">
                  <span class="text-md text-gray-600">Upcoming celebrations</span>
                </span>
              </div>
              <div class="relative overflow-y-auto z-0 h-52 p-4 thin-scroll bg-white shadow rounded-md">
                <div class="py-2">
                  <div class="flex items-center border-b border-blue-100" v-for="celebrate in filteredCelebrateEvents"
                    :key="celebrate._id">
                    <div class="w-full md:w-1/12">
                      <p class="text-xs mt-1 mb-2"
                        v-if="moment(celebrate.Dob).month() === currentMonth || moment(celebrate.Dob).month() === nextMonth">
                        {{ cakeIcon }}
                      </p>
                      <p class="text-xs mt-1 mb-2"
                        v-if="moment(celebrate.Doj).month() === currentMonth || moment(celebrate.Doj).month() === nextMonth">
                        {{ briefcaseIcon }}
                      </p>
                    </div>
                    <div class="w-full md:w-5/12">
                      <p class="text-sm text-gray-600"
                        v-if="moment(celebrate.Dob).month() === currentMonth || moment(celebrate.Dob).month() === nextMonth">
                        {{ moment(celebrate.Dob).set('year', currentYear).format('YYYY-MM-DD') }}
                      </p>
                      <p class="text-sm text-gray-600"
                        v-if="moment(celebrate.Doj).month() === currentMonth || moment(celebrate.Doj).month() === nextMonth">
                        {{ moment(celebrate.Doj).set('year', currentYear).format('YYYY-MM-DD') }}
                      </p>
                    </div>
                    <div class="w-full md:w-6/12">
                      <p class="text-sm text-gray-600 text-right">{{ celebrate.name }}</p>
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
</template>

<style scoped>
@import "qalendar/dist/style.css";

.is-trash-icon {
  display: none;
}

::-webkit-scrollbar {
  background: transparent; /* Chrome/Safari/Webkit */
  width: 0px;
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

.fa-calendar-day {
  color: #6e40cd
}

.attendance-reletive:hover .time-details {
  display: block;
}
</style>
