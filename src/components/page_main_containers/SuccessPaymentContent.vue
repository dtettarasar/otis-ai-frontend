<template>

    
    <div>
        <p>
            We appreciate your business! If you have any questions, please email
            <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
    </div>
    

</template>

<script>

    import axios from 'axios';
    import Cookies from 'js-cookie';
    import { mapActions } from 'vuex';

    export default {

        name: 'SuccessPaymentContent.vue',

        data() {

            return {

            }

        },

        computed: {

            retrieveUserCreditBalanceUrl() {

                return this.$backendUrl + 'front-api/user-credit-balance';

            },

        },

        mounted() {

            this.getUserCreditBalance();

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

            ...mapActions(['refreshUserCreditBalance']),

            async getUserCreditBalance() {

                console.log('init getUserCreditBalance method');

                const accessToken = Cookies.get('accessToken');
                console.log("accessToken in getUserCreditBalance method: ");
                console.log(accessToken);

                try {

                    const response = await axios.get(this.retrieveUserCreditBalanceUrl, {

                        params : {

                            accessToken: accessToken

                        }

                    });

                    console.log('response.data: ')
                    console.log(response.data);

                    if (response.data.newCreditBalance || response.data.newCreditBalance === 0) {

                        this.refreshUserCreditBalance(response.data.newCreditBalance);

                    }


                } catch (error) {

                    console.error(error);

                }

                console.log('end of getUserCreditBalance method');

            },

        }
    }

</script>