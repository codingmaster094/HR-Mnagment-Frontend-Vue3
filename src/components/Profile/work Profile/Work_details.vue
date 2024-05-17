<script setup>
import useUserprofile from "../../../composables/profileAPI.js";
import { ref, onMounted, reactive } from 'vue';

const {
UserDataprofile_workdetails,
ErrorMessageprofile_workdetails,
statusCodeprofile_workdetails,
get_user_profile_workdetails,
} = useUserprofile();

 // Define refs for each field
 const dateOfJoining = ref('');
  const employmentStage = ref('');
  const employmentType = ref('');
  const employmentGrade = ref('');
  const selfService = ref('');
  const probationEndDate = ref('');
  const dateOfConfirmation = ref('');
  const noticePeriodStartDate = ref('');
  const exitDate = ref('');

onMounted(() => {
    get_user_profile_workdetails().then(() => {
      // Update ref values with data from UserDataprofile_workdetails
      const data = UserDataprofile_workdetails._rawValue; // Accessing the raw value
      dateOfJoining.value = data.DOJ;
      employmentStage.value = data.Employment_Stage;
      employmentType.value = data.Employment_Type;
      employmentGrade.value = data.Employment_Grade;
      selfService.value = data.Self_Service;
      probationEndDate.value = data.Probation_End_Date;
      dateOfConfirmation.value = data.Date_of_Confirmation;
      noticePeriodStartDate.value = data.Notice_period_start_date;
      exitDate.value = data.Exit_date;
    });
  });
</script>
<template>
    <div class="emp-from-wrapper">
        <div class="form-height">
            <div id="div">
                <form class="custom-form-box profile-about profile-imp-dates" autocomplete="off">
                    <div  class="inner-wrapper opaque ml-3" tabindex="0">
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Date of Joining</p>
                            <div class="address-data">{{dateOfJoining}}</div>
                        </div>
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Employment Stage</p>
                            <div class="address-data">{{employmentStage}}</div>
                        </div>
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Employment Type</p>
                            <div class="address-data">{{employmentType}}</div>
                        </div>
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Employment Grade</p>
                            <div class="address-data">{{ employmentGrade }}</div>
                        </div>
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Self Service</p>
                            <div class="address-data">{{ selfService }}</div>
                        </div>
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Probation End Date</p>
                            <div class="address-data">{{probationEndDate}}</div>
                        </div>
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Date of Confirmation</p>
                            <div class="address-data">{{ dateOfConfirmation }}</div>
                        </div>
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Notice period start date</p>
                            <div class="address-data">{{ noticePeriodStartDate }}</div>
                        </div>
                        <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                            <p class="input-form-label text-sky-700">Exit date</p>
                            <div class="address-data">{{ exitDate }}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style></style>