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
        const { error } = await client.auth.resend({
            email,
            type: 'signup',
        });
        
        if(error) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || 'Failed to resend email',
            });
        }
        
        return { error };
    } catch(error) {
        throw createError({
            statusCode: error.status || 400,
            statusMessage: error.message || 'Failed to resend email',
        });
    }
});