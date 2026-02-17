import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email, password } = body;
    console.log(body);
    
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) {
            console.error('Sign-in error:', error);
            
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || 'Unexpected error during sign-in',
            });
        }
        
        return { data, error };
    } catch (error) {
        console.error('Error occurred', error);
        
        throw createError({
            statusCode: error.status || 500,
            statusMessage: error.message || 'Unexpected error during sign-in',
        });
    }
});