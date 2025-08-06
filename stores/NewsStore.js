import { defineStore } from 'pinia';

export const useNewsStore = defineStore('NewsStore', {
    state: () => ({
        news: {},
        newsOutlets: {},
        article: {},
    })
});