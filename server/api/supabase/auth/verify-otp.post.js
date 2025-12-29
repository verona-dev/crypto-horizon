import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email, otpCode } = body;
    
    if(!email || !otpCode) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and OTP code are required',
        })
    }
    
    try {
        const { data, error } = await client.auth.verifyOtp({
            email,
            token: otpCode,
            type: 'email',
        });
        
        if(error) {
            throw error;
        }
        
        return { data, error };
    } catch(error) {
        console.error(error);
        
        throw createError({
           statusCode: error.statusCode || 500,
           statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});