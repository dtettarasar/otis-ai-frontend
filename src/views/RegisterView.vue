<script>

  import PageTitle from '@/components/PageTitle.vue';
  import RegisterForm from '@/components/forms/RegisterForm.vue';

  export default {
    name: 'RegisterView',
    components: {
      PageTitle,
      RegisterForm
    }

  };

</script>

<template>
  <main>
    
    <div class="container">

      <PageTitle txtValue="Register Page"></PageTitle>

      <RegisterForm></RegisterForm>

    </div>

  </main>
</template>