import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    
    const { data, error } = await client
       .from('profiles')
       .select(`username, website, avatar_url`)
       .eq('id')
       .single()
    
    return { data, error };
});