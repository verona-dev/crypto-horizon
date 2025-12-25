import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        authModal: false,
        loading: false,
        user: {},
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
        
        async getUser() {
            try {
                const { data, error } = await $fetch('/api/supabase/get-user');
                
                if(error) throw error;
                
                if(data) {
                    this.user = data;
                    
                    console.log(data);
                    
                    return { data };
                };
            } catch(error) {
                console.error(error);
            }
        },
    },
});