import { defineStore } from 'pinia';

export const useProfileStore = defineStore('ProfileStore', {
    state: () => ({
        profile: null,
        avatars: null,
        countries: [],
    }),
    
    actions: {
        async getProfile() {
            try {
                const { data, error } = await $fetch('/api/supabase/user/profile', {
                    headers: useRequestHeaders(['cookie']),
                });
                
                if(error) throw error;
                
                this.profile = data;
            } catch(error) {
                console.error(error);
            }
        },
        
        async updateProfile(payload) {
            try {
                const { success, error } = await $fetch('/api/supabase/user/profile/update', {
                    method: 'PATCH',
                    headers: useRequestHeaders(['cookie']),
                    body: payload,
                });
                
                return { success, error };
            } catch(error) {
                console.error(error);
            }
        },
        
        async addToWatchlist(payload) {
            try {
                const { data, error } = await $fetch('/api/supabase/user/profile/watchlist/update', {
                    method: 'PATCH',
                    headers: useRequestHeaders(['cookie']),
                    body: payload,
                });
                
                if(error) throw error;
                
                this.profile = data;
                
                return { data, error };
            } catch(error) {
                console.error(error);
            }
        },
        
        async getAvatars() {
            try {
                const { data, error } = await $fetch('/api/supabase/user/avatars', {
                    headers: useRequestHeaders(['cookie']),
                });
                
                if(error) throw error;
                
                this.avatars = data;
            } catch(error) {
                console.error(error);
            }
        },
        
        async getCountries() {
            try {
                const data = await $fetch('/api/supabase/user/profile/countries');
                
                if(!data) return;
                
                this.countries = data;
            } catch(error) {
                console.error(error);
            }
        },
    },
});