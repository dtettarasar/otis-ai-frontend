<template>

    
    <div>
        <h2>{{ username }} is connected to the Edit Article page</h2>
    </div>
    

</template>

<script>

    import { mapState } from 'vuex';

    export default {
        name: 'EditArticleContent.vue',

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['username']),

            articleSlug() {
                return this.$route.params.slug;
            }

        },

        mounted() {

            if(this.articleSlug) {

                console.log("article slug parameter from EditArticleContent component: ");
                console.log(this.articleSlug);

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