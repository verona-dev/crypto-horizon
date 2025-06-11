import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const { coincap_api_key } = useRuntimeConfig().public;
    const route = event.context.params.route || 'assets';
    const apiUrl = `https://rest.coincap.io/v3/${route}`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + coincap_api_key
            },
        });
        
        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: response.statusText,
            });
        }
        
        return await response.json();
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
