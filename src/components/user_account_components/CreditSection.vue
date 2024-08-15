<template>

    <div class="container mb-3 mt-2">
        <div class="row">

            <div class="col p-3 m-2 bg-body-secondary rounded">

                <h3>My Credits</h3>

                <p><strong>Your current balance:</strong> <span class="display-6">{{ credit }} credit(s)</span></p>

            </div>

            <div class="col p-3 m-2 bg-body-secondary rounded">

                <h3>Buy new Credits</h3>

                <BuyCreditsForm></BuyCreditsForm>

            </div>

        </div>
        
    </div>

</template>

<script>

    import { mapState } from 'vuex';
    import BuyCreditsForm from '@/components/forms/BuyCreditsForm.vue'

    import { getUserCreditBalance } from '@/custom_modules/getUserCreditBalance';

    export default {

        name: 'CreditSection',

        components: {
            BuyCreditsForm
        },

        data() {

            return {

            }

        },

        computed: {
            
            ...mapState(['credit'])

        },

        async mounted() {
            //console.log(this.username);
            
            const userCreditBalance = await getUserCreditBalance();


            if (process.env.NODE_ENV !== 'production') {

                console.log(`userCreditBalance: ${userCreditBalance}`);

            }

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }

    }

</script>