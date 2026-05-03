import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event);
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
        const { data, error } = await supabase.auth.admin.deleteUser(id);
        
        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to delete account',
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
