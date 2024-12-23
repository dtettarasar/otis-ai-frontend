<template>

    <!-- Modal -->
    <div class="modal fade" id="deleteArticleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete this article?</h1>
                </div>

                <div v-if="!deletionDone && deleteArticleId">

                    <div class="modal-body">

                        <div v-if="articleObj">

                            <h2>{{ articleObj.title }}</h2>
                            <p class="article-desc"><strong>Description: </strong>{{ articleObj.description }}</p>
                            <p><strong>Creation date: </strong><span class="article-date">{{ this.formattedDates.creationDate }}</span></p>

                        </div>

                        <div v-else>
                            <p><strong>Error: </strong> can't get article infos</p>
                        </div>

                        <p>Keep in mind that once the article has been deleted, it cannot be recovered!</p>
                    </div>

                    <div class="modal-footer">
                        <button v-on:click="initArticleDeletion()" type="button" class="btn btn-danger">I confirm deletion</button>
                        <button data-bs-dismiss="modal" type="button" class="btn btn-primary" @click="clearDeleteArticleId">Cancel</button>
                    </div>

                </div>

                <div v-else-if="deletionDone && !deleteArticleId">

                    <div class="modal-body">
                        <h2>Deletion done</h2>
                        <p v-if="redirection" > You will be redirected to your account page shortly. </p>
                    </div>

                    <div v-if="!redirection">

                        <div class="modal-footer">
                            <button data-bs-dismiss="modal" type="button" class="btn btn-primary" @click="handleClose">Close</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>

</template>

<script>

    import Cookies from 'js-cookie';
    import axios from 'axios';
    import { mapState, mapActions, mapGetters } from 'vuex';
    import { toRaw } from 'vue';

    export default {

        name: 'DeleteArticleModal',

        props: {
            // Pour rediriger vers la page user account
            redirection: {
                type: Boolean,
                required: true
            }
        },

        data() {

            return {

                deletionDone: false,

            }

        },

        computed: {

            ...mapState(['deleteArticleId', 'articleDataList']),

            ...mapGetters(['getArticleById']),

            articleObj() {
                return this.getArticleById(this.deleteArticleId);
            },

            /*
            deleteArticleModalId() {
                return 'deleteArticleModal';
            },
            */

            deleteArticleBackendUrl() {

                return this.$backendUrl + 'front-api/user-delete-article';

            },

            formattedDates() {

                return {

                    creationDate: this.articleObj.creationDate ? new Date(this.articleObj.creationDate).toLocaleDateString() : '',
                    lastModifDate: this.articleObj.lastModifDate ? new Date(this.articleObj.lastModifDate).toLocaleDateString() : '',

                }

            },

        },

        methods: {

            ...mapActions(['deleteArticleObjFromStore','clearDeleteArticleId']),

            async initArticleDeletion() {

                console.log('init article deletion method');

                console.log('id: ' + this.deleteArticleId);

                console.log('articleObj: ');

                console.log(this.articleObj);

                const postObj = {

                    accessToken: Cookies.get('accessToken'),
                    articleId: this.deleteArticleId

                }

                console.log(postObj);

                try {

                    const response = await axios.post(this.deleteArticleBackendUrl, postObj);
                    console.log("response data articleDeletionResponse:");
                    console.log(response.data.articleDeletionResponse);

                    if (response.data.articleDeletionResponse.deletionStatus === true) {

                        console.log("successfully deleted article: " + response.data.articleDeletionResponse.encryptedArticleID);
                        // this.deleteArticleObjFromStore(response.data.articleDeletionResponse.encryptedArticleID);
                        this.updateStores();
                        this.deletionDone = true;
                        this.deletionConfirmed();

                        /*
                        if (this.redirection) {

                            setTimeout(()=> {
                                //this.$router.push('/user-account');
                                window.location.href = '/user-account';
                            }, 2000);

                        }*/

                    } else {

                        console.log("error: can't delete article: " + response.data.articleDeletionResponse.encryptedArticleID);

                    }

                } catch (error) {

                    console.error(error);

                } finally {

                    this.clearDeleteArticleId();

                }

            },

            async updateStores() {

                // This method will update the vuex store and the local storage, we remove here the deleted article from the stores.

                console.log("init the updateStores methods");
                console.log('article list from the store: '); 

                console.log(toRaw(this.articleDataList));

                const storedArticleDataList = localStorage.getItem('articleDataList');
                let parsedArticleDataList = null;

                if (storedArticleDataList) {

                    try {

                        // convert the string to an array of objects
                        parsedArticleDataList = JSON.parse(storedArticleDataList);

                        // Check that the parsing result returned an array
                        if (Array.isArray(parsedArticleDataList)) {

                            console.log("article list from the local storage");
                            console.log(parsedArticleDataList);

                            // Compare the two lists (vuex store vs local storage)
                            if (JSON.stringify(this.articleDataList) === JSON.stringify(parsedArticleDataList)) {

                                console.log("Lists are consistent.");
                                const index = parsedArticleDataList.findIndex(article => article.id === this.deleteArticleId);
                                console.log("index of the article to remove:");
                                console.log(index);

                                if (index !== -1) {

                                    // create a copy of the array
                                    const updatedList = [...parsedArticleDataList];

                                    updatedList.splice(index, 1);
                                    
                                    console.log("updatedList: ");
                                    console.log(updatedList);


                                } else {

                                    console.error("article not found");
                                    return null;

                                }


                            } else {

                                console.error("article lists aren't equal");
                                return null;


                            }


                        } else {

                            console.error("parsed datas didn't returned an array");
                            return null;

                        }

                    } catch (error) {

                        console.error(error);
                        return null;

                    }

                }

            },

            handleClose() {
                this.clearDeleteArticleId();
                this.resetDeletionStatus();
            },

            resetDeletionStatus() {
                this.deletionDone = false;
            },

            deletionConfirmed() {
                this.$emit('deletionConfirmed', { message: 'article has been deleted from Modal', id: this.deleteArticleId });
            },

        },

    };

</script>