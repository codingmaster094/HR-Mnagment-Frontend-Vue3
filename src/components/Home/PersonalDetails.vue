<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import useUser from '@/composables/createUserApi.js'
import { onMounted, reactive } from 'vue';

const router = useRouter()
const { UserData, ErrorMessage, statusCode, AllUserGet,
    createUserAbout,
    createUserBiodata,
    createUserImportantdates,
    createUserworkdetails,
    createUserreportingoffice,
    createUsercurrentexperience
} = useUser();

const userAboutFormData = reactive({
    user_id: "",
    Salutation: "",
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
    Preferred_Name: "",
    About_Yourself: "",
});

const userbiodataFormData = reactive({
    user_id: "",
    Gender: "",
    Blood_Group: "",
    Gender_pronoun: "",
    Challenged: "",
    Marital_status: "",
    Your_spouse_partners_name: "",
});

const userImportantDatesFormData = reactive({
    user_id: "",
    Birth_date: "",
    partner_birth_date: "",
    Marriage_anniversary: ""
});

const userworkdetailsFormData = reactive({
    user_id: "",
    DOJ: "",
    Employment_Stage: "",
    Employment_Type: "",
    Employment_Grade: "",
    Self_Service: "",
    Probation_End_Date: "",
    Date_of_Confirmation: "",
    Notice_period_start_date: "",
    Exit_date: ""
});

const userreportingofficeFormData = reactive({
    user_id: "",
    reporting_office: ""
});

const usercurrentexperienceFormData = reactive({
    user_id: "",
    disignation: "",
    company: "",
    DOJ: ""
});

const handleSelectUser = (e) => {
    const selectedUserId = e.target.value;
    userAboutFormData.user_id = selectedUserId;
    userbiodataFormData.user_id = selectedUserId;
    userImportantDatesFormData.user_id = selectedUserId;
    userworkdetailsFormData.user_id = selectedUserId;
    userreportingofficeFormData.user_id = selectedUserId;
    usercurrentexperienceFormData.user_id = selectedUserId;
}

const handlepersonalData = async () => {
    await createUserAbout(userAboutFormData);
    await createUserBiodata(userbiodataFormData);
    await createUserImportantdates(userImportantDatesFormData);
    await createUserworkdetails(userworkdetailsFormData);
    await createUserreportingoffice(userreportingofficeFormData);
    await createUsercurrentexperience(usercurrentexperienceFormData);
    router.push('/home')
};

onMounted(AllUserGet);
</script>

