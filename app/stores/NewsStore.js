import { defineStore } from 'pinia';
import { useFetchCoindesk } from '~/composables/apiCoindesk.js';

export const useNewsStore = defineStore('NewsStore', {
    state: () => ({
        news: [],
        newsOutlets: {},
        article: {},
        coinNews : [],
        loading: false,
        errorFetch: {
            statusCode: null,
            statusMessage: null,
        },
    }),
    
    actions: {
        async getNews({ category = null, limit  }) {
            this.loading = true;
            
            try {
                let params = {
                    limit,
                };
                
                if(category) {
                    params.categories = category;
                }
                
                const { data, error } = await useFetchCoindesk('news/v1/article/list', params);
                
                if(error) {
                    this.errorFetch = error;
                }
                
                if (data && data.Data) {
                    if (category) {
                        this.coinNews = data.Data;
                    } else {
                        this.news = data.Data;
                    }
                }
            } catch(error) {
                console.error(error);
                this.errorFetch = error;
            }
            finally {
                this.loading = false;
            }
        },
        
        async getArticle(source_key, guid) {
            this.loading = true;
            
            try {
                const { data, error } = await useFetchCoindesk('news/v1/article/get', {
                    source_key,
                    guid,
                });
                
                if(error) {
                    this.errorFetch = error;
                }
                
                if(data && data.Data) {
                    this.article = data.Data;
                }
            } catch(error) {
                console.error(error);
                this.errorFetch = error;
            }
            finally {
                this.loading = false;
            }
        },
        
        async getNewsOutlets() {
            this.loading = true;
            
            try {
                const { data, error } = await useFetchCoindesk('news/v1/source/list');
                
                if(error) {
                    this.errorFetch = error;
                }
                
                if(data && data.Data) {
                    this.newsOutlets = data.Data;
                    
                }
            } catch(error) {
                console.error(error);
                this.errorFetch = error;
            }
            finally {
                this.loading = false;
            }
        },
    }
});