<template>

    <h3>This is the Article Viewer component</h3>

    <div v-if="articleObj.retrievedStatus" class="mt-2 p-5 bg-dark-subtle rounded" >

        <h1 class="article-title">{{ articleObj.title }}</h1>

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
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';
    import KeywordsList from './KeywordsList.vue';

    export default {

        name: 'ArticleViewer',

        props: {
            articleSlug: {
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
              getArticleById: 'getArticleById',
              getArticleBySlug: 'getArticleBySlug',
            }),

            articleFromStore() {
                return this.getArticleBySlug(this.articleSlug);
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
            
        },

        mounted() {

            console.log('init mounted event from article viewer component');

            // console.log('test getArticleBySlug');
            // console.log(`slug (from this.articleObj.slug) : ${this.articleObj.slug}`);
            // console.log(`slug (from this.articleSlug) : ${this.articleSlug}`);
            const articleFoundBySlug = this.getArticleBySlug(this.articleSlug);
            // console.log(toRaw(articleFoundBySlug));

            if (this.articleSlug) {
                
                const articlefromLocalStorage = this.retrieveArticleFromLocalStorage(this.articleSlug);

                /*
                console.log("all article data list: ");
                console.log(toRaw(this.articleDataList));
                */

                if (!articlefromLocalStorage && this.articleFromStore) {

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

                    // console.log("this.articleObj");
                    // console.log(toRaw(this.articleObj));

                    /*
                    console.log('test getArticleBySlug');
                    console.log(`slug: ${this.articleObj.slug}`);
                    const articleFoundBySlug = this.getArticleBySlug(this.articleObj.slug)
                    console.log(toRaw(articleFoundBySlug));
                    */

                    

                } else {

                    //console.log("article id is not valid");

                    console.log('test getArticleBySlug after page reload');
                    console.log(`slug: ${this.articleSlug}`);
                    const articleFoundBySlug = this.getArticleBySlug(this.articleSlug);
                    console.log(toRaw(articleFoundBySlug));

                }

            }

            // init the instance of the modal here : 
            this.deleteArticleModalInstance = new Modal(document.getElementById('deleteArticleModal'));

        },

        methods: {

            ...mapActions(['setDeleteArticleId']),

            async deleteArticle() {
               
               this.setDeleteArticleId(this.articleObj.id);
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

            retrieveArticleFromLocalStorage(slug) {

                console.log('init retrieveArticleFromLocalStorage method');

                console.log("article slug prop: ");
                console.log(slug);

                const storedArticleDataList = localStorage.getItem('articleDataList');

                if (storedArticleDataList) {

                    try {

                        // convert the string to an array of objects
                        const parsedArticleDataList = JSON.parse(storedArticleDataList);
                        
                        console.log('Type after parse:', typeof parsedArticleDataList);
                        console.log('Content after parse:', parsedArticleDataList);

                        // Check that the parsing result returned an array
                        if (Array.isArray(parsedArticleDataList)) {

                            // Find the article matching the slug
                            const articleFound = parsedArticleDataList.find(article => article.slug === slug);

                            if (articleFound) {

                                console.log('Found article:', articleFound);
                                
                                this.articleObj.retrievedStatus = true;
                                this.articleObj.id = articleFound.id;
                                this.articleObj.title = articleFound.title;
                                this.articleObj.description = articleFound.description;
                                this.articleObj.content = articleFound.content;
                                this.articleObj.language = articleFound.language;
                                this.articleObj.keywordArr = articleFound.keywordArr;
                                this.articleObj.creationDate = articleFound.creationDate;
                                this.articleObj.lastModifDate = articleFound.lastModifDate;
                                this.articleObj.slug = articleFound.slug;

                                return true;

                            } else {

                                console.log('no article found');
                                return null;

                            }


                        } else {

                            console.log("parsed datas didn't returned an array");
                            return null

                        }

                    } catch(err) {

                        console.log('Error when trying to parse the article data: '); 
                        console.log(err);
                        return null;

                    }

                }

            },

        },

    }

</script>