<script setup>

    // Déclaration des props
    const props = defineProps({
    iconClass: {
        type: String,
        default: 'bi-feather', // Classe par défaut
    },
    textContent: {
        type: String,
        default: 'Text content for the icon', // Texte par défaut
    },
    })

</script>

<template>
    <div class="d-flex align-items-center flex-column icon-text-component">

        <div>
            <!-- Classe dynamique pour l'icône -->
            <i :class="['main-icon', iconClass]"></i>
        </div>

        <div>
            <p>{{textContent}}</p>
        </div>

    </div>
</template>