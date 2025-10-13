import { defineStore } from 'pinia';
import { useFetchCoindesk } from '~/composables/apiCoindesk.js';

export const useNewsStore = defineStore('NewsStore', {
    state: () => ({
        news: {},
        newsOutlets: {},
        article: {},
        coinNews : {},
        loading: false,
        errorFetch: null,
    }),
    
    actions: {
        async getNews({ category = null, limit  }) {
            this.loading = true;
            
            try {
                let params = {
                    limit,
                };
                
                if(category) {
                    params.category = category;
                }
                
                const response = await useFetchCoindesk('news/v1/article/list', params);
                
                if(response && response.Data) {
                    if (category) {
                        this.coinNews = response.Data;
                    } else {
                        this.news = response.Data;
                    }
                }
            } catch(error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async getNewsArticle(source_key, guid) {
            this.loading = true;
            
            try {
                const response = await useFetchCoindesk('news/v1/article/get', {
                    source_key,
                    guid,
                });
                
                if(response && response.Data) {
                    this.article = response.Data;
                }
            } catch(error) {
                this.errorFetch = error;
            }
            finally {
                this.loading = false;
            }
        },
        
        async getNewsOutlets() {
            this.loading = true;
            
            try {
                const response = await useFetchCoindesk('news/v1/source/list');
                
                if(response && response.Data) {
                    this.newsOutlets = response.Data;
                }
            } catch(error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
    }
});