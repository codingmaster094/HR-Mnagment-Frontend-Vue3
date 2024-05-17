<script setup>
import { ref, onMounted, reactive } from 'vue';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
import useUser from "../../composables/userApi.js";
import UserImage from "../Profile/UserImage.vue";
import BankDetails from "../Profile/BankDetails.vue";
import About from "../Profile/Personal Data/About.vue";
import Address from "../Profile/Personal Data/Address.vue";
import Contact from "../Profile/Personal Data/Contact.vue";
import Biodata from "../Profile/Personal Data/Biodata.vue";
import ImportantDates from "../Profile/Personal Data/ImportantDates.vue";
import Dependency from './Personal Data/Dependency.vue';
import Work_details from './work Profile/Work_details.vue';
import Reporting from './work Profile/Reporting.vue';
import Current_experience from './work Profile/Current_experience.vue';
import Past_experience from './work Profile/Past_experience.vue';
import Identity from '../Profile/Documents Data/Identity.vue';
import Others from '../Profile/Documents Data/Others.vue';

const activeTab = ref(0);
const activateTab = (index) => {
  activeTab.value = index;
};

const activeTab1 = ref(0);
const setActiveTab = (tabIndex) => {
  activeTab1.value = tabIndex;
};
const activeTab2 = ref(0);
const setActiveTab2 = (tabIndex) => {
  activeTab2.value = tabIndex;
};

const activeTab3 = ref(0);
const setActiveTab3 = (tabIndex) => {
  activeTab3.value = tabIndex;
};
</script>

