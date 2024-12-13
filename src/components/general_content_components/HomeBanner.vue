<script setup>

import { ref, onMounted } from 'vue'

// lifecycle hooks
onMounted(() => {
  console.log(`the home header component is now mounted`);
})

</script>

<template>

<div class="container-fluid my-5">

  <div class="p-5 text-center bg-body-tertiary rounded-3">

    <i class="main-icon bi bi-feather"></i>
    <h1 class="text-body-emphasis">Otis AI</h1>
    <p class="col-lg-8 mx-auto fs-5 text-muted">
      Your Digital Scribe for SEO-Ready Brilliance
    </p>

    <div class="d-flex justify-content-center flex-row flex-wrap gap-2">

      <button class="btn btn-primary btn-lg px-4" type="button">
        Call to action
      </button>

      <button class="btn btn-outline-secondary btn-lg px-4" type="button">
        Secondary link
      </button>

    </div>

  </div>

</div>

</template>

<style>

.main-icon {
  font-size: 3rem;
}

</style>
