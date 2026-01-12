import { defineStore } from 'pinia';

export const useProfileStore = defineStore('ProfileStore', {
    state: () => ({
        profile: null,
        avatars: null,
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
    },
});