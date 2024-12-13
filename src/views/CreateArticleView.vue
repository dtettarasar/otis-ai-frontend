<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';
  import CreateArticleContent from '@/components/page_main_containers/CreateArticleContent.vue'

  export default {
    name: 'CreateArticleView',
    components: {
      PageTitle,
      UserAccessControl,
      CreateArticleContent
    }

  };

</script>

<template>
  <main>
    
    <div class="container">
      <PageTitle txtValue="Create article Page"></PageTitle>
    </div>

    <UserAccessControl v-bind:loginRequired="true">
      <CreateArticleContent></CreateArticleContent>
    </UserAccessControl>
    
  </main>
</template>