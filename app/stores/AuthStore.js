import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        authModal: false,
        loading: false,
    }),
    
    actions: {
        async signInWithOtp(email) {
            const supabase = useSupabaseClient();
            
            try {
                this.loading = true;
                
                const { error } = await supabase.auth.signInWithOtp({
                    email: email
                });
                
                if(error) throw error;
                
                alert('check your email');
            } catch(error) {
                console.error(error);
                
                alert(error?.error_description || error?.message)
            } finally {
                this.loading = false;
            }
        },
    },
});