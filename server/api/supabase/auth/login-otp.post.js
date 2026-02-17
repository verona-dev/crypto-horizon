import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email } = body;
    
    if(!email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email is required',
        });
    }
    
    try {
        const { data, error } = await client.auth.signInWithOtp({
            email,
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