<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../commanComponent/Navbar.vue';
import Sidebar from '../commanComponent/Sidebar.vue';
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
          <div class="mx-60 my-5">
            <table class="table-auto w-full">
              <thead>
                <tr class="bg-violet-500">
                  <th class="px-4 text-white py-2">Mandatory Holiday’s Name</th>
                  <th class="px-4 text-white  py-2">Holiday’s Date</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Makar Sankranti</td>
                  <td class="border px-4 py-2 text-center">15-01-2024</td>
                </tr>
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Republic Day</td>
                  <td class="border px-4 py-2 text-center">26-01-2024</td>
                </tr>
                <!-- Add more static data rows below -->
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Dhuleti</td>
                  <td class="border px-4 py-2 text-center">25-03-2024</td>
                </tr>
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Independence day</td>
                  <td class="border px-4 py-2 text-center">15-08-2024</td>
                </tr>
                <!-- Add more static data rows below -->
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Raksha Bandhan</td>
                  <td class="border px-4 py-2 text-center">19-08-2024</td>
                </tr>
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Janmashtami</td>
                  <td class="border px-4 py-2 text-center">26-08-2024</td>
                </tr>
                <!-- Add more static data rows below -->
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Ganesh Visarjan</td>
                  <td class="border px-4 py-2 text-center">17-09-2024</td>
                </tr>
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Diwali</td>
                  <td class="border px-4 py-2 text-center">31-10-2024</td>
                </tr>
                <!-- Add more static data rows below -->
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">New Year</td>
                  <td class="border px-4 py-2 text-center">01-11-2024</td>
                </tr>
                <tr class="hover:bg-gray-100">
                  <td class="border px-4 py-2">Bhai Dooj</td>
                  <td class="border px-4 py-2 text-center">02-11-2024</td>
                </tr>
                <!-- Add more static data rows below -->
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
