import { defineStore } from 'pinia';
import { useProfileStore } from '~/stores/ProfileStore.js';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        loading: false,
    }),
    
    getters: {
        isAuthenticated: () => {
            const user = useSupabaseUser();
            return !!user.value;
        },
    },
    
    actions: {
        async register(payload) {
            try {
                this.loading = true;
                
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
                this.loading = false;
            }
        },
        
        async loginPassword(payload) {
          try {
              this.loading = true;
              
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
          } finally {
              this.loading = false;
          }
        },
        
        async loginOtp(email) {
            try {
                this.loading = true;
                
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
                this.loading = false;
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
            
            try {
                const { data, error } = await $fetch('/api/supabase/auth/verify-otp', {
                    method: 'POST',
                    body: payload,
                });
                
                if(error) throw error;
                
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