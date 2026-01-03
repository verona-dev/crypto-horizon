import { createError, getQuery } from 'h3';

export default defineCachedEventHandler(async (event) => {
    const { cmc_api_key } = useRuntimeConfig();
    
    const route = event.context.params?.route || '';
    const queryEvent = getQuery(event);
    const query = new URLSearchParams(queryEvent).toString();
    const apiUrl = `https://pro-api.coinmarketcap.com/${route}?${query}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CMC_PRO_API_KEY': cmc_api_key,
            },
            redirect: 'follow',
        });
        
        if(!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: response.statusText,
            })
        }
        
        return await response.json();
        
    } catch(error) {
        if (error.statusCode) {
            throw error;
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to fetch Cmc data',
            });
        }
    }
}, { maxAge: 60 * 60 });