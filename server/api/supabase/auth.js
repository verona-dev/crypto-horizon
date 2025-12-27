import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email } = body;
    
    try {
        const { data, error } = await client.auth.signInWithOtp({
            email
        });
        
        return { data, error };
    } catch(error) {
        console.error(error);
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});