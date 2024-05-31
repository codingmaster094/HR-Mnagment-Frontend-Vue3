<script setup>
import { ref, onMounted, reactive } from 'vue';
import useUser from "../../composables/userApi.js";
import { BriefcaseIcon, PhoneIcon } from '@heroicons/vue/solid';
const { UserData, getAlluserData, userLoginData, profileADD, UserGet, AllUserGet } = useUser();

const showModal = ref(false);
const formData = reactive({
    profile_image: null,
});

let UserName = null;
onMounted(async () => {
    await UserGet()
    await AllUserGet()
})
if (userLoginData) {
    try {
        UserName = userLoginData;
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
}

const handleFileChange = async (event) => {
    formData.profile_image = event.target.files[0];
    profileADD(formData)
    await UserGet()
};

const AllDepartment = () => {
    showModal.value = true
};
</script>
<template>
    <div class="flex flex-wrap items-center" v-if="UserName">
        <!-- Image column (20%) -->
        <div class="w-full md:w-1/5 text-center mb-4 md:mb-0 relative">
            <div class="relative" v-if="UserName.profile_image !== null">
                <img v-if="UserName" :src="UserName.profile_image" class="rounded-full w-24 h-24 mx-auto mb-2 image" />
                <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <label for="dropzone-file"
                        class="flex flex-col items-center justify-center rounded-full w-12 h-12 cursor-pointer">
                        <div
                            class="flex flex-col items-center justify-center  bg-blue-800 bg-opacity-100 rounded-full w-12 h-12 cursor-pointer">
                            <svg viewBox="0 0 24 24" class="w-6 h-6 text-white">
                                <path
                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z">
                                </path>
                            </svg>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" @change="handleFileChange" />
                    </label>
                </div>
            </div>
        </div>


        <div class="w-full md:w-3/5 mb-3 md:mb-0">
            <div class="mb-2">
                <span class="text-lg font-semibold">{{ UserName.name }}</span>
                <span class="ml-5 px-4 py-1 rounded-full border border-green-500 text-green-500 text-xs">Current
                    employee</span>
            </div>
            <div class="mb-2 flex gap-8">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 inline-block me-2">
                        <path fill-rule="evenodd"
                            d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm">{{ UserName.designation }}</span>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 inline-block me-2">
                        <path fill-rule="evenodd"
                            d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm">{{ UserName._id }}</span>
                </div>
            </div>
            <div class="mb-2 flex gap-8">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 inline-block me-2">
                        <path fill-rule="evenodd"
                            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm">{{ UserName.mobile_no }}</span>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 inline-block me-2">
                        <path fill-rule="evenodd"
                            d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm">{{ UserName.email }}</span>
                </div>
            </div>
            <div class="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 inline-block me-2">
                    <path
                        d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                </svg>
                <span class="text-sm">IT - Software</span>
            </div>
        </div>
        <div class="w-full md:w-1/5 md:text-right">
            <table class="table mt-0">
                <tr>
                    <td class="pr-4">Manager</td>
                </tr>
                <tr>
                    <td>
                        <div class="mt-1">
                            <span class="text-md text-gray-700">💃 Yay! you are your own boss</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        <button type="button"
                            class="w-50 text-white mt-3 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            @click="AllDepartment">
                            All Department
                        </button>
                    </td>
                </tr>

            </table>
        </div>
    </div>

    <div v-if="showModal"
        class="fixed z-10 inset-0 overflow-y-auto overflow-x-hidden flex justify-end items-center bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Apply Leave
                    </h3>
                </div>
                <!-- Modal body -->
                <div class="w-full" v-for="user in getAlluserData">
                    <div class="flex gap-3 p-3 border-2 ">
                        <div>
                            <div class="text-center relative attendance-reletive mt-2 mb-2"
                                v-if="user.profile_image != null">
                                <img :src="user.profile_image" class="rounded-full w-10 h-10 mr-2" alt="Profile Image">
                            </div>
                            <div class="text-center relative attendance-reletive mt-2 mb-2" v-else>
                                <img src="../../assets/user.png" class="rounded-full w-10 h-10 mr-2" alt="Profile Image">
                            </div>
                        </div>
                        <div>
                           <div>{{ user.name }}</div>
                           <div class="flex items-center" ><BriefcaseIcon class="h-5 w-5 me-2" />{{ user.designation }}</div>
                           <div class="flex items-center" ><PhoneIcon class="h-5 w-5 me-2"/>{{ user.mobile_no }}</div>
                        </div>
                    </div>
                </div>

                <button type="button"
                    class=" mt-3 text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
                    @click="showModal = false">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
<style></style>