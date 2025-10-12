
export async function useFetchCoingecko(route, options = {})  {
    try {
        return await $fetch(`/api/coingecko/${route}`, {
            params: {
                vs_currency: 'usd',
                ...options.query
            },
            ...options
        });
    } catch(error) {
        console.error('Error fetching CoinGecko data', error);
    }
}