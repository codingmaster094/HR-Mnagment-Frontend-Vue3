<script setup>
import useUserLeave from '@/composables/Leave.js';
import { computed, onMounted, reactive, ref } from 'vue';
import { Qalendar } from "qalendar";
import dayjs from 'dayjs';

const events = ref([]);
const config = ref({ defaultMode: 'month' });
const {
    CalenderLeaveData,
    get_UserLeave
} = useUserLeave()

onMounted(async () => {
  await get_UserLeave(); 
  setEvents(); 
});

const setEvents = () => {
    const eventsArray = CalenderLeaveData._rawValue.map(leave => ({
        with: leave.user_id ?  leave.user_id.name : "",
        description: leave.Leave_is_for,
        color: "purple",
        title: leave.Leave_type,
        time: { start: dayjs(leave.leave_date).format("YYYY-MM-DD"), end: leave.leave_end_date != "" ? dayjs(leave.leave_end_date).format("YYYY-MM-DD") : dayjs(leave.leave_date).format("YYYY-MM-DD") },
        allDay: true
    }));
    events.value = eventsArray;
};

</script>
<template>
    <div>
        <Qalendar :events="events" :config="config" :selectedDate="new Date(Date.now())" />
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
.fa-calendar-day{
    color: #6e40cd
}
</style>