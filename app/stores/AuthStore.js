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
        async signUp(payload) {
            try {
                this.loading = true;
                
                const { data, error } = await $fetch('/api/supabase/auth/sign-up', {
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
        
        async signInWithPassword(payload) {
            console.log(payload);
          try {
              this.loading = true;
              
              const { data, error } = await $fetch('/api/supabase/auth/sign-in', {
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
                const { error } = await $fetch('/api/supabase/auth/logout', {
                    method: 'POST',
                });
                
                if(!error) {
                    ProfileStore.profile = null;
                }
            } catch(error) {
                console.error('Logout failed:', error);
            }
        },
    },
});