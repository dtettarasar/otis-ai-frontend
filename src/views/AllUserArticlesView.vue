<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';
  import AllUserArticlesContent from '@/components/page_main_containers/AllUserArticlesContent.vue';

  export default {
    name: 'AllUserArticlesView',
    components: {
      PageTitle,
      UserAccessControl,
      AllUserArticlesContent
    }
  }

</script>

<template>
  <main>

    <div class="container">
      <PageTitle txtValue="All user articles Page"></PageTitle>
    </div>

    <UserAccessControl v-bind:loginRequired="true">
      <AllUserArticlesContent></AllUserArticlesContent>
    </UserAccessControl>
    
  </main>
</template>