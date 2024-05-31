import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { BaseURL } from '../../env';
import Cookies from 'js-cookie';

export const useStopwatchStore = defineStore('stopwatch', () => {
  const token = Cookies.get("fmljwt");
  const EmployeesTimeurl = BaseURL + "EmployeesTime";

  const hours = ref(parseInt(localStorage.getItem('stopwatchHours')) || 0);
  const minutes = ref(parseInt(localStorage.getItem('stopwatchMinutes')) || 0);
  const seconds = ref(parseInt(localStorage.getItem('stopwatchSeconds')) || 0);
  const isRunning = ref(localStorage.getItem('stopwatchRunning') === 'true');

  let interval = null;
  let syncInterval = null;

  const elapsedTime = computed(() => ({
    hours: String(hours.value).padStart(2, '0'),
    minutes: String(minutes.value).padStart(2, '0'),
    seconds: String(seconds.value).padStart(2, '0'),
  }));

  const startStopwatch = async () => {
    if (interval) return; // Prevent setting multiple intervals
    isRunning.value = true;
    interval = setInterval(() => {
      seconds.value++;
      if (seconds.value >= 60) {
        seconds.value = 0;
        minutes.value++;
      }
      if (minutes.value >= 60) {
        minutes.value = 0;
        hours.value++;
      }
      // Update local storage with current elapsed time
      localStorage.setItem('stopwatchHours', hours.value);
      localStorage.setItem('stopwatchMinutes', minutes.value);
      localStorage.setItem('stopwatchSeconds', seconds.value);
    }, 1000);

    // Sync every 10 seconds
    syncInterval = setInterval(syncStopwatchData, 1000); // Sync every 10 seconds

    localStorage.setItem('stopwatchRunning', 'true');
    Cookies.set('INOUT', true);

    const todayRecord = await checkRecordForCurrentDate();
    if (todayRecord) {
      hours.value = todayRecord.attendace_Hours;
      minutes.value = todayRecord.attendace_Minutes;
      seconds.value = todayRecord.attendace_Seconds;
      localStorage.setItem('stopwatchHours', todayRecord.attendace_Hours);
      localStorage.setItem('stopwatchMinutes', todayRecord.attendace_Minutes);
      localStorage.setItem('stopwatchSeconds', todayRecord.attendace_Seconds);
    } else {
      await createRecordForCurrentDate();
    }
  };

  const syncStopwatchData = async () => {
    try {
      const userId = Cookies.get('_id');
      const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      await axios.post(`${EmployeesTimeurl}/create/user/EmployeesTime`, {
        user_id: userId,
        date,
        attendace_Hours: hours.value,
        attendace_Minutes: minutes.value,
        attendace_Seconds: seconds.value,
      }, { headers: { "Authorization": `Bearer ${token}` } });
    } catch (error) {
      console.error('Failed to sync stopwatch data:', error);
    }
  };

  const checkRecordForCurrentDate = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const result = await axios.post(`${EmployeesTimeurl}/get/user/EmployeesTime`, {}, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      return result.data.response_message.find(record => record.date.split('T')[0] === today);
    } catch (error) {
      console.error('Error checking record for current date:', error);
      return null;
    }
  };

  const createRecordForCurrentDate = async () => {
    try {
      const userId = Cookies.get('_id');
      const date = new Date().toISOString().split('T')[0];

      await axios.post(`${EmployeesTimeurl}/create/user/EmployeesTime`, {
        user_id: userId,
        date,
        attendace_Hours: 0,
        attendace_Minutes: 0,
        attendace_Seconds: 0,
      }, { headers: { "Authorization": `Bearer ${token}` } });

      // Set default values in local storage
      localStorage.setItem('stopwatchHours', 0);
      localStorage.setItem('stopwatchMinutes', 0);
      localStorage.setItem('stopwatchSeconds', 0);
    } catch (error) {
      console.error('Error creating record for current date:', error);
    }
  };

  const stopStopwatch = async () => {
    isRunning.value = false;
    clearInterval(interval);
    clearInterval(syncInterval);
    interval = null;
    syncInterval = null;
    localStorage.setItem('stopwatchRunning', 'false'); // Set stopwatchRunning to false first
    Cookies.set('INOUT', false);
    await syncStopwatchData(); // Ensure the final state is saved
  };

  const initializeStopwatch = () => {
    if (isRunning.value) {
      startStopwatch();
    }
  };

  return { elapsedTime, startStopwatch, stopStopwatch, initializeStopwatch, isRunning };
});