<template>
    <div>
        <div>
            <div class="flex h-screen">
                <!-- sidebar -->
                <div class="flex flex-col w-64 bg-stone-50">
                    <Sidebar />
                </div>
                <!-- Main content -->
                <div class="flex flex-col flex-1 overflow-y-auto">
                    <div class="flex items-center justify-end px-10 h-16 bg-white border-b border-gray-200">
                        <Navbar />
                    </div>
                    <form class="pt-20 px-20 w-94 " @submit.prevent="handlepersonalData">
                        <h1 class="text-lg mb-5 text-red-800 mb-3">First do created user Account then add personal data
                        </h1>
                        <div class="m-2 w-1/3 mb-6">
                            <label for="name" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                                User</label>
                            <select
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                @change="handleSelectUser" required>
                                <option value="">Select User</option>
                                <option v-for="user in UserData" :key="user._id" :value="user._id">{{ user.name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-5">
                            <h1 class="text-lg text-red-800">1. About Details</h1>
                            <div class="flex flex-wrap m-2">
                                <div class="m-2 w-1/3">
                                    <label for="Salutation"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Salutation</label>
                                    <input type="text" id="Salutation"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userAboutFormData.Salutation" required />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="First_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                        Name</label>
                                    <input type="text" id="First_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userAboutFormData.First_Name" required />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Middle_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle
                                        Name</label>
                                    <input type="text" id="Middle_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userAboutFormData.Middle_Name" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Last_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input type="text" id="Last_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userAboutFormData.Last_Name" required />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Preferred_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Preferred
                                        Name</label>
                                    <input type="text" id="Preferred_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userAboutFormData.Preferred_Name" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="About_Yourself"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">About
                                        Yourself</label>
                                    <input type="text" id="About_Yourself"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userAboutFormData.About_Yourself" />
                                </div>
                            </div>
                        </div>


                        <div class="mb-5">
                            <h1 class="text-lg text-red-800">2 . BioData Details</h1>
                            <div class="flex flex-wrap m-2">
                                <div class="m-2 w-1/3">
                                    <label for="Salutation"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                    <select
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userbiodataFormData.Gender" required>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="First_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood
                                        Group</label>
                                    <input type="text" id="First_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userbiodataFormData.Blood_Group" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Middle_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender
                                        pronoun</label>
                                    <input type="text" id="Middle_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userbiodataFormData.Gender_pronoun" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Last_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Challenged</label>
                                    <input type="text" id="Last_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userbiodataFormData.Challenged" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Preferred_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Marital
                                        status</label>
                                    <input type="text" id="Preferred_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userbiodataFormData.Marital_status" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="About_Yourself"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Your spouse
                                        partners
                                        name</label>
                                    <input type="text" id="About_Yourself"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userbiodataFormData.Your_spouse_partners_name" />
                                </div>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h1 class="text-lg text-red-800">3 . Importantce Dates</h1>
                            <div class="flex flex-wrap m-2">
                                <div class="m-2 w-1/3">
                                    <label for="First_Name"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth
                                        date</label>
                                    <input type="date" id="First_Name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userImportantDatesFormData.Birth_date" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="partner_birth_date"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">partner birth
                                        Date</label>
                                    <input type="date" id="partner_birth_date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userImportantDatesFormData.partner_birth_date" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Marriage_anniversary"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Marriage
                                        Anniversary</label>
                                    <input type="date" id="Marriage_anniversary"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userImportantDatesFormData.Marriage_anniversary" />
                                </div>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h1 class="text-lg text-red-800">4 . Work Details</h1>
                            <div class="flex flex-wrap m-2">
                                <div class="m-2 w-1/3">
                                    <label for="DOJ"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">DOJ</label>
                                    <input type="date" id="DOJ"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.DOJ" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Employment Stage"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Employment
                                        Stage</label>
                                    <input type="text" id="Employment Stage"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.Employment_Stage" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Employment_Type"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Employment
                                        Type</label>
                                    <input type="text" id="Employment_Type"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.Employment_Type" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Employment_Grade"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Employment
                                        Grade</label>
                                    <input type="text" id="Employment_Grade"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.Employment_Grade" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Self_Service"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Self
                                        Service</label>
                                    <input type="text" id="Self_Service"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.Self_Service" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Probation_End_Date"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Probation End
                                        Date</label>
                                    <input type="date" id="Probation_End_Date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.Probation_End_Date" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Date_of_Confirmation"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of
                                        Confirmation</label>
                                    <input type="date" id="Date_of_Confirmation"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.Date_of_Confirmation" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Notice_period_start_date"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Notice period
                                        start
                                        date</label>
                                    <input type="date" id="Notice_period_start_date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.Notice_period_start_date" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="Exit_date"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Exit Date</label>
                                    <input type="date" id="Exit_date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userworkdetailsFormData.Exit_date" />
                                </div>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h1 class="text-lg text-red-800">5 . Reporting Address</h1>
                            <div class="flex flex-wrap m-2">
                                <div class="m-2 w-1/3">
                                    <label for="reporting_office"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">reporting
                                        office</label>
                                    <input type="text" id="reporting_office"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="userreportingofficeFormData.reporting_office" />
                                </div>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h1 class="text-lg text-red-800">6 . Current Experience</h1>
                            <div class="flex flex-wrap m-2">
                                <div class="m-2 w-1/3">
                                    <label for="disignation"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Disignation</label>
                                    <input type="text" id="disignation"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="usercurrentexperienceFormData.disignation" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="company"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                                    <input type="text" id="company"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="usercurrentexperienceFormData.company" />
                                </div>
                                <div class="m-2 w-1/3">
                                    <label for="DOJ"
                                        class="mb-2 text-sm font-medium text-gray-900 dark:text-white">DOJ</label>
                                    <input type="date" id="DOJ"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        v-model="usercurrentexperienceFormData.DOJ" />
                                </div>
                            </div>
                        </div>

                        <div class="m-5 w-1/1">
                            <button type="submit"
                                class="text-white bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save
                                All Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>
