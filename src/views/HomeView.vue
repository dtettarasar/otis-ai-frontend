<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';
  import HomeContent from '@/components/page_main_containers/HomeContent.vue';

  export default {
    name: 'HomeView',

    components: {
      PageTitle,
      UserAccessControl,
      HomeContent,
    }

  };

</script>

<template>
  <main>
    <UserAccessControl v-bind:loginRequired="false">
      <HomeContent></HomeContent>
    </UserAccessControl>
  </main>
</template>

<style>

</style>
