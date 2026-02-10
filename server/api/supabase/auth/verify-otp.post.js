import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email, otpCode, token } = body;
    
    let payload;
    
    if(email && otpCode) {
        payload = { email, token: otpCode, type: 'email' };
    } else if(token) {
        payload = { token, type: 'email' };
    } else {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request. Email or OTP code or token are required',
        });
    }
    
    try {
        const { data, error } = await client.auth.verifyOtp(payload);
        
        if(error) throw error;
        
        return { data, error };
    } catch(error) {
        console.error(error);
        
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to verify OTP',
        });
    }
});