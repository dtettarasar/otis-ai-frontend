<template>

    
    <div>
        <h2>{{ username }} is connected to the View Article page</h2>
    </div>
    
    <div v-if="articleSlug">
        <ArticleViewer :articleSlug="articleSlug"></ArticleViewer>
    </div>

    <div v-else>

        <p>No article selected. Please choose an article to view its content.</p>

    </div>

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

            articleId() {
                return this.$route.params.id;
            },

            articleSlug() {
                return this.$route.params.slug;
            }

        },

        mounted() {

            if(this.articleSlug) {

                console.log("article slug parameter from ViewArticleContent component: ");
                console.log(this.articleSlug);

            }

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }
    }

</script>