import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email, password } = body;
    
    if(!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required',
        });
    }
    
    try {
        const { data, error } = await client.auth.signUp({
            email,
            password,
        });
        
        if (error) {
            console.error('Sign-up error:', error);
            
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || 'Unexpected error during sign-up',
            });
        }
        
        return { data, error };
    } catch (error) {
        console.error('Unexpected error:', error);
        
        throw createError({
            statusCode: error.status || 500,
            statusMessage: error.message || 'Unexpected error during sign-up',
        });
    }
});
