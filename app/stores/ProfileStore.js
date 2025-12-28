import { defineStore } from 'pinia';

export const useProfileStore = defineStore('ProfileStore', {
    state: () => ({
        profile: {},
    }),
    
    actions: {
        async getProfile() {
            try {
                const { data, error } = await $fetch('/api/supabase/get-profile', {
                    headers: useRequestHeaders(['cookie']),
                });
                
                if(error) throw error;
                
                this.profile = data;
            } catch(error) {
                console.error(error);
            }
        },
    },
});