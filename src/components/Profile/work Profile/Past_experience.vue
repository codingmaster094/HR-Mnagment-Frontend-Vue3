<script setup>
import { onMounted, reactive, ref } from 'vue';
import useUserprofile from "../../../composables/profileAPI.js";

const showModal = ref(false);
const {
    UserDataprofile_pastEX,
    ErrorMessageprofile_pastEX,
    statusCodeprofile_pastEX,
    create_pastEX,
    get_pastEX,
    get_pastEX_id,
    UpdateUserprofile_pastEX,
    DeleteUserprofile_pastEX,
} = useUserprofile();

onMounted(get_pastEX)
const EditShow = ref(false);
const formdata = reactive({
    Company: "",
    Work_Role: "",
    Company_Address: "",
    Country: "",
    State: "",
    City: "",
})

const Aboutsubmit = () => {
    create_pastEX(formdata)
    EditShow.value = false
};

const toggleEditMode = (id) => {
    get_pastEX_id(id)
    showModal.value = !showModal.value;
}

const toggledeleteMode = (id) => {
    DeleteUserprofile_pastEX(id)
    get_pastEX()
}
const updatedependant = (id) => {
    UpdateUserprofile_pastEX(id, UserDataprofile_pastEX.value)
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
                                        <div v-for="(contactData, index) in UserDataprofile_pastEX"
                                            :key="contactData._id" class="ml-3">
                                            <h5 class="font-bold text-xl mb-2">EXPERIENCES : {{ index + 1 }}</h5>
                                            <p class="text-lg">{{ contactData.Work_Role }}</p>
                                            <p class="text-lg">{{ contactData.Company }}</p>
                                            <p class="text-lg">{{contactData.Company_Address }}</p>
                                            <p class="text-lg mb-2">{{ contactData.Start_Date }} - {{ contactData.End_Date }}</p>
                                            <p class="text-lg mb-2">{{ contactData.City }} - {{ contactData.State }}- {{ contactData.Country }}</p>
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
                                            class="w-50 ml-3 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            @click="EditShow = true">Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <form class="custom-form-box profile-about" autocomplete="off"
                                    @submit.prevent="Aboutsubmit">
                                    <div class="inner-wrapper opaque" tabindex="0">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span
                                                    class="emp-special-head">Company</span></p>
                                            <input class="address-data border-2" v-model="formdata.Company" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="1">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">Work Role</span></p>
                                            <input class="address-data border-2" v-model="formdata.Work_Role" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="2">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">Company Address</span> </p>
                                            <input class="address-data border-2"
                                                v-model="formdata.Company_Address" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="2">
                                        <div class="form-group mb-4 me-2">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">start Date</span> </p>
                                            <input class="address-data border-2" type="text"
                                                v-model="formdata.Start_Date" />
                                        </div>
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">End Date</span> </p>
                                            <input class="address-data border-2" type="text"
                                                v-model="formdata.End_Date" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="3">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">Country</span> </p>
                                            <input class="address-data border-2" type="text"
                                                v-model="formdata.Country" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="3">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">State</span> </p>
                                            <input class="address-data border-2" type="text"
                                                v-model="formdata.State" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="3">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">City</span> </p>
                                            <input class="address-data border-2" type="text"
                                                v-model="formdata.City" />
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
                <form class="p-4 md:p-5" @submit.prevent="updatedependant(UserDataprofile_pastEX._id)">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name" v-model="UserDataprofile_pastEX.Company" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_pastEX.Work_Role" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Address</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_pastEX.Company_Address" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_pastEX.Start_Date" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Dste</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_pastEX.End_Date" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_pastEX.Country" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_pastEX.State" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"  v-model="UserDataprofile_pastEX.City" required="">
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