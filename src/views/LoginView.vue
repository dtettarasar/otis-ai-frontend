<script>

  import PageTitle from '@/components/PageTitle.vue'
  import LoginForm from '@/components/forms/LoginForm.vue'
  import PageBanner from '@/components/general_content_components/PageBanner.vue';

  export default {
    name: 'LoginView',
    components: {
      PageTitle,
      LoginForm,
      PageBanner
    }

  };

</script>

<template>

  <PageBanner title="Let’s pick up where you left off." iconClass="bi-file-richtext-fill"></PageBanner>

  <main>

    <div class="container">

      <PageTitle txtValue="Access your dashboard"></PageTitle>

      <LoginForm></LoginForm>
      
    </div>
    
  </main>
</template>