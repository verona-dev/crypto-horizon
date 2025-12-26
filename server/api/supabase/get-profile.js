import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    
    const { data, error } = await client
       .from('profiles')
       .select(`username, avatar_url`)
       .single()
    
    if (error) {
        console.error('Error fetching profile:', error);
        return { data: null, error };
    }
    
    const profile = {
        email: user?.email,
        username: data.username,
        avatar_url: data.avatar_url,
    };
    
    return { data: profile, error };
});