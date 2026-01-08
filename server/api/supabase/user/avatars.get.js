import { serverSupabaseClient } from '#supabase/server';


export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event);
    
    const { data: avatars, error } = await client
       .storage
       .from('avatars')
       .list();
    
    if(error) {
        console.error('Error fetching avatars:', error);
        return { data: null, error };
    }
    
    const avatarUrls = avatars.map(file => {
        const { data: { publicUrl } } = client
           .storage
           .from('avatars')
           .getPublicUrl(file.name, {
               transform: {
                   width: 256,
                   height: 256,
               },
           })
        return publicUrl;
    });
    
    return { data: avatarUrls, error };
});