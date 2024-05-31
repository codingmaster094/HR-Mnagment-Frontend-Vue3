<script setup>
import useUserLeave from '@/composables/Leave.js';
import useUser from '@/composables/userApi.js';
import { onMounted, ref, watchEffect } from 'vue';
import { Qalendar } from "qalendar";
import dayjs from 'dayjs';
import moment from 'moment';

// Unicode icons for events
const cakeIcon = '🎂';
const briefcaseIcon = '💼';

const events = ref([]);
const config = ref({ defaultMode: 'month' });

const { CalenderLeaveData, get_UserLeave } = useUserLeave();
const { getAlluserData, AllUserGet } = useUser();
const currentDate = ref(moment()); // Use ref to make it reactive

console.log('getAlluserData', getAlluserData)

onMounted(async () => {
    await AllUserGet(); 
    await get_UserLeave(); 
    setEvents(currentDate.value.year()); // Set events for the current year
});

// Watch for changes in the current year and update events
const setEvents = (year) => {
    const leaveEvents = CalenderLeaveData._rawValue
        .map((leave, index) => {
            const start = dayjs(leave.leave_date).isValid() ? dayjs(leave.leave_date).format("YYYY-MM-DD") : null;
            const end = leave.leave_end_date && dayjs(leave.leave_end_date).isValid() ? dayjs(leave.leave_end_date).format("YYYY-MM-DD") : start;

            if (!start) {
                console.warn(`Invalid start date for leave event with index ${index}`);
                return null; // Skip invalid events
            }

            return {
                id: `leave-${index}`, // Add unique ID for each event
                with: leave.user_id ? leave.user_id.name : "",
                description: leave.Leave_is_for,
                color: "purple",
                title: leave.Leave_type,
                time: { 
                    start: start, 
                    end: end 
                },
                allDay: true,
                type: "leave" // Add a valid type for leave events
            };
        })
        .filter(event => event !== null); // Filter out invalid events

    // Process getAlluserData
    const userBirthEvents = getAlluserData._rawValue
        .map((user, index) => {
            const start = moment(user.Dob).isValid() ? moment(user.Dob).year(year).format("YYYY-MM-DD") : null;

            if (!start) {
                console.warn(`Invalid start date for birthday event with index ${index}`);
                return null; // Skip invalid events
            }

            return {
                id: `birthday-${index}`, // Add unique ID for each event
                with: user.name,
                color: "purple",
                title: `${cakeIcon} Birth Day`,
                time: { 
                    start: start, 
                    end: start 
                },
                allDay: true,
                type: "birthday" // Add a valid type for birthday events
            };
        })
        .filter(event => event !== null); // Filter out invalid events

    const userAnniversaryEvents = getAlluserData._rawValue
        .map((user, index) => {
            const start = moment(user.Doj).isValid() ? moment(user.Doj).year(year).format("YYYY-MM-DD") : null;

            if (!start) {
                console.warn(`Invalid start date for anniversary event with index ${index}`);
                return null; // Skip invalid events
            }

            return {
                id: `anniversary-${index}`, // Add unique ID for each event
                with: user.name,
                color: "purple",
                title: `${briefcaseIcon} Work Anniversary`,
                time: { 
                    start: start, 
                    end: start 
                },
                allDay: true,
                type: "anniversary" // Add a valid type for anniversary events
            };
        })
        .filter(event => event !== null); // Filter out invalid events

    // Combine both arrays
    events.value = [...leaveEvents, ...userBirthEvents, ...userAnniversaryEvents];
};

watchEffect(() => {
  setEvents(currentDate.value.year());
});
</script>



<template>
  <div>
    <Qalendar :events="events" :config="config" :selectedDate="new Date(Date.now())" />
  </div>
</template>






<style scoped>
@import "qalendar/dist/style.css";

.icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

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
.fa-calendar-day{
    color: #6e40cd
}
</style>