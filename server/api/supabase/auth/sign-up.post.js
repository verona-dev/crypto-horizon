import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email, password } = body;
    
    try {
        const { data, error } = await client.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:3000/verify',
            }
        });
        
        if (error) {
            console.error('Sign-in error:', error);
            
            throw createError({
                statusCode: 500,
                statusMessage: `Sign-in failed: ${error.message}`,
            });
        }
        
        return { data, error };
    } catch (error) {
        console.error('Unexpected error:', error);
        
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Unexpected error during sign-in',
        });
    }
});
