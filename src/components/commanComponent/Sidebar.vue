<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useStopwatchStore } from '@/stores/stopwatch.js';
import useAttendance from '@/composables/Attendance.js';
import useUser from '@/composables/userApi.js';
import Swal from 'sweetalert2';

import {
  ClockIcon, HomeIcon, DesktopComputerIcon, UserIcon,
  CalendarIcon, ArchiveIcon, DatabaseIcon, ClipboardCheckIcon, LogoutIcon,
  UserAddIcon,
  AnnotationIcon,
  IdentificationIcon,
  UserGroupIcon
} from "@heroicons/vue/solid";
import Cookies from 'js-cookie';
import { debounce } from 'lodash-es';
import useRole from '@/composables/role.js';

const { Attendance_present_create } = useAttendance();
const { Role , RoleAccess } = useRole();

const isRoleLoaded = ref(false);
const userRole = ref(null);

onMounted(async () => {
  await RoleAccess();
  userRole.value = Role.value.role;
  isRoleLoaded.value = true;
});

const { logoutUser } = useUser();
const BTN = ref(Cookies.get('INOUT') === 'true');
const stopwatchStore = useStopwatchStore();
const router = useRouter();

const Usermenu = ref([
  { label: 'Home', active: false, icon: HomeIcon, link: "Home" },
  { label: 'My Desk', active: false, icon: DesktopComputerIcon, link: "Mydesk" },
  { label: 'Profile', active: false, icon: UserIcon, link: "UserProfile" },
  { label: 'Attendance', active: false, icon: CalendarIcon, link: "Attendance" },
  { label: 'Leave', active: false, icon: ClipboardCheckIcon, link: "Leave" },
  { label: 'Holiday', active: false, icon: ArchiveIcon, link: "Holiday" },
  { label: 'Payroll', active: false, icon: DatabaseIcon, link: "Payroll" },
]);

const Adminmenu = ref([
  { label: 'User List', active: false, icon: UserAddIcon, link: "Userlist" },
  { label: 'Create user', active: false, icon: UserAddIcon, link: "Create_user" },
  { label: 'Create personal Data', active: false, icon: AnnotationIcon, link: "PersonalDetails" },
  { label: 'Leave Status', active: false, icon: IdentificationIcon, link: "LeaveStatus" },
  { label: 'User Attendance', active: false, icon: UserGroupIcon, link: "User_attendance" },
]);

const formdata = reactive({
  date: new Date(),
  attendace_status: "P"
});

const stopwatchUnits = [
  { type: 'hours', singular: 'Hour', plural: 'Hours' },
  { type: 'minutes', singular: 'Minute', plural: 'Minutes' },
  { type: 'seconds', singular: 'Second', plural: 'Seconds' },
];

const INTIME = async () => {
  await Attendance_present_create(formdata);
  BTN.value = true;
  stopwatchStore.startStopwatch();
};

const OUTTIME = async () => {
  BTN.value = false;
  stopwatchStore.stopStopwatch();
};

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
      stopwatchStore.stopStopwatch();
    }
  });
};

const setActive = (index) => {
  if (userRole.value === 1) {
    Usermenu.value.forEach((item, i) => {
      item.active = i === index;
    });
  } else {
    Adminmenu.value.forEach((item, i) => {
      item.active = i === index;
    });
  }
};

onMounted(() => {
  if (stopwatchStore.isRunning) {
    stopwatchStore.initializeStopwatch();
  }
});

const navigateAndStartStopwatch = debounce((index) => {
  setActive(index);
}, 300);
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

    <div class="flex justify-center w-full" v-if="userRole === 1">
      <!-- Stopwatch Section -->
      <div class="flex justify-center mt-4 mb-3 gap-2 sm:gap-2 w-1/3">
        <div class="flex flex-col gap-1 relative" v-for="(unit, index) in stopwatchUnits" :key="index">
          <div class="h-8 w-8 sm:w-16 sm:h-16 lg:w-10 lg:h-10 flex justify-center items-center bg-[#9248e7] rounded-lg">
            <span class="lg:text-2xl sm:text-2xl text-2xl font-semibold text-[#ffffff]">
              {{ stopwatchStore.elapsedTime[unit.type] }}
            </span>
          </div>
          <span class="text-[#1c1c1d] text-xs sm:text-1xl text-center capitalize">
            {{ stopwatchStore.elapsedTime[unit.type] == 1 ? unit.singular : unit.plural }}
          </span>
        </div>
      </div>
    </div>

  
    <div v-if="isRoleLoaded">
      <div v-if="userRole === 1">
        <div v-for="(item, index) in Usermenu" :key="index">
          <RouterLink :to="{ name: item.link }" class="block">
            <div
              class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer"
              :class="{ 'hover:bg-violet-600 hover:text-white': !item.active, 'text-black': !item.active, 'active': item.active }"
              @click="navigateAndStartStopwatch(index)"
            >
              <component :is="item.icon" class="h-6 w-6 ml-2" />
              <span class="text-[15px] ml-2 text-black-200 font-bold">{{ item.label }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
      <div v-else-if="userRole === 0">
        <div v-for="(item, index) in Adminmenu" :key="index">
          <RouterLink :to="{ name: item.link }" class="block">
            <div
              class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer"
              :class="{ 'hover:bg-violet-600 hover:text-white': !item.active, 'text-black': !item.active, 'active': item.active }"
              @click="navigateAndStartStopwatch(index)"
            >
              <component :is="item.icon" class="h-6 w-6 ml-2" />
              <span class="text-[15px] ml-2 text-black-200 font-bold">{{ item.label }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>


    <!-- Logout menu item -->
    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-violet-600 hover:text-white text-black"
      @click="logout">
      <LogoutIcon class="h-6 w-6 ml-2" />
      <span class="text-[15px] ml-2 text-black-200 font-bold">Logout</span>
    </div>

    <div class="Attendace_BTN" v-if="userRole === 1">
      <button v-if="!BTN" class="text-black text-md bg-green-300 hover:bg-green-500 font-medium rounded p-2 px-12"
        @click="INTIME">
        Clock-In
        <ClockIcon class="text-blue-500 h-6 w-6 inline ms-2" />
      </button>
      <button v-else class="text-black text-md bg-yellow-300 hover:bg-yellow-500 font-medium rounded p-2 px-12"
        @click="OUTTIME">
        Clock-Out
        <ClockIcon class="text-blue-500 h-6 w-6 inline ms-2" />
      </button>
    </div>
  </div>
</template>



<style scoped>
.active {
  background-color: #6a39ff;
  color: aliceblue;
}

.Attendace_BTN {
  position: fixed;
  bottom: 20px;
  left: 20px;
}

.stopwatch {
  text-align: center;
  padding: 0px;
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
