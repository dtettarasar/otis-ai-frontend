<template>

    
    <div>
        <h2>{{ username }} is connected to the View Article page</h2>
    </div>
    
    <ArticleViewer articleId="testID"></ArticleViewer>

</template>

<script>

    import { mapState } from 'vuex';

    import ArticleViewer from '@/components/article_components/ArticleViewer.vue';

    export default {
        name: 'ViewArticleContent.vue',

        components: {
            ArticleViewer
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