<template>

    <p>This is the KeywordsList component</p>

</template>

<script>

    import {mapGetters} from 'vuex';
    import { toRaw } from 'vue';

    export default {

        name: 'KeywordsList',

        props: {
            articleId: {
                type: String,
                required: true
            }
        },

        data() {

            return {

                keywordArr: [],

            }

        },

        computed: {

            ...mapGetters({
              getArticleById: 'getArticleById'
            }),

            articleFromStore() {
                return this.getArticleById(this.articleId);
            },

        },

        mounted() {

            if (this.articleId) {

                console.log('article ID passed as props in KeywordList Component:');
                console.log(this.articleId);

                if (this.articleFromStore) {

                    this.keywordArr = this.articleFromStore.keywordArr;
                    console.log(toRaw(this.keywordArr));

                } else {

                    console.log('id not in the store');

                }

            }

        }

    }

</script>