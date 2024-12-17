<template>

    <PageBanner title="View all your articles"></PageBanner>

    <div class="container">

        <div class="row">

            <div class="col-12 col-md-6 col-lg-4 mb-3 mt-3" v-for="articleObj in reverseArticleList" :key="articleObj.slug">

                <ArticleCard :articleSlug="articleObj.slug" @delete-article="prepareToDelete"></ArticleCard>

            </div>

        </div>

    </div>

    <DeleteArticleModal :redirection=false />

</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import ArticleCard from '@/components/article_components/ArticleCard.vue';
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';
    import PageBanner from '@/components/general_content_components/PageBanner.vue';
    import { Modal } from 'bootstrap';
    import { toRaw } from 'vue';

    export default {
        name: 'AllUserArticlesContent.vue',

        components: {

            ArticleCard,
            DeleteArticleModal,
            PageBanner,

        },

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['username', 'articleDataList']),

            reverseArticleList() {
                // pour afficher les articles les plus récents en premier
                return this.articleDataList.slice().reverse();
            },

        },

        mounted() {

            // console.log("mount the AllUserArticlesContent component");
            // console.log("article to display");
            // console.log(toRaw(this.articleIds));

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

            ...mapActions(['setDeleteArticleId']),

            prepareToDelete(articleId) {
                this.setDeleteArticleId(articleId);
                const myModal = new Modal(document.getElementById('deleteArticleModal'));
                myModal.show();
            },

        },
    };

</script>

<style>

</style>