<script setup>
import useUserprofile from "../../../composables/profileAPI.js";
import { ref, onMounted, reactive } from 'vue';

const {
    UserDataprofile_currentEX,
    ErrorMessageprofile_currentEX,
    statusCodeprofile_currentEX,
    get_user_profile_currentEX
} = useUserprofile();

// Define refs for each field
const disignation = ref('');
const company = ref('');
const DOJ = ref('');

onMounted(() => {
    get_user_profile_currentEX().then(() => {
        const data = UserDataprofile_currentEX._rawValue;
        disignation.value = data.disignation;
        company.value = data.company;
        DOJ.value = data.DOJ;
    });
});
</script>
<template>
    <div class="emp-from-wrapper imp-dates">
        <div class="form-height">
            <div id="div">
                <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                    <div class="address-data">{{ disignation }}</div>
                </div>
                <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                    <div class="address-data">{{ company }}</div>
                </div>
                <div class="margin-bottom-20 ml-3 mb-3 dependent-datepicker width100">
                    <div class="address-data">{{ DOJ }} to Present</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>