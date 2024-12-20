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

    const mockRouter = {
        push: vi.fn(), // Mock la méthode push
    };

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
                $router: mockRouter, // Pour tester la redirection après la supression d'un article
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

    it("renders error message when article is not found", async () => {


        // Build a modified store without article Data in it
        const mockVuexStoreEmptyArticle = createStore({

            state: {
                articleDataList: [], // Ajoutez d'autres propriétés si nécessaire
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

        //Build the wrapper with the modified store
        const wrapper = mount(ArticleViewer, {
            ...mountOptions,
            global: {
                plugins: [mockVuexStoreEmptyArticle],

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
                
            }
        });

        await flushPromises();

        //console.log(wrapper.html());

        expect(wrapper.find(".err-not-found").text()).toBe("Article not found");

    });

    it("calls deleteArticle and shows modal", async () => {

        const wrapper = mount(ArticleViewer, mountOptions);

        // attend la résolution des promesses (pour faire en sorte que les données de l'article soient bien récupérés avant de commencer les tests)
        await flushPromises();

        // Mock la méthode show du modal
        const showMock = vi.fn();
        wrapper.vm.deleteArticleModalInstance = { show: showMock };

        // Clique sur le bouton delete
        await wrapper.find("button.btn-danger").trigger("click");

        // Vérifie que le modal a été affiché
        expect(showMock).toHaveBeenCalled();

    });

    it("navigates to user account after deletion", async () => {

        const mockRouter = {
            push: vi.fn(), // Mock la méthode push
        };

        const wrapper = mount(ArticleViewer, mountOptions);

        await flushPromises();

        // Mock hide pour tester la redirection
        const hideMock = vi.fn();
        wrapper.vm.deleteArticleModalInstance = { hide: hideMock };

         // Vérifie que l'instance est bien définie
        expect(wrapper.vm.deleteArticleModalInstance).toBeDefined();
        expect(wrapper.vm.deleteArticleModalInstance.hide).toBeInstanceOf(Function);

        // Active les fake timers pour gérer le setTimeout
        vi.useFakeTimers();

        // Appelle la méthode articleDeleted
        wrapper.vm.articleDeleted();

        // Avance les timers de 2000ms pour simuler la fin du timeout
        vi.advanceTimersByTime(2000);

        // Vérifie que le modal a été caché
        expect(hideMock).toHaveBeenCalled();

    });

});