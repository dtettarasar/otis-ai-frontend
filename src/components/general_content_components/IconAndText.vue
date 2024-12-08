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
        iconColor: {
            type: String,
            default: '#000', // Couleur par défaut (la même que dans le CSS)
        },
        textColor: {
            type: String,
            default: '#000', // Couleur par défaut (la même que dans le CSS)
        },
    })

</script>

<template>
    <div class="d-flex align-items-center flex-column icon-text-component">

        <div>
            <!-- Classe dynamique pour l'icône -->
            <i :class="[iconClass]" :style="{ color: iconColor }"></i>
        </div>

        <div>
            <p :style="{color: textColor}">{{textContent}}</p>
        </div>

    </div>
</template>

<style>

    .icon-text-component i {
        font-size: 4rem;
    }

    .icon-text-component p {
        font-size: 1.2rem;
    }

</style>