<template>

    <p>This is the KeywordsList component</p>

</template>

<script>

    export default {

        name: 'KeywordsList',

        props: {
            articleId: {
                type: String,
                required: true
            }
        },

        data() {

            return {



            }

        },

        mounted() {

            if (this.articleId) {

                console.log('article ID passed as props in KeywordList Component:');
                console.log(this.articleId);

            }

        }

    }

</script>