<template>
    
    <div>

      <div v-if="articleObj.retrievedStatus" >
        <p v-if="isEditMode && articleObj">Editing Article ID: {{ articleObj.id }}</p>
      </div>

      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      
    </div>

    <!--Article in Generate mode-->

    <div>

      <p>Creating a New Article</p>

      <form @submit.prevent="generateArticle" method="post" >

        <div class="bg-dark-subtle rounded mt-4 mb-4 p-5">

          <div class="mb-3">

            <label for="articleTitle" class="form-label">Title</label>
            <input v-model="articleObj.title" type="text" class="form-control" id="articleTitle" placeholder="write here your amazing title">

          </div>

          <div class="mb-3">
            <label for="articleDescription" class="form-label">Description</label>
            <textarea v-model="articleObj.description" class="form-control" id="articleDescription" rows="3"></textarea>
            <p class="mt-2">Character counter: <strong>{{ articleObj.description.length }} / {{ descriptionMaxLength }} </strong></p>
          </div>

          <div class="mb-3">

            <label class="form-label" for="keywords">Language</label>
            <select v-model="articleObj.language" id="language" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>

          </div>

          <div class="mb-3">

            <label class="form-label" for="keywords">Keywords</label>
            <input v-model="addKeyWrdField" id="keywords" type="text" class="form-control mb-4">
            <p class="mt-2">Character counter: <strong>{{ this.addKeyWrdField.length }} / {{ keywordMaxLength }} </strong></p>

            <div class="mb-2 d-flex justify-content-start flex-wrap" id="keywords-container">

              <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row" v-for="(keyword, index) in articleObj.keywordArr" :key="index">
                <p class="fs-6 m-1 align-self-center">{{keyword}}</p>
                <button @click="removeKeyword(index)" class="btn-close align-self-center" type="button" aria-label="Close"></button>
              </div>

            </div>

            <p v-if="articleObj.keywordArr.length > 0" >Keyword(s) counter: <strong> {{ articleObj.keywordArr.length }} / {{ keywordsLimit }} </strong></p>

            <p v-if="this.noKeywordAlert" class="text-danger mt-2">The keyword field should not be empty</p>

            <button v-on:click="addKeywords" type="button" class="btn btn-secondary">Add keywords</button>

          </div>

        </div>

        <div class="bg-dark-subtle rounded mt-4 mb-4 p-5">

          <h2>Generate Text with AI</h2>

          <div v-if="!articleInCreation">

            <p>The description and keywords defined above will be used to generate your article</p>

            <div v-if="credit">

              <p class="text-primary mt-2">You have <strong>{{ credit }}</strong> credit(s).</p>

              <button type="submit" class="btn btn-success">Use 1 credit to generate an article</button>

              <p v-if="this.noParamsAlert" class="text-danger mt-2">
                Give a description between <strong>1 and {{this.descriptionMaxLength}} character(s)</strong> or give between <strong>1 & {{this.keywordsLimit}} keyword(s)</strong>.
              </p>

            </div>

            <div v-else>

              <p class="text-danger mt-2" ><strong>You need credits to generate articles with AI</strong></p>
              <button disabled class="btn btn-success ">Use 1 credit to generate an article</button>

            </div>

          </div>

          <div v-else >

            <p>Article in creation, please wait :)</p>

          </div>

        </div>

      </form>

    </div>

  </template>
  
  <script>

    import { toRaw } from 'vue';
    import { mapState, mapActions, mapGetters } from 'vuex';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';
    import { getUserCreditBalance } from '@/custom_modules/getUserCreditBalance';
  
    export default {
        
      name: 'ArticleEditorForm.vue',

      components: {

        DeleteArticleModal,

      },

      data() {

        return {

          articleObj: {
            retrievedStatus: null,
            id: null,
            title: '',
            description: '',
            keywordArr: [],
            language: 'en',
            content: '',
            creationDate: null,
            lastModifDate: null,
            errorMessages: null
          },

          addKeyWrdField: '',
          keywordsLimit: 10,
          keywordMaxLength: 30,
          descriptionMaxLength: 130,
          errorMessage: null,
          isEditMode: false,
          // isGenerateMode: false,
          articleInCreation: false,
          noParamsAlert: false,
          noKeywordAlert: false

        };

      },

      computed: {
            
            ...mapState(['credit', 'articleDataList']),

            ...mapGetters({
              getArticleById: 'getArticleById'
            }),

            keyWordsParamOk() {

              const keyWordsParamOk = this.articleObj.keywordArr.length > 0 && this.articleObj.keywordArr.length <= this.keywordsLimit;
              return keyWordsParamOk;

            },

            descParamOk() {

              return this.articleObj.description !== '';

            },

            createArticleBackendUrl() {

              return this.$backendUrl + 'front-api/user-create-article';

            },

            retrieveArticleBackendUrl() {

              return this.$backendUrl + 'front-api/retrieve-article-data';

            },

            retrieveUserCreditBalanceUrl() {

              return this.$backendUrl + 'front-api/user-credit-balance';

            },

            formattedDates() {

              return {

                  creationDate: this.articleObj.creationDate ? new Date(this.articleObj.creationDate).toLocaleDateString() : '',
                  lastModifDate: this.articleObj.lastModifDate ? new Date(this.articleObj.lastModifDate).toLocaleDateString() : '',

              }

            },

            deleteArticleModalId() {
                return `delete-article-${this.articleObj.id}`
            },

            isDevMode() {

              return process.env.NODE_ENV !== 'production';

            },

      },

      methods: {

        ...mapActions(['setDeleteArticleId', 'addArticleObj', 'refreshUserCreditBalance']),

        async generateArticle() {

          if (this.isDevMode) {

            console.log('init generate article method');
            console.log('articleObj: ');
            console.log(toRaw(this.articleObj));

          }

          const accessToken = Cookies.get('accessToken');

          if (this.isDevMode) {

            console.log("accessToken:");
            console.log(accessToken);

          }

          if (!this.descParamOk && !this.keyWordsParamOk) {

            console.log(`noParamsAlert value: ${this.noParamsAlert}`)
            console.log("error: no parameters");
            this.noParamsAlert = true;
            console.log(`noParamsAlert value: ${this.noParamsAlert}`)

          } else {

              try {

                this.articleInCreation = true;

                const response = await axios.post(this.createArticleBackendUrl, {
                    accessToken: accessToken,
                    articleTitle: this.articleObj.title ? this.articleObj.title : 'Untitled',
                    articleDesc: this.articleObj.description,
                    articleLang: this.articleObj.language,
                    articleKeywords: this.articleObj.keywordArr
                });
                
                if (this.isDevMode) {

                  console.log("response data:");
                  console.log(response.data);
                  console.log("article id: ");
                  console.log(response.data.articleId);

                }

                if (response.data.articleId) {

                  // Récupère les données de l'article qui vient d'être créé + ajout de l'id de l'aricle dans le store

                  await this.retrieveArticleData(response.data.articleId);
                  
                  // Update credit balance here

                  const userCreditBalance = await getUserCreditBalance();

                  if (userCreditBalance) {

                    console.log('init this.refreshUserCreditBalance from article editor component (after generating an article)');

                    this.refreshUserCreditBalance(userCreditBalance);

                    console.log(`credit saved in store: ${this.credit}`);

                  }

                  this.addArticleObj(this.articleObj);
                  this.$router.push(`/view-article/${this.articleObj.id}`);

                }

                } catch (err) {

                  console.error(err);

                }

          }

        },

        async retrieveArticleData(articleId) {

          if (this.isDevMode) {

            console.log('init the retrieveArticleData method');

          }

          const accessToken = Cookies.get('accessToken');

          try {

            const response = await axios.get(this.retrieveArticleBackendUrl, {

              params : {

                articleId: articleId,
                accessToken: accessToken

              }

            });

            if (this.isDevMode) {

              console.log('response.data: ');
              console.log(response.data);

            }

            if (response.data.retrievedStatus !== null) {

              this.articleObj.retrievedStatus = response.data.retrievedStatus
              this.articleObj.id = response.data.articleId;
              this.articleObj.title = response.data.articleTitle;
              this.articleObj.description = response.data.articleDesc;
              this.articleObj.content = response.data.articleContent;
              this.articleObj.language = response.data.articleLang;
              this.articleObj.keywordArr = response.data.articleKeywords;
              this.articleObj.creationDate = response.data.articleCreationDate;
              this.articleObj.lastModifDate = response.data.articleLastModifiedDate;

            } else {

              this.articleObj.retrievedStatus = response.data.retrievedStatus;

            }

          } catch(err) {

            console.error(err);

          }

          if (this.isDevMode) {

            console.log('end of retrieveArticleData method');

          }

        },

        addKeywords() {

          console.log('init add keywords method');

          let simplifiedKeyWord = null;
          
          if (Object.keys(this.articleObj.keywordArr).length == this.keywordsLimit ) {

            console.log(`you can add a maximum of ${this.keywordsLimit} keywords`);

          } else if (!this.addKeyWrdField) {

            console.log('field should not be empty');
            this.noKeywordAlert = true;

          } else if (this.addKeyWrdField.length > this.keywordMaxLength) {

            console.log(`make sure your keywords doesn't exceed ${this.keywordMaxLength} characters`);

          } else {

            simplifiedKeyWord = this.addKeyWrdField.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
            this.articleObj.keywordArr.push(simplifiedKeyWord);

            this.noKeywordAlert = false;

            console.log('keyword value: ');
            console.log(this.addKeyWrdField);

            console.log('simplified Keyword value: ' + simplifiedKeyWord);

            console.log('keywordArr: ');
            console.log(toRaw(this.articleObj.keywordArr));

            this.addKeyWrdField = '';

            this.keyWordIdCount++;

          }

        },

        removeKeyword(index) {
          console.log('init remove keyword method');
          this.articleObj.keywordArr.splice(index, 1);
          console.log('Updated keywordArr: ');
          console.log(toRaw(this.articleObj.keywordArr));
        },

      },

      async mounted() {

        console.log("all article data list: ");
        console.log(toRaw(this.articleDataList));

        //const articleId = this.$route.params.id;

        const userCreditBalance = await getUserCreditBalance();

        if (userCreditBalance) {

          /*
          if (this.isDevMode) {

            console.log('init this.refreshUserCreditBalance from article editor component');

          }*/

          console.log('init this.refreshUserCreditBalance from article editor component');

          await this.refreshUserCreditBalance(userCreditBalance);

          if (this.isDevMode) {
            console.log(`credit saved in store: ${this.credit}`);
          }

        }

        /*
        if (articleId) {

          console.log('retrieving article data');

          await this.testRetrieveArticleData(articleId);

          const articleFromStore = this.getArticleById(articleId);
          console.log("articleFromStore");
          console.log(articleFromStore);

          
            TODO : créer un nouveau composant pour gérer séparement le view mode
            ce composant prendra en props l'id de l'article, pour ensuite récupérer les données de l'article depuis le store avec le getter
            créer une nouvelle route view-article qui utilisera ce nouveau composant
          

        } else {

          this.isGenerateMode = true;

        }

        */

        console.log("all article data list: ");
        console.log(toRaw(this.articleDataList));

      }
    };

  </script>

<style>

  .date-text {
      margin-bottom: 0px;
  }

</style>
  