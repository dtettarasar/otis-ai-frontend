<template>

    <h3>This is the Article Viewer component</h3>

    <p> {{ articleFromStore.title }}</p>

    <div class="mt-2 p-5 bg-dark-subtle rounded" >

        <h1>{{ articleFromStore.title }}</h1>

        <p class="fs-5 date-text"><strong>creation date:</strong> {{ formattedDates.creationDate }}</p>
        <p class="fs-5 date-text"><strong>last modification date:</strong> {{ formattedDates.lastModifDate }}</p>

        <div>

            <p class="fs-5">keywords:</p>

            <div class="mb-2 d-flex justify-content-start flex-wrap">

                <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row" v-for="(keyword, index) in articleFromStore.keywordArr" :key="index">
                    <p class="fs-6 m-1 align-self-center">{{keyword}}</p>
                </div>

            </div>

        </div>

    </div>

    <div class="mt-4" >

        <div v-html="articleFromStore.content"></div>

    </div>

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

            formattedDates() {

                return {

                    creationDate: this.articleFromStore.creationDate ? new Date(this.articleFromStore.creationDate).toLocaleDateString() : '',
                    lastModifDate: this.articleFromStore.lastModifDate ? new Date(this.articleFromStore.lastModifDate).toLocaleDateString() : '',

                }

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