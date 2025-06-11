import { defineEventHandler } from 'h3';
const { livecoinwatch_api_key } = useRuntimeConfig().public;

export default defineEventHandler(async (event) => {
    const route = event.context.params.route;
    const apiUrl = `https://api.livecoinwatch.com/${route}`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + livecoinwatch_api_key
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
