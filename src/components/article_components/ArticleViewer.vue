<template>

    <h3>This is the Article Viewer component</h3>

    <div v-if="articleObj.retrievedStatus" class="mt-2 p-5 bg-dark-subtle rounded" >

        <h1>{{ articleObj.title }}</h1>

        <p class="fs-5 date-text"><strong>creation date:</strong> {{ formattedDates.creationDate }}</p>
        <p class="fs-5 date-text"><strong>last modification date:</strong> {{ formattedDates.lastModifDate }}</p>

        <div>

            <p class="fs-5">keywords:</p>

            <div class="mb-2 d-flex justify-content-start flex-wrap">

                <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row" v-for="(keyword, index) in articleObj.keywordArr" :key="index">
                    <p class="fs-6 m-1 align-self-center">{{keyword}}</p>
                </div>

            </div>

            <!--<KeywordsList :articleId="articleId"/>-->

            <div class="d-flex flex-row">

                <button v-on:click="deleteArticle()" class="btn btn-danger m-1 p-2"><i class="bi bi-trash-fill"></i> Delete</button>
                <router-link class="btn btn-dark m-1 p-2" to="/all-user-article"><i class="bi bi-file-richtext-fill"></i> All my articles</router-link>

            </div>

        </div>

    </div>

    <div v-if="articleObj.retrievedStatus" class="mt-4" >

        <div v-html="articleObj.content"></div>

    </div>

    <div class="mt-2 p-5 bg-dark-subtle rounded" v-if="!articleObj.retrievedStatus">

        <div class="d-flex flex-column justify-content-center">
            <p class="text-center display-6"><i class="bi bi-exclamation-triangle-fill"></i></p>
            <p class="display-6 text-center"><strong>Article not found</strong></p>
        </div>

    </div>

    <DeleteArticleModal @deletionConfirmed="articleDeleted" :redirection=true />

</template>

<script>

    import {mapState, mapGetters, mapActions} from 'vuex';
    import { toRaw } from 'vue';
    import { Modal } from 'bootstrap';
    import axios from 'axios';
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';
    import KeywordsList from './KeywordsList.vue';
    import Cookies from 'js-cookie';

    export default {

        name: 'ArticleViewer',

        props: {
            articleId: {
                type: String,
                required: true
            }
        },

        components: {

            DeleteArticleModal,
            KeywordsList,

        },

        data() {

            return {

                articleObj: {

                    retrievedStatus: null,
                    id: null,
                    title: '',
                    description: '',
                    keywordArr: [],
                    language: '',
                    content: '',
                    creationDate: null,
                    lastModifDate: null,
                    errorMessages: null,
                    slug: null,

                },

                deleteArticleModalInstance: null, // store the instance of the modal here

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

                    creationDate: this.articleObj.creationDate ? new Date(this.articleObj.creationDate).toLocaleDateString() : '',
                    lastModifDate: this.articleObj.lastModifDate ? new Date(this.articleObj.lastModifDate).toLocaleDateString() : '',

                }

            },

            isDevMode() {

                return process.env.NODE_ENV !== 'production';

            },

            retrieveArticleBackendUrl() {

                return this.$backendUrl + 'front-api/retrieve-article-data';

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

                    // console.log("article is retrieved from the store: ");
                    // console.log(toRaw(this.articleFromStore));
                    this.articleObj.retrievedStatus = true;
                    this.articleObj.id = this.articleFromStore.id;
                    this.articleObj.title = this.articleFromStore.title;
                    this.articleObj.description = this.articleFromStore.description;
                    this.articleObj.content = this.articleFromStore.content;
                    this.articleObj.language = this.articleFromStore.language;
                    this.articleObj.keywordArr = this.articleFromStore.keywordArr;
                    this.articleObj.creationDate = this.articleFromStore.creationDate;
                    this.articleObj.lastModifDate = this.articleFromStore.lastModifDate;
                    this.articleObj.slug = this.articleFromStore.slug;

                    console.log("this.articleObj");
                    console.log(toRaw(this.articleObj));
                    

                } else {

                    // try here to retrieve the article with the id
                    this.retrieveArticleData(this.articleId);

                    //console.log("article id is not valid");

                }

            }

            // init the instance of the modal here : 
            this.deleteArticleModalInstance = new Modal(document.getElementById('deleteArticleModal'));

        },

        methods: {

            ...mapActions(['setDeleteArticleId']),

            async deleteArticle() {
               
               this.setDeleteArticleId(this.articleId);
               //const myModal = new Modal(document.getElementById('deleteArticleModal'));
               // myModal.show();

               this.deleteArticleModalInstance.show();
     
            },

            articleDeleted(data) {

                console.log(data);

                setTimeout(()=> {

                    //this.$router.push('/user-account');
                    //window.location.href = '/user-account';
                    // const myModal = new Modal(document.getElementById('deleteArticleModal'));
                    // myModal.hide();
                    
                    this.deleteArticleModalInstance.hide();
                    this.$router.push('/user-account');

                }, 2000);

            },

            async retrieveArticleData(articleId) {

                if (this.isDevMode) {

                    console.log('init the retrieveArticleData method');
                    console.log('try to retrieve the article with the following id: ');
                    console.log(articleId);

                }

                const accessToken = Cookies.get('accessToken');

                try {

                    const response = await axios.get(this.retrieveArticleBackendUrl, {

                        params: {
                            articleId: articleId,
                            accessToken: accessToken
                        }

                    });

                    if (this.isDevMode) {

                        console.log('response.data: ');
                        console.log(response.data);

                    }

                    if (response.data.retrievedStatus !== null) {

                        this.articleObj.retrievedStatus = response.data.retrievedStatus;
                        this.articleObj.id = response.data.articleId;
                        this.articleObj.title = response.data.articleTitle;
                        this.articleObj.description = response.data.articleDesc;
                        this.articleObj.content = response.data.articleContent;
                        this.articleObj.language = response.data.articleLang;
                        this.articleObj.keywordArr = response.data.articleKeywords;
                        this.articleObj.creationDate = response.data.articleCreationDate;
                        this.articleObj.lastModifDate = response.data.articleLastModifiedDate;

                    }

                } catch(err) {

                    console.log(err);

                }

            },

        },

    }

</script>