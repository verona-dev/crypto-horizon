
export async function useFetchCoingecko(route, options = {})  {
    try {
        return await $fetch(`/api/coingecko/${route}`, {
            ...options,
            cache: 'no-store',
        });
    } catch(error) {
        console.error('Error fetching CoinGecko data', error);
        throw error;
    }
}