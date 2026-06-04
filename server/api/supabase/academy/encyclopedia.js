import { serverSupabaseClient } from '#supabase/server';

export default defineCachedEventHandler(async(event) => {
    try {
        const client = await serverSupabaseClient(event);
        
        const { data, error } = await client
           .storage
           .from('encyclopedia')
           .download('encyclopedia.json');
        
        if(error)
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to download the encyclopedia from the server',
            });
        
        const encyclopedia = await data.text();
        return JSON.parse(encyclopedia);
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to download the encyclopedia from the server',
        });
    }
});