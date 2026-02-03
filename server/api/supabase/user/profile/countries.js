import { serverSupabaseClient } from '#supabase/server';

export default defineCachedEventHandler(async(event) => {
    try {
        const client = await serverSupabaseClient(event);
        
        const { data, error } = await client
           .storage
           .from('countries')
           .download('countries.json');
        
        if(error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to download countries from server',
            });
        }
        
        const countries = await data.text();
        return JSON.parse(countries);
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to download countries from server',
        });
    }
}, { maxAge: 60 * 60 * 24 * 30 });