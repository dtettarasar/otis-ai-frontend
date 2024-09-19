<template>

    <h3>This is the Article Viewer component</h3>

    <p> {{ articleObj.title }}</p>

    <div class="mt-2 p-5 bg-dark-subtle rounded" >

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

            <div class="d-flex flex-row">

                <button v-on:click="deleteArticle()" class="btn btn-danger m-1 p-2"><i class="bi bi-trash-fill"></i> Delete</button>
                <router-link class="btn btn-dark m-1 p-2" to="/all-user-article"><i class="bi bi-file-richtext-fill"></i> All my articles</router-link>

            </div>

        </div>

    </div>

    <div class="mt-4" >

        <div v-html="articleObj.content"></div>

    </div>

    <DeleteArticleModal @deletionConfirmed="articleDeleted" :redirection=true />

</template>

<script>

    import {mapState, mapGetters, mapActions} from 'vuex';
    import { toRaw } from 'vue';
    import { Modal } from 'bootstrap';
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';

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

        },

        data() {

            return {

                articleObj: {

                    id: null,
                    title: '',
                    description: '',
                    keywordArr: [],
                    language: '',
                    content: '',
                    creationDate: null,
                    lastModifDate: null,
                    errorMessages: null

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

                    this.articleObj.id = this.articleFromStore.id;
                    this.articleObj.title = this.articleFromStore.title;
                    this.articleObj.description = this.articleFromStore.description;
                    this.articleObj.content = this.articleFromStore.content;
                    this.articleObj.language = this.articleFromStore.language;
                    this.articleObj.keywordArr = this.articleFromStore.keywordArr;
                    this.articleObj.creationDate = this.articleFromStore.creationDate;
                    this.articleObj.lastModifDate = this.articleFromStore.lastModifDate;

                    console.log("this.articleObj");
                    console.log(toRaw(this.articleObj));
                    

                } else {

                    console.log("article id is not valid");

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

        },

    }

</script>