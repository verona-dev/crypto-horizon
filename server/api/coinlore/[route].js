import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const route = event.context.params.route;
    const apiUrl = `https://api.coinlore.net/api/${route}`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
