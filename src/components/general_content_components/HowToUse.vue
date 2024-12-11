<script setup>

    import IconAndTextVertical from './IconAndTextVertical.vue';

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

        <!--
        <div class="d-flex flex-row justify-content-evenly flex-wrap">

            <IconAndTextVertical v-for="(item, index) in howToUseData" 
                :key="index"
                :iconClass="item.iconClass"
                :textContent="item.textContent"
                :iconColor="item.iconColor"
                :textColor="item.textColor"
            ></IconAndTextVertical>

        </div>
        -->

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="describe-tab" data-bs-toggle="tab" data-bs-target="#describe" type="button" role="tab" aria-controls="describe" aria-selected="true">Describe</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#generate" type="button" role="tab" aria-controls="generate" aria-selected="false">Generate</button>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="describe" role="tabpanel" aria-labelledby="home-tab">Describe content</div>
            <div class="tab-pane fade" id="generate" role="tabpanel" aria-labelledby="profile-tab">Generate content</div>
        </div>

    </div>

</template>