<script setup>

import { ref, onMounted } from 'vue'

// lifecycle hooks
onMounted(() => {
  console.log(`the home header component is now mounted`);
})

</script>

<template>

    <h3>This is the home header component</h3>

</template>

