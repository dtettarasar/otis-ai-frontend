<template>

    <div class="container">

        <div class="row">
            <h2>{{ username }} is connected to the Edit Article page</h2>
        </div>

        <div class="row">

            <div v-if="articleSlug">

                <Editor :articleSlug="articleSlug"> </Editor>

            </div> 

            <div v-else>

                <p>No article selected. Please choose an article to edit its content.</p>

            </div>

        </div>

    </div>

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