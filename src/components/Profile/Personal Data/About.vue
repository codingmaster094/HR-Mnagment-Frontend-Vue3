<script setup>
import useUserprofile from "../../../composables/profileAPI.js";
import { ref, onMounted, reactive } from 'vue';
const {
    UserDataprofile,
    get_user_profile_about,
    UpdateUserprofile,
} = useUserprofile();

onMounted(() => {
    get_user_profile_about()
});

const EditShow = ref(false)
const Aboutsubmit = () => {
    UpdateUserprofile(UserDataprofile.value)
    EditShow.value = false
};

const EditaboutData = (id) => {
    EditShow.value = true
};
</script>
<template>
    <div>
        <button v-if="EditShow == false"
            class="biodata-edit-btn w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            @click="EditaboutData">
            Edit
        </button>
        <div class="emp-from-wrapper imp-dates">
            <div class="form-height">
                <div id="div">
                    <form class="custom-form-box profile-about" autocomplete="off" @submit.prevent="Aboutsubmit">
                        <div class="inner-wrapper opaque" tabindex="0">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2"><span class="emp-special-head">Salutation</span>
                                </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofile.Salutation"
                                    :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="1">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">First Name</p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofile.First_Name"
                                    :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="2">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">Middle Name (Optional) </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofile.Middle_Name"
                                    :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="3">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">Last Name </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofile.Last_Name"
                                    :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="4">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">Preferred Name (Optional) </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofile.Preferred_Name"
                                    :disabled="!EditShow" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="5">
                            <div class="form-group mb-4">
                                <p class="input-form-label mb-2">About Yourself (Optional) </p>
                                <input class="address-data bg-white" :class="{ ' border-2': EditShow }" v-model.trim="UserDataprofile.About_Yourself"
                                    :disabled="!EditShow" />
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