import { describe, it, expect, vi, beforeEach, afterEach, } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import ArticleViewer from "@/components/article_components/ArticleViewer.vue";
import { createStore } from "vuex";

describe("ArticleViewer.vue", () => {

    // Mock Bootstrap Modal
    vi.mock('bootstrap/js/src/modal', () => {
        return {
        default: vi.fn(() => ({
            show: vi.fn(),
            hide: vi.fn(),
        })),
        };
    });

    const mockArticleData = {
        retrievedStatus: true,
        id: 1,
        title: "Test Article",
        description: "Test description",
        content: "<p>Test content</p>",
        language: "English",
        keywordArr: ["test", "vue", "vitest"],
        creationDate: "2024-01-01",
        lastModifDate: "2024-01-15",
        slug: "test-article",
    };

    const mockVuexStore = createStore({

        state: {
            articleDataList: [mockArticleData], // Ajoutez d'autres propriétés si nécessaire
        },
          getters: {

            getArticleBySlug(state) {
                return (slug) => state.articleDataList.find(article => article.slug === slug);
            },

        },
          actions: {
            setDeleteArticleId: vi.fn(),
        },

    });

    const mountOptions = {

        props: { articleSlug: "test-article" },

        /*
        computed: {
          articleFromStore: () => mockArticleData,
        },
        */

        global: {
            plugins: [mockVuexStore],

            mocks: {
                $route: {
                    params: { slug: 'test-article' },
                },
            },

            stubs: {
                'router-link': {
                  template: '<a><slot /></a>', // Remplace simplement le router-link par un <a>
                },
            },

        },

    };

    // Add modal to the DOM before each test
    beforeEach(() => {
        const modalElement = document.createElement('div');
        modalElement.id = 'deleteArticleModal';
        document.body.appendChild(modalElement);
    });

    afterEach(() => {
        document.body.innerHTML = ''; // Clean up the DOM after each test
    });

    it("renders correctly when article is found", async () => {

        const wrapper = mount(ArticleViewer, mountOptions);

        // attend la résolution des promesses (pour faire en sorte que les données de l'article soient bien récupérés avant de commencer les tests)
        await flushPromises();

        //console.log(wrapper.html());

        // check that article title is correctly rendered
        expect(wrapper.find(".article-title").text()).toBe(mockArticleData.title);

        // Vérifie que les dates sont formatées
        expect(wrapper.find(".date-text").text()).toContain("creation date: 1/1/2024");

        // Vérifie que les mots-clés sont affichés
        const keywords = wrapper.findAll(".keyword-bdge");
        expect(keywords).toHaveLength(mockArticleData.keywordArr.length);
        expect(keywords[0].text()).toBe("test");

    });

});