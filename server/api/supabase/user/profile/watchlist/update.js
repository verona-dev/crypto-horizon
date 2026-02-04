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
    
    const { coin } = body;
    
    try {
        const { data, error } = await client.rpc('toggle_watchlist', {
            id: user.sub,
            coin: coin
        });
        
        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to update watchlist',
            });
        }
        
        return { data, error };
    } catch (error) {
        console.error('Error updating watchlist:', error);
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
