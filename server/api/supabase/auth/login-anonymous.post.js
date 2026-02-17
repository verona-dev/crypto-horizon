import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    
    try {
        const { data, error } = await client.auth.signInAnonymously();
        
        if (error) {
            console.error('Anonymous login error:', error);
            
            throw createError({
                statusCode: 500,
                statusMessage: `Anonymous login failed: ${error.message}`,
            });
        }
        
        return { data, error };
    } catch (error) {
        console.error('Unexpected error:', error);
        
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Unexpected error during login',
        });
    }
});
