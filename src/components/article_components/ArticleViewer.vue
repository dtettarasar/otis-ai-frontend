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

    }

</script>