<template>
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
        <div>
          <div class="container md:mx-auto px-12 mt-4">
            <div class="rounded-md shadow-md">
              <UserImage />
            </div>
          </div>


          <!--  Bank Details  -->
          <div class="container md:mx-auto px-12 mt-5">
            <div class="rounded-md shadow-md">
              <BankDetails />
            </div>
          </div>

          <!-- Personal Detals  -->
          <div class="container mx-auto px-12 mt-4">
            <div class="rounded border w-full mx-auto mt-4">
              <!-- tabs -->
              <ul class="inline-flex pt-2 px-1 w-full border-b">
                <li
                  :class="['px-4 text-gray-800 font-semibold py-2 rounded-t', { 'border-violet-700  border-t border-r border-l -mb-px': activeTab === 0 }]">
                  <a @click="activateTab(0)" href="#">PERSONAL DATA</a>
                </li>
                <li
                  :class="['px-4 text-gray-800 font-semibold py-2 rounded-t', { 'border-violet-700  border-t border-r border-l -mb-px': activeTab === 1 }]">
                  <a @click="activateTab(1)" href="#">WORK PROFILE</a>
                </li>
                <li
                  :class="['px-4 text-gray-800 font-semibold py-2 rounded-t', { 'border-violet-700  border-t border-r border-l -mb-px': activeTab === 2 }]">
                  <a @click="activateTab(2)" href="#">DOCUMENTS</a>
                </li>
              </ul>

              <!-- Tab Contents -->

              <div id="tab-contents">
                <!-- About Tab -->
                <div id="tab-1" class="p-4" v-show="activeTab === 0">
                  <div class="flex">
                    <!-- Sidebar with tab buttons -->
                    <div class="w-72 border-r cursor-pointer">
                      <div class="overflow-hidden">
                        <div role="tablist" class="flex flex-col">
                          <button @click="setActiveTab(0)" :class="{ ' bg-violet-500 text-white': activeTab1 === 0 }"
                            class="py-2 px-4 font-semibold border-b flex justify-center gap-2" role="tab"
                            aria-selected="true">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                              </svg>
                            </span>
                            <span>
                              About
                            </span>
                          </button>
                          <!-- Address Tab Button -->
                          <button @click="setActiveTab(1)" :class="{ ' bg-violet-500 text-white': activeTab1 === 1 }"
                            class="py-2 px-4 font-semibold border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                            </span>
                            <span>
                              Address
                            </span>
                          </button>
                          <!-- Contact Tab Button -->
                          <button @click="setActiveTab(2)" :class="{ ' bg-violet-500 text-white': activeTab1 === 2 }"
                            class="py-2 px-4 font-semibold border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                              </svg>
                            </span>
                            <span>
                              Contact
                            </span>
                          </button>
                          <!-- Biodata Tab Button -->
                          <button @click="setActiveTab(3)" :class="{ ' bg-violet-500 text-white': activeTab1 === 3 }"
                            class="py-2 px-4 font-semibold border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                              </svg>
                            </span>
                            <span>
                              Biodata
                            </span>
                            </button>
                          <!-- Important Dates Tab Button -->
                          <button @click="setActiveTab(4)" :class="{ ' bg-violet-500 text-white': activeTab1 === 4 }"
                            class="py-2 px-4 font-semibold border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                              </svg>
                            </span>
                            <span>
                              Important Dates
                            </span>
                            </button>
                          <!-- Dependents Tab Button -->
                          <button @click="setActiveTab(5)" :class="{ ' bg-violet-500 text-white': activeTab1 === 5 }"
                            class="py-2 px-4 font-semibold border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                              </svg>
                            </span>
                            <span>
                              Dependents
                            </span>
                            </button>
                        </div>
                      </div>
                    </div>

                    <div class="ml-4 w-full">
                      <!-- About Tab Content -->
                      <div id="tab-contents">
                        <div class="verticaltab-innercont reletive" v-show="activeTab1 === 0">
                          <About />
                        </div>

                        <!-- Address Tab Content -->
                        <div class="verticaltab-innercont reletive" v-show="activeTab1 === 1">
                          <div>
                            <Address />
                          </div>
                        </div>

                        <!-- Contact Tab Content -->
                        <div class="verticaltab-innercont" v-show="activeTab1 === 2">
                          <div>
                            <Contact />
                          </div>
                        </div>
                        <!-- Biodata Tab Content -->
                        <div class="verticaltab-innercont reletive" v-show="activeTab1 === 3">
                          <div>
                            <Biodata />
                          </div>
                        </div>
                        <!-- Important Dates Tab Content -->
                        <div class="verticaltab-innercont reletive" v-show="activeTab1 === 4">
                          <div>
                            <ImportantDates />
                          </div>
                        </div>
                        <!-- Dependents Tab Content -->
                        <div class="verticaltab-innercont" v-show="activeTab1 === 5">
                          <Dependency />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div id="tab-2" class="p-4" v-show="activeTab === 1">
                  <div class="flex">
                    <!-- Tabs -->
                    <div class="w-72 border-r">
                      <div class="overflow-hidden">
                        <div role="tablist" class="flex flex-col">
                          <button @click="setActiveTab2(0)" :class="{ 'bg-violet-500 text-white': activeTab2 === 0 }"
                            class="py-2 px-4 font-semibold text-gray-800 border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                              stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                            Work Details</button>
                          <button @click="setActiveTab2(1)" :class="{ 'bg-violet-500 text-white': activeTab2 === 1 }"
                            class="py-2 px-4 font-semibold text-gray-800 border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                              stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                            </svg>

                            Reporting Office</button>
                          <button @click="setActiveTab2(2)" :class="{ 'bg-violet-500 text-white': activeTab2 === 2 }"
                            class="py-2 px-4 font-semibold text-gray-800 border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                              class="w-5 h-5">
                              <path
                                d="M7.702 1.368a.75.75 0 0 1 .597 0c2.098.91 4.105 1.99 6.004 3.223a.75.75 0 0 1-.194 1.348A34.27 34.27 0 0 0 8.341 8.25a.75.75 0 0 1-.682 0c-.625-.32-1.262-.62-1.909-.901v-.542a36.878 36.878 0 0 1 2.568-1.33.75.75 0 0 0-.636-1.357 38.39 38.39 0 0 0-3.06 1.605.75.75 0 0 0-.372.648v.365c-.773-.294-1.56-.56-2.359-.8a.75.75 0 0 1-.194-1.347 40.901 40.901 0 0 1 6.005-3.223ZM4.25 8.348c-.53-.212-1.067-.411-1.611-.596a40.973 40.973 0 0 0-.418 2.97.75.75 0 0 0 .474.776c.175.068.35.138.524.21a5.544 5.544 0 0 1-.58.681.75.75 0 1 0 1.06 1.06c.35-.349.655-.726.915-1.124a29.282 29.282 0 0 0-1.395-.617A5.483 5.483 0 0 0 4.25 8.5v-.152Z" />
                              <path
                                d="M7.603 13.96c-.96-.6-1.958-1.147-2.989-1.635a6.981 6.981 0 0 0 1.12-3.341c.419.192.834.393 1.244.602a2.25 2.25 0 0 0 2.045 0 32.787 32.787 0 0 1 4.338-1.834c.175.978.315 1.969.419 2.97a.75.75 0 0 1-.474.776 29.385 29.385 0 0 0-4.909 2.461.75.75 0 0 1-.794 0Z" />
                            </svg>

                            Current Experience</button>
                          <button @click="setActiveTab2(3)" :class="{ 'bg-violet-500 text-white': activeTab2 === 3 }"
                            class="py-2 px-4 font-semibold text-gray-800 border-b flex justify-center gap-2" role="tab"
                            aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                              class="w-5 h-5">
                              <path fill-rule="evenodd"
                                d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937v-2.523a2.5 2.5 0 0 0-.732-1.768L8.354 5.232A2.5 2.5 0 0 0 6.586 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
                                clip-rule="evenodd" />
                              <path
                                d="M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-3.586a1 1 0 0 0-.293-.707L7.293 6.293A1 1 0 0 0 6.586 6H3Z" />
                            </svg>

                            Past Experience</button>
                        </div>
                      </div>
                    </div>

                    <!-- Vertical line -->
                    <div class="w-px bg-gray-400"></div>
                    <!-- Content -->
                    <div class="flex-1 overflow-auto">
                      <div class="verticaltab-innercont" v-show="activeTab2 === 0">
                        <div>
                          <Work_details />
                        </div>
                      </div>
                      <div class="verticaltab-innercont" v-show="activeTab2 === 1">
                        <div>
                          <Reporting />
                        </div>
                      </div>
                      <!-- Contact Tab Content -->
                      <div class="verticaltab-innercont" v-show="activeTab2 === 2">
                        <div>
                          <Current_experience />
                        </div>
                      </div>
                      <!-- Biodata Tab Content -->
                      <div class="verticaltab-innercont" v-show="activeTab2 === 3">
                        <div>
                          <Past_experience />
                        </div>
                      </div>
                      <!-- Important Dates Tab Content -->

                    </div>
                  </div>
                </div>


                <div id="tab-3" class="p-4" v-show="activeTab === 2">
                  <div class="flex">
                    <div class="w-72 border-r">
                      <div class="overflow-hidden">
                        <div role="tablist" class="flex flex-col">
                          <button class="py-2 px-4 font-semibold text-gray-800 border-b" role="tab"
                            aria-selected="true" @click="setActiveTab3(0)" :class="{ 'bg-violet-500 text-white': activeTab3 === 0 }">
                            <span class="flex items-center flex justify-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="w-5 h-5">
                                <path fill-rule="evenodd"
                                  d="M3 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H3Zm2.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM10 5.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm.75 3.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM10 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 10 8Zm-2.378 3c.346 0 .583-.343.395-.633A2.998 2.998 0 0 0 5.5 9a2.998 2.998 0 0 0-2.517 1.367c-.188.29.05.633.395.633h4.244Z"
                                  clip-rule="evenodd" />
                              </svg>
                              Identity
                            </span>
                          </button>
                          <button class="py-2 px-4 font-semibold text-gray-800 border-b" role="tab"
                            aria-selected="false" @click="setActiveTab3(1)" :class="{ 'bg-violet-500 text-white': activeTab3 === 1 }">
                            <span class="flex items-center flex justify-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="w-5 h-5">
                                <path
                                  d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                                <path
                                  d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                              </svg>

                              Other
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Vertical line -->
                    <div class="w-px bg-gray-400"></div>

                    <!-- Content -->
                    <div class="flex-1 overflow-auto">
                      <div class="verticaltab-innercont" v-show="activeTab3 === 0">
                        <div>
                          <div>
                            <Identity/>
                          </div>
                        </div>
                      </div>
                      <div class="verticaltab-innercont" v-show="activeTab3 === 1">
                        <div>
                          <div>
                            <Others/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
.About {
  position: relative;
  width: 100%
}

.biodata-edit-btn {
  position: absolute;
  top: 10px;
  right: 20px
}

.biodata-delete-btn {
  position: absolute;
  top: 65px;
  right: 10px
}

.biodata-edit-btn {
  position: absolute;
  top: 10px;
  right: 20px
}

.reletive {
  position: relative;
}
</style>
