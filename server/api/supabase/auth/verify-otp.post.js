import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email, token } = body;
    
    if(!email || !token) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required',
        });
    }
    
    try {
        const { data, error } = await client.auth.verifyOtp({
            email,
            token,
            type: 'email',
        });
        
        if (error) {
            console.error('Supabase OTP verification error:', error);
            
            throw createError({
                statusCode: error.status || 400,
                statusMessage: error.message || 'Failed to verify OTP',
            });
        }
        
        return { data, error };
    } catch(error) {
        console.error(error);
        
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to verify OTP',
        });
    }
});