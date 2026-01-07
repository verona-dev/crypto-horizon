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
                const { data, error } = await $fetch('/api/supabase/user/avatars');
                
                if(error) throw error;
                
                this.avatars = data;
                console.log(JSON.parse(JSON.stringify(this.avatars)));
            } catch(error) {
                console.error(error);
            }
        },
    },
});