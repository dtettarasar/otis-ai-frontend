<template>
  <div class="background-wrapper container-fluid rounded">
    <div id="particles-container">
      <vue-particles id="tsparticles" :options="particlesOptions" />
    </div>
    <div class="content">
      <slot /> <!-- Contenu dynamique -->
    </div>
  </div>
</template>

<script setup>

import { reactive } from "vue";

const particlesOptions = reactive({
  background: {
    color: { value: "#0d47a1" },
  },
  fullScreen: {
    enable: false,
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: { quantity: 4 },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: { density: { enable: true }, value: 80 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 5 } },
  },
  detectRetina: true,
});

</script>

<style scoped>

.background-wrapper {
  position: relative;
  width: 100%;
  height: 600px; /* Hauteur définie, ajustable */
  overflow: hidden;
  display: flex; /* Active Flexbox */
  justify-content: center; /* Centre horizontalement */
  align-items: center; /* Centre verticalement */
}

#particles-container {
  position: absolute; /* Particules couvrent tout l'espace */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Assure que c'est en arrière-plan */
  pointer-events: none; /* Empêche les particules de bloquer les clics */
}

#tsparticles {
  width: 100%;
  height: 100%;
}

#tsparticles canvas {
  width: 100% !important;
}

.content {
  position: relative; /* Flexbox positionne le contenu ici */
  z-index: 10; /* Contenu visible au-dessus des particules */
  text-align: center; /* Texte centré */
  color: white; /* Contraste avec l'arrière-plan */
}

</style>