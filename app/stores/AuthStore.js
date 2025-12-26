import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        authModal: false,
        loading: false,
        profile: {},
    }),
    
    actions: {
        async signInWithOtp(email) {
            const supabase = useSupabaseClient();
            
            try {
                this.loading = true;
                
                const { data, error } = await supabase.auth?.signInWithOtp({
                    email
                });
                
                if(error) {
                    throw error;
                };
                
                return { data, error };
            } catch(error) {
                console.error(error);
                
                return { data: null, error };
            } finally {
                this.loading = false;
            }
        },
        
        async verifyOtp(email, otpCode) {
            const supabase = useSupabaseClient();
            
            try {
                const { data, error } = await supabase.auth?.verifyOtp({
                    email,
                    token: otpCode,
                    type: 'email',
                });
                
                return { data, error };
            } catch(error) {
                console.error(error);
            }
        },
        
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