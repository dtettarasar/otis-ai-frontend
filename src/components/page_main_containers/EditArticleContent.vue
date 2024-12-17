<template>

    
    <div>
        <h2>{{ username }} is connected to the Edit Article page</h2>
    </div>

    <Editor></Editor>
    

</template>

<script>

    import { mapState } from 'vuex';
    import Editor from '../article_components/Editor.vue';

    export default {
        name: 'EditArticleContent.vue',

        components: {
            Editor,
        },

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