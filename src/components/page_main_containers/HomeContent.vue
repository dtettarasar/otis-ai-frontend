<script setup>

    import HomeBanner from '../general_content_components/HomeBanner.vue';
    import PresentingContent from '../general_content_components/PresentingContent.vue';
    import HowToUse from '../general_content_components/HowToUse.vue';
    import TeasingContent from '../general_content_components/TeasingContent.vue';

</script>

<template>

    <HomeBanner></HomeBanner>

    <div class="container">

        <PresentingContent></PresentingContent>

        <hr class="solid">

        <HowToUse></HowToUse>

        <hr class="solid">

        <TeasingContent></TeasingContent>

    </div>

</template>