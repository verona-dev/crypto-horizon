import { defineStore } from 'pinia';

export const useAcademyStore = defineStore('AcademyStore', {
    state: () => ({
        encyclopedia: [],
    }),
    
    actions: {
        async getEncyclopedia() {
            try {
                const data = await $fetch('/api/supabase/academy/encyclopedia');
                
                if(!data) return;
                
                this.encyclopedia = data;
            } catch(error) {
                console.error(error);
            }
        },
    },
});