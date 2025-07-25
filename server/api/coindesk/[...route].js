import { createError, defineEventHandler } from 'h3';

export default defineEventHandler(async(event) => {
    const { coindesk_api } = useRuntimeConfig().public;
    
    const route = event.context.params?.route || '';
    const apiUrl = `https://data-api.coindesk.com/${route}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': coindesk_api,
            },
        });
        
        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: response.statusText,
            });
        }
        
        return await response.json();
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});