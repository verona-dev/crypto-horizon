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
           .select('watchlist')
           .single()
        
        if (error) {
            console.error('Error fetching profile:', error);
            return { data: null, error };
        }
        
        return { data, error };
    } catch(error) {
        console.error('Unexpected error:', error);
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});