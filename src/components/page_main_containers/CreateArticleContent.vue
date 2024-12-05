<template>

    
    <div>
        <h2>{{ username }} is connected to the Create Article page</h2>
    </div>

    <ArticleGeneratorForm></ArticleGeneratorForm>
    

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