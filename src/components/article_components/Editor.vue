<template>

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

              <!--<button v-on:click="deleteArticle()" class="btn btn-danger m-1 p-2"><i class="bi bi-trash-fill"></i> Delete</button>-->
              <button type="button" class="btn btn-success m-1 p-2" @click="saveContent"><i class="bi bi-file-richtext-fill"> </i>Save</button>
              <router-link class="btn btn-primary m-1 p-2" :to=articlePageLink><i class="bi bi-file-richtext-fill"> </i>Cancel</router-link>
              <router-link class="btn btn-dark m-1 p-2" to="/all-user-article"><i class="bi bi-file-richtext-fill"></i> All my articles</router-link>

          </div>

      </div>

    </div>


    <div v-if="articleObj.retrievedStatus">

      <div class="editor-container row">

        <div class="col-md-6 col-sm-12">
          <!-- Éditeur Quill -->
          <div ref="quillEditor" class="quill-editor"></div>
        </div>
        
        <div class="col-md-6 col-sm-12">
          <!-- Afficher le contenu sauvegardé -->
           <h3>Preview</h3>
          <div v-html="previewContent" class="saved-content"></div>
        </div>
        

      </div>

    </div>

    <div class="mt-2 p-5 bg-dark-subtle rounded" v-if="!articleObj.retrievedStatus">

      <div class="d-flex flex-column justify-content-center">
            <p class="text-center display-6"><i class="bi bi-exclamation-triangle-fill"></i></p>
            <p class="err-not-found display-6 text-center"><strong>Article not found</strong></p>
        </div>

    </div>


  </template>
  
  <script>
  
  import {mapState, mapGetters, mapActions} from 'vuex';
  import { toRaw } from 'vue';
  import Quill from "quill"; // Importer Quill
  import "quill/dist/quill.snow.css"; // Importer le thème par défaut "snow"
  
  export default {
    name: "Editor",

    props: {

      articleSlug: {
        type: String,
        required: true
      }

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

        quill: null,            // Instance de Quill
        previewContent: "",       // Contenu sauvegardé en HTML
        initialContent: "<p>Hello World</p>", // Contenu initial au format HTML

      };

    },

    computed: {

      ...mapGetters({
        getArticleBySlug: 'getArticleBySlug',
      }),

      articleFromStore() {

        return this.getArticleBySlug(this.articleSlug);

      },

      articlePageLink() {

        return `/view-article/${this.articleSlug}`;

      },  

      formattedDates() {

        return {

            creationDate: this.articleObj.creationDate ? new Date(this.articleObj.creationDate).toLocaleDateString() : '',
            lastModifDate: this.articleObj.lastModifDate ? new Date(this.articleObj.lastModifDate).toLocaleDateString() : '',

        }

      },

    },

    async mounted() {

      if (this.articleSlug) {

        console.log("article slug parameter from Editor component: ");
        console.log(this.articleSlug);

        await this.retrieveArticleData();

        if (this.articleObj.retrievedStatus) {

          // Initialisation de Quill après que le composant soit monté
          this.quill = new Quill(this.$refs.quillEditor, {

            theme: "snow", // Utiliser le thème "snow" (par défaut)

            placeholder: "Hello World",

            modules: {

              toolbar: [

                [{ header: [1, 2, 3, 4, 5, 6, false] }], // Titres 
                ["bold", "italic", "underline", "strike"], // Formatage du texte
                [{ list: "ordered" }, { list: "bullet" }], // Listes
                [{ align: [] }],// Alignement
                ["link", "clean"], // Liens et suppression du format

              ],

            },

          });

          // Charger le contenu initial dans l'éditeur
          this.quill.root.innerHTML = this.articleObj.content;
          this.previewContent = this.articleObj.content;

          // Écouter les changements de texte
          this.quill.on("text-change", () => {
            this.previewContent = this.quill.root.innerHTML;
          });

        }

      }
      
    },

    methods: {

      // Fonction pour sauvegarder le contenu de l'éditeur
      saveContent() {
        this.previewContent = this.quill.root.innerHTML;
        console.log("Contenu sauvegardé :", this.previewContent);
      },

      async retrieveArticleData() {

        if (this.articleSlug) {

          const articlefromLocalStorage = this.retrieveArticleFromLocalStorage(this.articleSlug);

          if (!articlefromLocalStorage && this.articleFromStore) {

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

          }

        } else {

          console.log('test getArticleBySlug after page reload');
          console.log(`slug: ${this.articleSlug}`);
          const articleFoundBySlug = this.getArticleBySlug(this.articleSlug);
          console.log(toRaw(articleFoundBySlug));

        }

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

  };

  </script>
  
  <style scoped>

  .editor-container {
    margin: 20px;
  }
  
  .saved-content {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    background: #f9f9f9;
  }
  </style>
  