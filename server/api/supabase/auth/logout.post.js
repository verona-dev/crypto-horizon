import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const supabase = await serverSupabaseClient(event);
    
    try {
        const { error } = await supabase.auth.signOut();
        
        if(error) {
            throw error;
        }
        
        return { error };
    } catch(error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});