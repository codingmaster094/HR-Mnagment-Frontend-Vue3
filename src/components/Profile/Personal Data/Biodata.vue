<script setup>
import useUserprofile from "../../../composables/profileAPI.js";
import { ref, onMounted, reactive } from 'vue';
const {
    UserDataprofilebiodata,
    get_user_profile_biodata,
    UpdateUserprofile_biodata,
} = useUserprofile();

onMounted(() => {
    get_user_profile_biodata()
});

console.log('UserDataprofilebiodata', UserDataprofilebiodata)
const EditShow = ref(false)
const Aboutsubmit = () => {
    UpdateUserprofile_biodata(UserDataprofilebiodata.value)
    EditShow.value = false
};

const EditaboutData = (id) => {
    EditShow.value = true
};
</script>
<template>
    <div>
        <button v-if="EditShow == false" class="biodata-edit-btn w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            @click="EditaboutData">
            Edit
        </button>
        <div class="emp-from-wrapper imp-dates">
            <div class="form-height">
                <div id="div">
                    <form class="custom-form-box profile-about" autocomplete="off" @submit.prevent="Aboutsubmit">
                        <div class="inner-wrapper opaque" tabindex="0">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2"><span class="emp-special-head">Gender</span>
                                </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofilebiodata.Gender" :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="1">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">Blood Group(Optional)</p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofilebiodata.Blood_Group" :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="2">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">Gender pronoun (Optional) </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofilebiodata.Gender_pronoun" :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="3">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">Challenged(Optional) </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofilebiodata.Challenged" :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="4">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">Marital status (Optional) </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofilebiodata.Marital_status" :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="5">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">Your spouse/partner's name (Optional) </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofilebiodata.Your_spouse_partners_name" :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="5">
                            <button v-if="EditShow == true" type="submit"
                                class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Save
                            </button>
                            <button v-if="EditShow == true"
                                class="w-50 text-white mt-3 bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ms-2"
                                @click="!contactData.editMode">
                                close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>