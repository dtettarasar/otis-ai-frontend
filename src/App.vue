<script setup>
import { RouterView } from 'vue-router';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar></NavBar>
    </div>
  </header>

  <div id="inner-content" class="container-fluid">
    <RouterView />
  </div>

  <Footer></Footer>
</template>

<style>

#inner-content {
  margin-top: 40px;
}

nav a {
  margin: 5px;
}

/* code couleur */

.blue-background {
    background-color: #2575fc;
}

.blue-text {
  color: #2575fc;
}

.violet-text {
  color: #6a11cb;
}

.pink-text {
  color: #ff0080;
}

/* fin code couleur */

</style>
