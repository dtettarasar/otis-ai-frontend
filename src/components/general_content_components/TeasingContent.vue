<script setup>

    import IconAndTextHorizontal from './IconAndTextHorizontal.vue';

    // Tableau avec les données pour chaque itération
    const howToUseData = [
        { textContent: '<p>This <strong>is</strong> a star icon</p>', iconColor: "#c0392b", textColor: "#8e44ad" },
        { iconClass: 'bi-2-circle-fill', iconColor: "#d35400", textColor: "#8e44ad" },
        { iconClass: 'bi-3-circle-fill', textContent: 'This is a lightning icon', iconColor: "#f39c12" },
    ];

</script>

<template>

    <div class="mt-5">
        
        <h2>Otis AI is still in development</h2>

        <div>
            <p>
                This is an early build of Otis AI. Right now the only feature available is the article generation based on a prompt and keywords. Otis AI is meant to evolve and offer more exciting features.
            </p>
        </div>

        <div class="d-flex flex-column flex-wrap">

            <!-- Boucle sur les items -->
            <IconAndTextHorizontal v-for="(item, index) in howToUseData" 
                :key="index"
                :iconClass="item.iconClass"
                :textContent="item.textContent"
                :iconColor="item.iconColor"
                :textColor="item.textColor"
            ></IconAndTextHorizontal>

        </div>

    </div>

</template>