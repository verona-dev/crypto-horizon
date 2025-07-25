import { createError, defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async(event) => {
    const { coindesk_api } = useRuntimeConfig().public;
    
    const route = Array.isArray(event.context.params.route)
       ? event.context.params.route.join('/')
       : event.context.params.route;
    const queryEvent = getQuery(event);
    const query = new URLSearchParams(queryEvent).toString();
    const apiUrl = `https://data-api.coindesk.com/${route}?${query}`;
    
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