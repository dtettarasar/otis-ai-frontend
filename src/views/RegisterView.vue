<script>

  import PageTitle from '@/components/PageTitle.vue';
  import RegisterForm from '@/components/forms/RegisterForm.vue';
  import PageBanner from '@/components/general_content_components/PageBanner.vue';

  export default {
    name: 'RegisterView',
    components: {
      PageTitle,
      RegisterForm,
      PageBanner
    }

  };

</script>

<template>

  <PageBanner title="Your adventure starts here." iconClass="bi-person-fill-add"></PageBanner>

  <main>
    
    <div class="container">

      <PageTitle txtValue="Sign up for Otis"></PageTitle>

      <RegisterForm></RegisterForm>

    </div>

  </main>
</template>