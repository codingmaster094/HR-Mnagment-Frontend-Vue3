<script setup>
import { onMounted, reactive, ref } from 'vue';
import useUser from "../../composables/userApi.js";
import useUserprofile from "../../composables/profileAPI.js";
const { userLoginData, UserGet } = useUser();
const {
    UserDataprofile_bankDetails,
    ErrorMessageprofile_bankDetails,
    statusCodeprofile_bankDetails,
    create_bankDetails,
    get_bankDetails,
    get_bankDetails_id,
    UpdateUserprofile_bankDetails,
    DeleteUserprofile_bankDetails,
} = useUserprofile();

const showModal = ref(false);
let UserName = null;
onMounted(async () => {
    await UserGet()
    await get_bankDetails()
})
if (userLoginData) {
    try {
        UserName = userLoginData;
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
}

const toggleAddMode = (id) => {
    showModal.value = !showModal.value;
};

const formdata = reactive({
    Bank_Name: "",
    Branch_Name: "",
    Holder_Name: "",
    Account_no: "",
    AccountType: "",
    IFSC: "",
});

const AddBank = () =>{
    create_bankDetails(formdata)
    showModal.value = false
};
 
 console.log('UserDataprofile_bankDetails', UserDataprofile_bankDetails)
</script>
<template>
    <div class="flex flex-wrap items-center" v-if="UserName">
        <div class="w-full md:w-2/5 mb-3 md:mb-0">
            <div class="mb-2">
                <span class="text-lg ml-10 font-semibold">Banking</span>
            </div>
            <div class="mb-2">
                <span class="text-md ml-10">"Boring but critical info. This is where the money goes."</span>
                <div class="text-lg text-green-500 ml-10 flex items-center gap-3" v-for="Bank in UserDataprofile_bankDetails">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm9 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM11.5 6A.75.75 0 1 1 13 6a.75.75 0 0 1-1.5 0Z" clip-rule="evenodd" />
                        <path d="M13 11.75a.75.75 0 0 0-1.5 0v.179c0 .15-.138.28-.306.255A65.277 65.277 0 0 0 1.75 11.5a.75.75 0 0 0 0 1.5c3.135 0 6.215.228 9.227.668A1.764 1.764 0 0 0 13 11.928v-.178Z" />
                        </svg>
                    </div>
                    <div>
                        {{ Bank.Bank_Name }}
                    </div>
                </div>
            </div>
            <div class="mb-2 ml-10">
                <button type="button"
                    class="w-50 text-white bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    @click="toggleAddMode">Add
                    Bank</button>
            </div>
        </div>
        <!-- Image column (20%) -->
        <div class="w-full md:w-2/5 text-center mb-4 md:mb-0 relative">
            <img src="../../assets/bank.svg" class="rounded-full w-56 h-56 mx-auto mb-2 image" />
        </div>

        <!-- Modal -->

        <div v-if="showModal"
            class="fixed z-10 inset-0 overflow-y-auto overflow-x-hidden flex justify-center items-center bg-black bg-opacity-50">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Banking details
                        </h3>
                    </div>
                    <!-- Modal body -->
                    <form class="p-4 md:p-5" @submit.prevent="AddBank">
                        <div class="grid gap-4 mb-4 grid-cols-2">
                            <div class="col-span-2">
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank
                                    Name</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name" v-model="formdata.Bank_Name" required="">
                            </div>
                            <div class="col-span-2">
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Branch
                                    Name</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name" v-model="formdata.Branch_Name" required="">
                            </div>
                            <div class="col-span-2">
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Holder
                                    Name</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name" v-model="formdata.Holder_Name" required="">
                            </div>
                            <div class="col-span-2">
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account
                                    Number</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name" v-model="formdata.Account_no" required="">
                            </div>
                            <div class="col-span-2">
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">AccountType</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name" v-model="formdata.AccountType" required="">
                            </div>
                            <div class="col-span-2">
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IFSC
                                    code</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name" v-model="formdata.IFSC" required="">
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
        </div>
        <!-- 
  <div>
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
        <p class="mt-4 text-gray-600">Let's get you back <a href="/attendance" class="text-blue-500">home</a>.</p>
    </div>
</div>
    </div>

     -->
</template>

<style></style>