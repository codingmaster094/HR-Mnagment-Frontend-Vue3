<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import { onMounted } from "vue";
import useDesk from "../../composables/Mydesk.js"
import LeaveCalender from '../Leave/LeaveCalender.vue';
const { UserData, ErrorMessage, statusCode, GetClockIN_out } = useDesk();
onMounted(GetClockIN_out);
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
            <div class="m-5 grid grid-cols-1 gap-5 w-1/3"> <!-- Set width to 50% -->
              <div class="border border-l-4 border-red-500 rounded p-5">
                <h3 class="text-lg text-lg mb-3">Absent</h3>
                <div class="flex flex-wrap -mx-2">
                  <div v-for="user in UserData.Data3" :key="user.id" class="flex items-center mb-3 px-2">
                    <img :src="user.profile_image" class="rounded-full w-10 h-10 mr-2" alt="">
                  </div>
                </div>
              </div>
              <div class="border border-l-4 border-green-500 rounded p-5">
                <h3 class="text-lg text-lg mb-3">Present</h3>
                <div class="flex flex-wrap -mx-2">
                  <div v-for="user in UserData.Data1" :key="user.id" class="items-center mb-3 px-2">
                    <img :src="user.profile_image" class="rounded-full w-10 h-10 mr-2" alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class="m-5 grid grid-cols-1 gap-5 w-1/3">
              <!-- <div class="border border-l-4 border-sky-500 rounded p-5">
                <h3 class="text-lg text-lg mb-3">Clocked-out</h3>
                <div class="flex flex-wrap -mx-2">
                  <div v-for="user in UserData.Data2" :key="user.id" class="items-center mb-3 px-2">
                    <img :src="user.profile_image" class="rounded-full w-10 h-10 mr-2" alt="">
                  </div>
                </div>
              </div> -->
              <div class="border border-l-4 border-yellow-500 rounded p-5">
                <h3 class="text-lg text-lg mb-3">On leave</h3>
                <div class="flex flex-wrap -mx-2">
                  <div class="flex items-center mb-3 px-2">
                    <div v-for="user in UserData.Data4" :key="user.id" class="items-center mb-3 px-2">
                      <img :src="user.user_id.profile_image" class="rounded-full w-10 h-10 mr-2" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="m-5 grid grid-cols-1 gap-5 w-1/1 m-5">
              <LeaveCalender />
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
</style>
