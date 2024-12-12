<script setup>

    import { onMounted } from 'vue';
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';

    const props = defineProps({

        src: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            default: 'video/mp4',
        },

        autoplay: {
            type: Boolean,
            default: false,
        },
        loop: {
            type: Boolean,
            default: false,
        },
        muted: {
            type: Boolean,
            default: true, // Désactivé par défaut
        },
        poster: {
            type: String,
            default: '',
        },

    });

    let videoPlayer;

    onMounted(() => {

        videoPlayer = videojs(document.getElementById('my-video'), {

            controls: true,
            autoplay: false,
            preload: 'auto',

        });

    });

</script>

<template>
  <video
    id="my-video"
    class="video-js"
    controls
    preload="auto"
    :data-setup="{}"
    :autoplay="autoplay" 
    :loop="loop" 
    :muted="muted" 
    :poster="poster"
  >
    <source :src="src" :type="type" />
  </video>
</template>

<style>
.video-js {
  width: 100%;
  height: 400px;
}
</style>
