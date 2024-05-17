<script setup>
import { onMounted, reactive, ref } from 'vue';
import useUserprofile from "../../../composables/profileAPI.js";

const showModal = ref(false);
const {
    UserDataprofile_dependents,
    ErrorMessageprofile_dependents,
    statusCodeprofile_dependents,
    create_dependents,
    get_dependents,
    get_dependents_id,
    UpdateUserprofile_dependents,
    DeleteUserprofile_dependents
} = useUserprofile();

onMounted(get_dependents)
const EditShow = ref(false);
const formdata = reactive({
    Dependents: "",
    First_Name: "",
    Emergency_contact_number: "",
    Birth_date: ""
})

const Aboutsubmit = () => {
    create_dependents(formdata)
    EditShow.value = false
};

const toggleEditMode = (id) => {
    get_dependents_id(id)
    showModal.value = !showModal.value;
}

const toggledeleteMode = (id) => {
    DeleteUserprofile_dependents(id)
    get_dependents()
}
const updatedependant = (id) => {
    UpdateUserprofile_dependents(id, UserDataprofile_dependents.value)
    showModal.value = false
};  

const closeBTN = () => {
    EditShow.value = false
};
</script>

<template>
    <div>
        <div class="emp-from-wrapper imp-dates">
            <div class="form-height">
                <div id="div">
                    <div class="verticaltab-innercont">
                        <div>
                            <div v-if="EditShow == false" class="grid grid-cols-1 md:grid-cols-2">
                                <div class="md:col-span-1">
                                    <div class="text-left">
                                        <div v-for="(contactData, index) in UserDataprofile_dependents"
                                            :key="contactData._id">
                                            <h5 class="font-bold text-xl mb-2">Family Dependents {{ index + 1 }}</h5>
                                            <p class="text-lg">Dependents : {{ contactData.Dependents }}</p>
                                            <p class="text-lg">First Name : {{ contactData.First_Name }}</p>
                                            <p class="text-lg">Emergency contact number : {{
                                                contactData.Emergency_contact_number }}</p>
                                            <p class="text-lg mb-2">Birth date : {{ contactData.Birth_date }}</p>
                                            <button
                                                class="w-50 text-white mt-3 bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 m-2"
                                                @click="toggleEditMode(contactData._id)">
                                                Edit
                                            </button>
                                            <button
                                                class="w-50 text-white mt-3 bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                @click="toggledeleteMode(contactData._id)">
                                                Delete
                                            </button>
                                        </div>
                                        <button type="button"
                                            class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            @click="EditShow = true">Add
                                        </button>
                                    </div>
                                </div>
                                <div class="bg-white md:col-span-1">
                                    <div class="text-right">
                                        <img src="../../../assets/dependent.svg" class="w-80">
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <form class="custom-form-box profile-about" autocomplete="off"
                                    @submit.prevent="Aboutsubmit">
                                    <div class="inner-wrapper opaque" tabindex="0">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span
                                                    class="emp-special-head">Dependents</span></p>
                                            <input class="address-data border-2" v-model="formdata.Dependents" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="1">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">First
                                                    Name</span></p>
                                            <input class="address-data border-2" v-model="formdata.First_Name" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="2">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">Emergency
                                                    contact number</span> </p>
                                            <input class="address-data border-2"
                                                v-model="formdata.Emergency_contact_number" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="3">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">Birth
                                                    date</span> </p>
                                            <input class="address-data border-2" type="date"
                                                v-model="formdata.Birth_date" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="5">
                                        <button v-if="EditShow == true" type="submit"
                                            class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            Save
                                        </button>
                                        <button type="button"
                                        class="w-50 text-white mt-3 bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ms-2" @click="closeBTN">
                                        close
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="showModal"
        class="fixed z-10 inset-0 overflow-y-auto overflow-x-hidden flex justify-center items-center bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Update Dependents
                    </h3>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5" @submit.prevent="updatedependant(UserDataprofile_dependents._id)">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dependents</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name" v-model="UserDataprofile_dependents.Dependents" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                Name</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_dependents.First_Name" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency
                                contact number</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_dependents.Emergency_contact_number" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth
                                date</label>
                            <input type="date" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_dependents.Birth_date" required="">
                        </div>
                    </div>
                    <button type="submit"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                        Save
                    </button>
                    <button type="button"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
                        @click="showModal = false">
                        Close
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>

</style>