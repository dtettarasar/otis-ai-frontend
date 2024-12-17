<template>
    <div class="container mt-4">
      <!-- Barre d'outils -->
      <div class="btn-toolbar mb-2" role="toolbar">
        <button class="btn btn-secondary" @click="execCmd('bold')">Gras</button>
        <button class="btn btn-secondary" @click="execCmd('italic')">Italique</button>
        <button class="btn btn-secondary" @click="execCmd('underline')">Souligné</button>
        <button class="btn btn-secondary" @click="execCmd('insertOrderedList')">Liste Numérotée</button>
        <button class="btn btn-secondary" @click="execCmd('insertUnorderedList')">Liste à Puces</button>
        <button class="btn btn-secondary" @click="execCmd('removeFormat')">Supprimer Format</button>
      </div>
  
      <!-- Zone éditable -->
      <div
        ref="editor"
        contenteditable="true"
        class="border p-2"
        style="min-height: 200px;"
      ></div>
  
      <!-- Bouton de sauvegarde -->
      <button class="btn btn-primary mt-3" @click="saveContent">Sauvegarder</button>
  
      <!-- Affichage du contenu sauvegardé -->
      <h5 class="mt-4">Contenu HTML :</h5>
      <pre class="bg-light p-3">{{ savedContent }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  // Référence pour l'éditeur
  const editor = ref(null);
  
  // Contenu HTML existant (à charger dans l'éditeur)
  const initialContent = "<p>Hello World</p><ul><li>Élément 1</li><li>Élément 2</li></ul>";
  
  // Contenu sauvegardé
  const savedContent = ref("");
  
  // Fonction pour exécuter une commande d'édition
  const execCmd = (command) => {
    document.execCommand(command, false, null);
  };
  
  // Fonction pour sauvegarder le contenu HTML
  const saveContent = () => {
    savedContent.value = editor.value.innerHTML;
  };
  
  // Charger le contenu HTML existant lors du montage du composant
  onMounted(() => {
    editor.value.innerHTML = initialContent; // Insère le contenu HTML initial
  });
  </script>
  
  <style scoped>
  .border {
    border: 1px solid #ccc;
  }
  </style>
  