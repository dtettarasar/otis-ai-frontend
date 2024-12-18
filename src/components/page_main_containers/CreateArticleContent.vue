<template>

    <PageBanner title="Create your article" iconClass="bi-pen-fill"></PageBanner>

    <div class="container">

        <div class="row">
            <ArticleGeneratorForm></ArticleGeneratorForm>
        </div>

    </div>
    

</template>

<script>


    import { mapState } from 'vuex';
    import ArticleGeneratorForm from '@/components/forms/ArticleGeneratorForm.vue';
    import PageBanner from '@/components/general_content_components/PageBanner.vue';

    export default {
        name: 'CreateArticleContent.vue',

        components: {
            ArticleGeneratorForm,
            PageBanner
        },

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['username']),

        },

        mounted() {

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }
    }

</script>