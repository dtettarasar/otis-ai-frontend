<template>

    <div class="container">

        <div class="row">
            <h2>{{ username }} is connected to the Create Article page</h2>
        </div>

        <div class="row">
            <ArticleGeneratorForm></ArticleGeneratorForm>
        </div>

    </div>
    

</template>

<script>

    import { mapState } from 'vuex';
    import ArticleGeneratorForm from '@/components/forms/ArticleGeneratorForm.vue';

    export default {
        name: 'CreateArticleContent.vue',

        components: {
            ArticleGeneratorForm
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