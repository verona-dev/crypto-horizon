import { defineStore } from 'pinia';
import { useProfileStore } from '~/stores/ProfileStore.js';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        authModal: false,
        loading: false,
    }),
    
    getters: {
        isAuthenticated: () => {
            const user = useSupabaseUser();
            return !!user.value;
        },
    },
    
    actions: {
        async signUp(payload) {
            try {
                const { data, error } = await $fetch('/api/supabase/auth/sign-up', {
                    method: 'POST',
                    body: payload
                });
                
                if(error) {
                    throw error;
                }
                
                if(data) {
                    console.log(data);
                }
            } catch(error) {
                console.error(error);
            }
        },
        
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
        
        async signInAnonymous() {
            try {
                const { data, error } = await $fetch('/api/supabase/auth/sign-in-anonymous', {
                    method: 'POST',
                });
                
                if (error) {
                    console.error('Sign-in error:', error);
                    throw new Error(`Failed to sign in anonymously: ${error.statusMessage}`);
                }
                
                return { data, error };
            } catch (error) {
                console.error('Unexpected error:', error);
                throw new Error(`Sign-in failed: ${error.message}`);
            }
        },
        
        async verifyOtp(email, otpCode) {
            const ProfileStore = useProfileStore();
            
            try {
                const { data, error } = await $fetch('/api/supabase/auth/verify-otp', {
                    method: 'POST',
                    body: { email, otpCode },
                });
                
                if(data) {
                    await ProfileStore.getProfile();
                }
                
                return { data, error };
            } catch(error) {
                console.error(error);
            }
        },
        
        async logOut() {
            const ProfileStore = useProfileStore();
            
            try {
                await $fetch('/api/supabase/auth/logout', {
                    method: 'POST',
                });
                
                ProfileStore.profile = null;
            } catch(error) {
                console.error('Logout failed:', error);
            }
        },
    },
});