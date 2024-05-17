<script setup>
import useUserprofile from "../../../composables/profileAPI.js";
import { ref, onMounted, reactive } from 'vue';

const {
UserDataprofile_reporting,
ErrorMessageprofile_reporting,
statusCodeprofile_reporting,
get_user_profile_reporting
} = useUserprofile();

 // Define refs for each field
 const reporting_office = ref('');

 console.log('UserDataprofile_reporting', UserDataprofile_reporting)
onMounted(() => {
    get_user_profile_reporting().then(() => {
      // Update ref values with data from UserDataprofile_workdetails
      const data = UserDataprofile_reporting._rawValue; // Accessing the raw value
      reporting_office.value = data.reporting_office;
    });
  });
</script>
<template>
    <div class="emp-from-wrapper imp-dates">
        <div class="form-height">
            <div id="div" class="ml-3">
                <h5 class="text-lg">{{reporting_office}}</h5>
                <div class="MuiChip-root"><span class="MuiChip-label">Current</span></div>
            </div>
        </div>
    </div>
</template>
<style>
.MuiChip-root {
    color: rgba(0, 0, 0, 0.87);
    border: none;
    cursor: default;
    height: 32px;
    display: inline-flex;
    outline: 0;
    padding: 0;
    font-size: 0.8125rem;
    box-sizing: border-box;
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    font-family: "Muli", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif";
    white-space: nowrap;
    border-radius: 16px;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: #e0e0e0;
}
.MuiChip-label {
    overflow: hidden;
    white-space: nowrap;
    padding-left: 12px;
    padding-right: 12px;
    text-overflow: ellipsis;
}
</style>