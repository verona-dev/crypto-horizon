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
                const { data, error } = await $fetch('/api/supabase/user/avatars/list', {
                    headers: useRequestHeaders(['cookie']),
                });
                
                if(error) throw error;
                
                this.avatars = data;
            } catch(error) {
                console.error(error);
            }
        },
        
        async updateAvatar(avatarUrl) {
            try {
                const { success, error } = await $fetch('/api/supabase/user/profile/avatar', {
                    method: 'POST',
                    headers: useRequestHeaders(['cookie']),
                    body: { avatarUrl },
                });

                return { success, error };
            } catch (error) {
                console.error('Error updating avatar:', error);
            }
        },
    },
});