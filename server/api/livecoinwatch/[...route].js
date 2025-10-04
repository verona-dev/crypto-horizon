import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const { livecoinwatch_api_key } = useRuntimeConfig().public;
    
    const route = Array.isArray(event.context.params.route)
       ? event.context.params.route.join('/')
       : event.context.params.route;
    const body = await readBody(event);
    const apiUrl = `https://api.livecoinwatch.com/${route}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': livecoinwatch_api_key,
            },
            body: JSON.stringify(body),
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
