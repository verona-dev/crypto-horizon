import { createError, getQuery } from 'h3';

export default defineCachedEventHandler(async (event) => {
    const { coingeckoApiKey } = useRuntimeConfig().public;
    
    const route = event.context.params?.route || '';
    const queryEvent = getQuery(event);
    const query = new URLSearchParams(queryEvent).toString();
    const apiUrl = `https://api.coingecko.com/api/v3/${route}?${query}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': coingeckoApiKey,
            },
            redirect: 'follow',
        });
        
        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: response.statusText,
            });
        }
        
        return await response.json();
    } catch(error) {
        if (error.statusCode) {
            throw error;
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to fetch CoinGecko data',
            });
        }
    }
}, { maxAge: 60 * 10 });