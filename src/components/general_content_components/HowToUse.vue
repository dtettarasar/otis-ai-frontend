<script setup>

    import IconAndText from './IconAndText.vue';

    // Tableau avec les données pour chaque itération
    const howToUseData = [
        { iconClass: 'bi bi-star', textContent: 'This is a star icon', iconColor: "#c0392b", textColor: "#8e44ad" },
        { iconClass: 'bi bi-heart', textContent: 'This is a heart icon', iconColor: "#d35400", textColor: "#8e44ad" },
        { iconClass: 'bi bi-lightning', textContent: 'This is a lightning icon', iconColor: "#f39c12" },
    ];

</script>

<template>

    <div class="mt-5">
        
        <h2>How to use Otis AI</h2>

        <div>
            <p>
                Build your first articles, by following the steps below:
            </p>
        </div>

        <div class="d-flex flex-row justify-content-evenly flex-wrap">

            <!-- Boucle sur les items -->
            <IconAndText v-for="(item, index) in howToUseData" 
                :key="index"
                :iconClass="item.iconClass"
                :textContent="item.textContent"
                :iconColor="item.iconColor"
                :textColor="item.textColor"
            ></IconAndText>

        </div>
        

    </div>

</template>