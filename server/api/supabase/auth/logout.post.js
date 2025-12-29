import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    
    try {
        const { error } = await client.auth.signOut();
        
        if(error) {
            throw error;
        }
    } catch(error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});