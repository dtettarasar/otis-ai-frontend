<template>
    <div class="editor-container">
      <!-- Éditeur Quill -->
      <div ref="quillEditor" class="quill-editor"></div>
  
      <!-- Bouton pour sauvegarder le contenu -->

      <div class="d-flex flex-row">

        <button type="button" class="btn btn-success" @click="saveContent">Save</button>
        <button type="button" class="btn btn-primary">Cancel</button>

      </div>
  
      <!-- Afficher le contenu sauvegardé -->
      <div v-html="savedContent" class="saved-content"></div>
    </div>
  </template>
  
  <script>
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
        quill: null,            // Instance de Quill
        savedContent: "",       // Contenu sauvegardé en HTML
        initialContent: "<p>Hello World</p>", // Contenu initial au format HTML
      };
    },
    mounted() {

      if (this.articleSlug) {

        console.log("article slug parameter from Editor component: ");
        console.log(this.articleSlug);

      }

      // Initialisation de Quill après que le composant soit monté
      this.quill = new Quill(this.$refs.quillEditor, {

        theme: "snow", // Utiliser le thème "snow" (par défaut)

        placeholder: "Hello World",

        modules: {

          toolbar: [

            [{ header: [1, 2, 3, 4, 5, 6, false] }], // Titres 
            ["bold", "italic", "underline", "strike"],// Formatage du texte
            [{ list: "ordered" }, { list: "bullet" }],// Listes
            [{ align: [] }],// Alignement
            ["link", "clean"], // Liens et suppression du format

          ],

        },

      });
  
      // Charger le contenu initial dans l'éditeur
      this.quill.root.innerHTML = this.initialContent;
    },
    methods: {
      // Fonction pour sauvegarder le contenu de l'éditeur
      saveContent() {
        this.savedContent = this.quill.root.innerHTML;
        console.log("Contenu sauvegardé :", this.savedContent);
      },
    },
  };
  </script>
  
  <style scoped>
  .editor-container {
    margin: 20px;
  }
  
  .quill-editor {
    height: 300px; /* Taille de l'éditeur */
  }
  
  .saved-content {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    background: #f9f9f9;
  }
  </style>
  