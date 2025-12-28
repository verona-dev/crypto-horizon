import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        authModal: false,
        loading: false,
    }),
    
    actions: {
        async signInWithOtp(email) {
            try {
                this.loading = true;
                
                const { data, error } = await $fetch('/api/supabase/auth/sign-in-otp', {
                    method: 'POST',
                    body: { email },
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
            try {
                const { data, error } = await $fetch('/api/supabase/auth/verify-otp', {
                    method: 'POST',
                    body: { email, otpCode },
                });
                
                return { data, error };
            } catch(error) {
                console.error(error);
            }
        },
    },
});