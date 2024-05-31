<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import useprotect from '@/composables/ProtectiveRoute';
import { onMounted } from 'vue';

const { protectiveFun } = useprotect();
onMounted(() => {
  protectiveFun()
});
</script>
