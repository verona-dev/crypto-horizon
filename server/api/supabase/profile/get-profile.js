import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    
    const { data, error } = await client
       .from('profiles')
       .select(`avatar_url, bio, location, updated_at, username, website_url`)
       .single()
    
    if (error) {
        console.error('Error fetching profile:', error);
        return { data: null, error };
    }
    
    const profile = {
        avatar_url: data.avatar_url,
        bio: data.description,
        email: user?.email,
        location: data.location,
        updated_at: data.updated_at,
        username: data.username,
        website_url: data.website_url,
    };
    
    return { data: profile, error };
});