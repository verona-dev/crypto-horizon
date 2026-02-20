import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { provider } = body;
    
    if(!provider) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Provider is required',
        });
    }
    
    try {
        const { data, error } = await client.auth.signInWithOAuth({
            provider,
        });
        
        if(error) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || 'Unexpected error during login',
            });
        }
        
        return { data, error };
    } catch(error) {
        console.error(error);
        
        throw createError({
            statusCode: error.status || 500,
            statusMessage: error.message || 'Internal Server Error',
        });
    }
});