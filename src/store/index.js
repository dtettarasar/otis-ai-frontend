/* créer une variable bool userLoggedIn. Pour identifier si un utilisateur est connecté. 
Permettra de conditionner l'affichage de certains composants + gérer les requêtes pour alimenter le store. 
userLoggedIn sera à utiliser pour vérifier qu'un utilisateur est bien connecté, pour faire les requêtes au backend (récupérer username, crédit, id des articles, etc...)
*/

/* 
Créer une méthode qui va checker les tokens à chaque chargement de page. 
Si le navigateur contient un access Token valide mais que le store ne contient pas de username ni de userId alors il faudra executer un process
qui va envoyer une requête au backend pour garder en mémoire l'id 
*/

/*
saveUserInfo() va servir à charger les premières datas de l'utilisateur juste après sa connexion. 
créer ensuite une méthode qui permettra de d'updater chacune des infos séparement, notamment les crédits et la liste des articles à afficher dans le dashboard (les ids des articles). 
*/

import { createStore } from 'vuex';

export default createStore({
  // données utilisées par les composants
  state: {
      username: null,
      userLoggedIn: null,
      userInitialInfoSaved: false,
      credit: 0,
      activeModal: null,
      cookieExpTimestamp: 0,
      sessionCountdownTriggered: false,
      articleIds: [],
      articleDataList: [],
      deleteArticleId: null,
  },
  getters: {
    
    getCookieExpTimestamp: state => state.cookieExpTimestamp,
    getSessionCountdownTriggered: state => state.sessionCountdownTriggered,

    getArticleById: (state) => (articleId) => {
      return state.articleDataList.find(article => article.id === articleId);
    },

  },
  // Fait l'intermédiaire entre actions et state
  mutations: {

      setUsername(state, username) {
        state.username = username;
      },

      updateUserLoggedIn(state, userLoggedIn) {
        state.userLoggedIn = userLoggedIn;
      },

      userInitialInfoSaved(state, userDataObj) {
        state.userInitialInfoSaved = true;
        state.username = userDataObj.username;
        state.credit = userDataObj.credit
        console.log("userInitialInfoSaved: " + state.userInitialInfoSaved);
        console.log("username saved: " + state.username);
        console.log("credit balance saved: " + state.credit);
      },

      setActiveModal(state, modalId) {
        state.activeModal = modalId;
      },
      
      clearActiveModal(state) {
        state.activeModal = null;
      },

      setCookieExpTime(state, cookieExpTimestamp) {
        state.cookieExpTimestamp = cookieExpTimestamp;
        console.log("setCookieExpTime saved: " + state.cookieExpTimestamp);
      }, 

      setSessionCountdown(state, sessionCountdownTriggered) {
        state.sessionCountdownTriggered = sessionCountdownTriggered;
      },

      setArticleIds(state, articleIds) {
        state.articleIds = articleIds;
      },

      setArticleDataList(state, articleDataList) {
        
        state.articleDataList = articleDataList;
        console.log('saved the article data list: '); 
        console.log(state.articleDataList);

      },

      addArticleId(state, articleId) {

        state.articleIds.push(articleId);

      },

      addArticleObj(state, articleObj) {

        state.articleDataList.push(articleObj);

      },

      deleteArticleIdFromStore(state, articleId) {

        // console.log('init delete Article Id from store');
        // console.log('articleId to delete:', articleId);
    
        // Faire une copie profonde de l'état avant suppression
        const beforeDeletion = JSON.parse(JSON.stringify(state.articleIds));
        // console.log("articleIds array (before deletion):", beforeDeletion);

        const index = state.articleIds.indexOf(articleId);
        if (index > -1) {
            state.articleIds.splice(index, 1);
        }

        // Faire une copie profonde de l'état après suppression
        const afterDeletion = JSON.parse(JSON.stringify(state.articleIds));
        // console.log("articleIds array (after deletion):", afterDeletion);

      },

      deleteArticleObjFromStore(state, articleId) {

        // console.log('init delete Article Obj from store');
        // console.log('articleId to delete:', articleId);

        // Faire une copie profonde de l'état avant suppression
        const beforeDeletion = JSON.parse(JSON.stringify(state.articleDataList));
        // console.log("articleDataList array (before deletion):", beforeDeletion);

        const index = state.articleDataList.findIndex(article => article.id === articleId);

        if (index !== -1) {

          state.articleDataList.splice(index, 1);
          // console.log(`Article with ID: ${articleId} has been deleted from store.`);

          // Faire une copie profonde de l'état après suppression
          const afterDeletion = JSON.parse(JSON.stringify(state.articleDataList));
          // console.log("articleDataList array (after deletion):", afterDeletion);

        } else {

          console.log(`Article with ID: ${articleId} not found in store.`);

        }

      },

      setDeleteArticleID(state, articleId) {
        state.deleteArticleId = articleId;
      },

      clearDeleteArticleID(state) {
        state.deleteArticleId = null;
      },

  },
  // actions sert aux appels API et les méthodes que l'on appelle depuis les components pour interagir avec les données du store
  actions: {
      saveUsername({commit}, username) {

        // to do:

        /*
        Utiliser Vuex pour stocker le nom d'utilisateur :
        MAJ l'action pour prendre l'ID utilisateur crypté en paramètre,
        envoyer une requête Axios vers le backend pour récupérer le nom d'utilisateur correspondant,
        puis stocker le nom d'utilisateur dans le store Vuex.
        */

        console.log('init the saveUsername action from vuex');
        console.log(username); 

        commit('setUsername', username);

      },
      saveUserInfo({commit}, userDataObj) {

        /*
          Méthode qui va charger tous les éléments initiaux de l'utilisateur après sa connexion
          Item à charger dans le store après le login process: 
          - username
          - nb de credit
          - liste des articles existants (charger les ids)

          Tous ces éléments doivent également être effacés du store lorsque l'utilisateur se déconnecte ou si l'accessToken a expiré
        */

        //console.log('init save user info action');
        //console.log(userDataObj);

        commit('userInitialInfoSaved', userDataObj);

      },
      updateUserLoggedIn({commit}, userLoggedIn) {

        console.log('init the updateUserLoggedIn action from vuex');
        console.log(userLoggedIn);

        commit('updateUserLoggedIn', userLoggedIn);

      },
      saveCookieExpTimestamp({commit}, cookieExpTimestamp) {

        console.log('init the saveCookieExpTimestamp action from vuex');
        console.log('cookieExpTimestamp: ' + cookieExpTimestamp);

        commit('setCookieExpTime', cookieExpTimestamp);

      },

      setSessionCountdown({commit}, sessionCountdownTriggered) {

        commit('setSessionCountdown', sessionCountdownTriggered); 

      },

      saveArticleIds({commit}, articleIds) {

        commit('setArticleIds', articleIds);

      },

      saveArticleDataList({commit}, articleDataList) {

        console.log('init the saveArticleDataList from the vuex store');
        commit('setArticleDataList', articleDataList);

      },

      addArticleId({commit}, articleId) {

        commit('addArticleId', articleId);

      }, 

      addArticleObj({commit}, articleObj) {

        commit('addArticleObj', articleObj);

      }, 

      deleteArticleIdFromStore({commit}, articleId) {

        commit('deleteArticleIdFromStore', articleId);

      },

      deleteArticleObjFromStore({commit}, articleId) {

        // console.log('Deleting article object with ID:', articleId);
        commit('deleteArticleObjFromStore', articleId);

      },

      setDeleteArticleId({ commit }, articleId) {
        commit('setDeleteArticleID', articleId);
      },

      clearDeleteArticleId({ commit }) {
        commit('clearDeleteArticleID');
      },

  }
})