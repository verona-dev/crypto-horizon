import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        authModal: false,
        loading: false,
        user: null,
    }),
    
    actions: {
        async signInWithOtp(email) {
            const supabase = useSupabaseClient();
            
            try {
                this.loading = true;
                
                const { error } = await supabase.auth?.signInWithOtp({
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
        
        async getUser() {
            const supabase = useSupabaseClient();
            const user = useSupabaseUser();
            
            const { data } = await supabase
               .from('profiles')
               .select(`username, website, avatar_url`)
               .eq('id', user.value.id)
               .single()
            
            if(data) {
                this.user = data;
            }
            
            // console.log(this.user);
        }
    },
});