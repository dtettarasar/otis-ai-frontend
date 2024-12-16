<script setup>

import { onMounted, computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const userLoggedIn = computed(() => store.state.userLoggedIn);


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

      <router-link to="/article" v-if="userLoggedIn" class="btn btn-primary btn-lg px-4" type="button">
        <i class="bi bi-lightning-fill"></i> Let’s get writing – Generate an article!
      </router-link>

      <router-link to="/register" v-if="!userLoggedIn" class="btn btn-primary btn-lg px-4" type="button">
        <i class="bi bi-person-lines-fill"></i> Sign up now and start creating amazing content!
      </router-link>

    </div>

  </div>

</div>

</template>

<style>

.main-icon {
  font-size: 3rem;
}

</style>
