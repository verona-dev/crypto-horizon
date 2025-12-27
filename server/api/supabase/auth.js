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
            email
        });
        
        return { data, error };
    } catch(error) {
        console.error(error);
        
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});