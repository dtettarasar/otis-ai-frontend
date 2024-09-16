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

        data() {

            return {

                articleObj : {

                    title: '',
                    description: '',
                    keywordArr: [],
                    language: 'en',
                    content: '',
                    creationDate: null,
                    lastModifDate: null,

                },

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
                

                /*
                console.log("all article data list: ");
                console.log(toRaw(this.articleDataList));
                */

                if (this.articleFromStore) {

                    console.log("article is retrieved from the store: ");
                    console.log(toRaw(this.articleFromStore));

                } else {

                    console.log("article id is not valid");

                }

            }

        },

    }

</script>