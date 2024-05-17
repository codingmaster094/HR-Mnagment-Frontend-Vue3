<script setup>
import { onMounted, reactive, ref } from 'vue';
import useUserprofile from "../../../composables/profileAPI.js";

const showModal = ref(false);
const {
    UserDataprofile_identity,
    create_identity,
    get_identity,
    get_identity_id,
    UpdateUserprofile_identity,
    DeleteUserprofile_identity,
    ErrorMessageprofile_identity,
    statusCodeprofile_identity,
} = useUserprofile();

onMounted(get_identity)
const EditShow = ref(false);

const formdata = reactive({
    Custom_document: "",
    Attachments: null
})

const handleFileChange = async (event) => {
    formdata.Attachments = event.target.files[0];
};

const Aboutsubmit = () => {
    create_identity(formdata)
    EditShow.value = false
};

const toggleEditMode = (id) => {
    get_identity_id(id)
    showModal.value = !showModal.value;
}

const toggledeleteMode = (id) => {
    DeleteUserprofile_identity(id)
    get_identity()
}
const updatedependant = (id) => {
    UpdateUserprofile_identity(
        id, 
      UserDataprofile_identity.value.Custom_document = UserDataprofile_identity.value.Custom_document,
      UserDataprofile_identity.value.Attachments = formdata.Attachments,
     )
    showModal.value = false
};  

const handleDownload = (attachmentUrl) => {
    const link = document.createElement('a');
    link.href = attachmentUrl;
    link.download = attachmentUrl.split('/').pop(); // Set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.open(attachmentUrl, '_blank');
};

const closeBTN = () => {
    EditShow.value = false
};

</script>

<template>
    <div>
        <div v-if="UserDataprofile_identity.value" class="grid grid-cols-1 md:grid-cols-2 ml-3">
            <div class="text-left">
                <h5 class="mb-2">Identity document details</h5>
                <p class="mb-4">Add your documents.</p>
                <button
                    class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    tabindex="0" type="button">ADD</button>
            </div>
            <div class="hidden md:block">
                <img src="" class="w-80">
            </div>
        </div>
        <div v-else class="emp-from-wrapper imp-dates">
            <div class="form-height">
                <div id="div">
                    <div class="verticaltab-innercont">
                        <div>
                            <div v-if="EditShow == false" class="grid grid-cols-1 md:grid-cols-2">
                                <div class="md:col-span-1">
                                    <div class="text-left">
                                        <div v-for="(contactData, index) in UserDataprofile_identity"
                                            :key="contactData._id" class="ml-3">
                                            <h5 class="font-bold text-xl mb-2">Documents List: {{ index + 1 }}</h5>
                                            <h5 class="text-lg">Documents : {{ contactData.Custom_document }}</h5>
                                            <h5 class="text-lg">Uploaded Documents Download</h5>
                                            <button class="w-50 text-white mt-3 bg-sky-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            @click="handleDownload(contactData.Attachments)"
                                            >
                                                Download
                                            </button>
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
                                                    class="emp-special-head">Custom Document</span></p>
                                            <input class="address-data border-2" v-model="formdata.Custom_document" />
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="1">
                                        <div class="form-group mb-4">
                                            <p class="input-form-label mb-2"><span class="emp-special-head">Attachments</span></p>
                                            <input type="file" class="address-data border-2" @change="handleFileChange"/>
                                        </div>
                                    </div>
                                    <div class="inner-wrapper opaque" tabindex="5">
                                        <button v-if="EditShow == true" type="submit"
                                            class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            Save Data
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
                <form class="p-4 md:p-5" @submit.prevent="updatedependant(UserDataprofile_identity._id)">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custom Document</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name" v-model="UserDataprofile_identity.Custom_document" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attachments</label>
                            <input type="file" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name" @change="handleFileChange">
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

<style></style>