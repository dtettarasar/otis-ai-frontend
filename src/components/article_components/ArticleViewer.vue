<template>

    <h3>This is the Article Viewer component</h3>

</template>

<script>

    export default {

        name: 'ArticleViewer',

        props: {
            articleId: {
                type: String,
                required: true
            }
        },

        mounted() {

            console.log('article ID passed as props in ArticleViewer Component:');
            console.log(this.articleId);

        },

    }

</script>