<script setup>
import useUserprofile from "../../../composables/profileAPI.js";
import { ref } from 'vue';
import { onMounted, reactive } from 'vue';
const {
    UserDataprofilecontact,
    ErrorMessageprofilecontact,
    statusCodeprofilecontact,
    create_contact,
    get_user_profile_contact,
    get_user_id_profile_contact,
    UpdateUserprofile_contact,
    DeleteUserprofile_contact
} = useUserprofile();

const EditShow = ref(false)

onMounted(() => {
    get_user_profile_contact()
});

const formDataAdd = reactive({
    contact: "",
});
const MoreAddresssubmit = () => {
    create_contact(formDataAdd)
    EditShow.value = false
};

const AddForm = ref(false)
const Add_contact = () => {
    AddForm.value = true
}


const toggleEditMode = (contactData) => {
    contactData.editMode = true;
    contactData.updatedcontact = contactData.contact;
}

const toggledeleteMode = (id) => {
    DeleteUserprofile_contact(id)
    get_user_profile_contact()
}
const saveContact = (id, contactData) => {
    const Data = formDataAdd.contact = contactData.updatedcontact;
    UpdateUserprofile_contact(id, Data)
};

const closeBTN = () => {
    AddForm.value = false
}
</script>
<template>
    <div class="emp-from-wrapper imp-dates">
        <div class="form-height">
            <div id="div">
                <div v-if="UserDataprofilecontact.length !== 0">
                    <div v-for="(contactData, index) in UserDataprofilecontact" :key="contactData._id">
                        <div>
                            <h2 class="text-lg ml-3 mb-3 font-semibold">Contact: {{ index + 1 }}</h2>
                            <div v-if="!contactData.editMode">
                                <!-- Display address line -->
                                <h2 class="text-sm ml-3 mb-2 font-semibold">{{ contactData.contact }}
                                </h2>
                                <!-- Edit button -->
                                <button class="w-50 text-white mt-3 bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    @click="toggleEditMode(contactData)">
                                    Edit
                                </button>
                                <button class="w-50 text-white mt-3 bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ms-2"
                                    @click="toggledeleteMode(contactData._id)">
                                    Delete
                                </button>
                            </div>
                            <div v-else>
                                <!-- Textarea for editing -->
                                <input class="address-data border-2" v-model="contactData.updatedcontact"
                                    placeholder="Enter contact number"></input>
                                <!-- Save button -->
                                <button class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    @click="saveContact(contactData._id, contactData)">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button"
                    class="w-50 text-white ml-3 mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    @click="Add_contact">Add
                    More</button>

                <div v-if="AddForm == true">
                    <form class="custom-form-box profile-about mt-3" autocomplete="off"
                        @submit.prevent="MoreAddresssubmit">
                        <div class="inner-wrapper opaque" tabindex="1">
                            <div class="form-group mb-4">
                                <input class="address-data border-2" v-model="formDataAdd.contact" placeholder="Enter A Address" />
                            </div>
                        </div>
                        <div class="inner-wrapper opaque" tabindex="5">
                            <button type="submit" class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
</template>
<style></style>