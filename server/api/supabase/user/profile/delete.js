import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    const body = await readBody(event);
    
    
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
    
    const id = user.sub;
    
    try {
        const { data, error } = await client.auth.admin.deleteUser(id);
        
        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to update avatar',
            });
        }
        
        return { data, error };
    } catch (error) {
        console.error('Unexpected error:', error);
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
