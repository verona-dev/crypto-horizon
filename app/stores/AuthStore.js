import { defineStore } from 'pinia';
import { useProfileStore } from '~/stores/ProfileStore.js';
import { useLoadingStore } from '~/stores/LoadingStore.js';

export const useAuthStore = defineStore('AuthStore', {
    getters: {
        isAuthenticated: () => {
            const user = useSupabaseUser();
            return !!user.value;
        },
    },
    
    actions: {
        async register(payload) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const { data, error } = await $fetch('/api/supabase/auth/register', {
                    method: 'POST',
                    body: payload
                });
                
                if(error) {
                    throw error;
                }
                
                return { data, error };
            } catch(error) {
                console.error(error);
                
                return { data: null, error };
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async resendEmail(email) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const { error } = await $fetch('/api/supabase/auth/resend-email', {
                    method: 'POST',
                    body: email
                });
                
                if(error) {
                    throw error;
                }
                
                return { error: null };
            } catch(error) {
                console.error(error);
                return { error };
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async loginPassword(payload) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const { data, error } = await $fetch('/api/supabase/auth/login', {
                    method: 'POST',
                    body: payload
                });
                
                if(error) {
                    throw error;
                }
                
                return { data, error };
            } catch(error) {
                console.error(error);
                return { error };
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async loginOtp(email) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const { data, error } = await $fetch('/api/supabase/auth/login-otp', {
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
                LoadingStore.setLoading(false);
            }
        },
        
        async loginOAuth(provider) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                
                const { data, error } = await $fetch('/api/supabase/auth/login-oauth', {
                    method: 'POST',
                    body: { provider },
                });
                
                if(error) {
                    throw error;
                };
                
                return { data, error };
            } catch(error) {
                console.error(error);
                
                return { data: null, error };
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async loginAnonymous() {
            try {
                const { data, error } = await $fetch('/api/supabase/auth/login-anonymous', {
                    method: 'POST',
                });
                
                if (error) {
                    console.error('Login error:', error);
                    throw new Error(`Failed to sign in anonymously: ${error.statusMessage}`);
                }
                
                return { data, error };
            } catch (error) {
                console.error('Unexpected error:', error);
                throw new Error(`Login failed: ${error.message}`);
            }
        },
        
        async verifyOtp(payload) {
            const ProfileStore = useProfileStore();
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                
                const { data, error } = await $fetch('/api/supabase/auth/verify-otp', {
                    method: 'POST',
                    body: payload,
                });
                
                if(error) throw error;
                
                if(data) {
                    await ProfileStore.getProfile();
                }
                
                return { data, error: null };
            } catch(error) {
                LoadingStore.setLoading(false);
                console.error(error);
                return { data: null, error };
            }
        },
        
        async logOut() {
            const ProfileStore = useProfileStore();
            
            try {
                const route = useRoute();
                
                if(route.path === '/profile') {
                    await navigateTo('/', { replace: true });
                }
                
                const { error } = await $fetch('/api/supabase/auth/logout', {
                    method: 'POST',
                });
                
                if(!error) {
                    reloadNuxtApp();
                    ProfileStore.profile = null;
                }
            } catch(error) {
                console.error('Logout failed:', error);
            }
        },
    },
});