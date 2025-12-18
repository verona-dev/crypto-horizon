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
            const supabase = useSupabaseClient();
            const user = useSupabaseUser();
            
            if(user.value) {
                this.user = user.value;
            }
            
            console.log(this.user);
            
            // const { data } = await supabase
            //    .from('profiles')
            //    .select(`username, website, avatar_url`)
            //    .eq('id', user.value.id)
            //    .single()
            //
            // if(data) {
            //     this.user = data;
            // }
            
            // console.log(this.user);
        }
    },
});