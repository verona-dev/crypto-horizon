import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const supabase = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { provider } = body;
    
    if(!provider) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Provider is required',
        });
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: 'https://oqnuuqvoiolgpdpkhyby.supabase.co/auth/v1/callback',
            }
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