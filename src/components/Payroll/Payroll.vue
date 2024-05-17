

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
          <div>
          <h1>Payroll</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

