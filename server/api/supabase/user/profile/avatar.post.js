import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    const body = await readBody(event);
    const { avatarUrl } = body;
    
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
    
    try {
        const { error } = await client
           .from('profiles')
           .update({ avatar_url: avatarUrl })
           .eq('id', user.sub);
        
        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to update avatar',
            });
        }
        
        return { success: true, error };
    } catch (error) {
        console.error('Unexpected error:', error);
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
