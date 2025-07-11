import { createError, defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    const { coingeckoApiKey } = useRuntimeConfig().public;
    
    const route = event.context.params?.route || '';
    const queryEvent = getQuery(event);
    const query = new URLSearchParams(queryEvent).toString();
    const apiUrl = `https://api.coingecko.com/api/v3/${route}?${query}`;
    
    const storage = useStorage();
    const cacheKey = `coingecko-${route}-${query}`;
    const cacheTTL = 60 * 5;
    let data;
    
    try {
        data = await storage.getItem(cacheKey);
        
        if (data) return data;
        
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
        
        data = await response.json();
        
        await storage.setItem(cacheKey, data, cacheTTL);
        
        return data;
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
});