import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    
    if(!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
    
    try {
        const { data, error } = await client
           .from('profiles')
           .select('*')
           .single()
        
        if (error) {
            console.error('Error fetching profile:', error);
            return { data: null, error };
        }
        
        const profile = {
            astronaut_type: data.astronaut_type,
            avatar_url: data.avatar_url,
            bio: data.bio,
            dob: data.dob,
            email: user?.email,
            last_sign_in: data.last_sign_in,
            location: data.location,
            updated_at: data.updated_at,
            username: data.username,
        };
        
        return { data: profile, error };
    } catch(error) {
        console.error('Unexpected error:', error);
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});