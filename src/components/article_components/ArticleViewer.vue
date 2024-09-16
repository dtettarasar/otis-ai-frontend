<template>

    <h3>This is the Article Viewer component</h3>

</template>

<script>

    import {mapState, mapGetters} from 'vuex';
    import { toRaw } from 'vue';

    export default {

        name: 'ArticleViewer',

        props: {
            articleId: {
                type: String,
                required: true
            }
        },

        computed: {

            ...mapState(['articleDataList']),

            ...mapGetters({
              getArticleById: 'getArticleById'
            }),

            articleFromStore() {
                return this.getArticleById(this.articleId);
            },

        },

        mounted() {

            if (this.articleId) {

                console.log('article ID passed as props in ArticleViewer Component:');
                console.log(this.articleId);

                console.log("articleFromStore");
                console.log(toRaw(this.articleFromStore));

                /*
                console.log("all article data list: ");
                console.log(toRaw(this.articleDataList));
                */

            }

        },

    }

</script>