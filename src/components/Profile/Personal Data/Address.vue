<script setup>
import useUserprofile from "../../../composables/profileAPI.js";
import { ref } from 'vue';
import { onMounted, reactive } from 'vue';
const {
    UserDataprofileadd,
    create_addres,
    get_user_profile_address,
    UpdateUserprofile_address,
    DeleteUserprofile_address
} = useUserprofile();

const EditShow = ref(false)

onMounted(get_user_profile_address);

const formDataAdd = reactive({
    Add_line_one: "",
});
const MoreAddresssubmit = () => {
    create_addres(formDataAdd)
    EditShow.value = false
    AddForm.value = false
    get_user_profile_address()
};

const AddForm = ref(false)
const Add_address = () => {
    AddForm.value = true
}


const toggleEditMode = (addressLine) => {
    addressLine.editMode = true;
    addressLine.updatedAddress = addressLine.Add_line_one;
}

const toggledeleteMode = (id) => {
    DeleteUserprofile_address(id)
    get_user_profile_address()
    AddForm.value = false
}
const saveAddress = (id, addressLine) => {
    const Data = formDataAdd.Add_line_one = addressLine.updatedAddress;
    UpdateUserprofile_address(id, Data)
    get_user_profile_address()
    AddForm.value = false
};

const closeBTN = () => {
    AddForm.value = false
};
</script>
<template>
    <div class="emp-from-wrapper imp-dates">
        <div class="form-height">
            <div id="div">
                <div>
                    <div v-if="UserDataprofileadd.length != 0" v-for="(addressLine, index) in UserDataprofileadd"
                        :key="addressLine._id">
                        <div>
                            <h2 class="text-lg ml-3 mb-2 font-semibold">Address: {{ index + 1 }}</h2>
                            <div v-if="!addressLine.editMode">
                                <!-- Display address line -->
                                <h2 class="text-sm ml-3 mb-2 font-semibold">{{ addressLine.Add_line_one }}
                                </h2>
                                <!-- Edit button -->
                                <button
                                    class="w-50 text-white mt-3 bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 m-2"
                                    @click="toggleEditMode(addressLine)">
                                    Edit
                                </button>
                                <button
                                    class="w-50 text-white mt-3 bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    @click="toggledeleteMode(addressLine._id)">
                                    Delete
                                </button>
                            </div>
                            <div v-else>
                                <!-- Textarea for editing -->
                                <textarea class="address-data border-2" v-model="addressLine.updatedAddress" rows="5"
                                    cols="50" placeholder="Enter Address"></textarea>
                                <!-- Save button -->
                                <button
                                    class="w-50 text-white ml-3 mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    @click="saveAddress(addressLine._id, addressLine)">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="text-center">
                            <h1 class="mb-4 text-6xl font-semibold text-red-500">404</h1>
                            <p class="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
                            <div class="animate-bounce">
                                <svg class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </div>
                            <p class="mt-4 text-gray-600">Let's get you back <a href="/attendance"
                                    class="text-blue-500">home</a>.</p>
                        </div>
                    </div>
                    <button type="button"
                        class="w-50 text-white ml-3 mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        @click="Add_address">Add
                        More</button>
                </div>

                <div v-if="AddForm == true">
                    <form class="custom-form-box profile-about mt-3" autocomplete="off"
                        @submit.prevent="MoreAddresssubmit">
                        <div class="inner-wrapper opaque" tabindex="1">
                            <div class="form-group mb-4">
                                <textarea class="address-data border-2" v-model="formDataAdd.Add_line_one" rows="5"
                                    cols="50" placeholder="Enter A Address" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="5">
                            <button type="submit"
                                class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Save
                            </button>
                            <button type="button"
                                class="w-50 text-white mt-3 bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ms-2"
                                @click="closeBTN">
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