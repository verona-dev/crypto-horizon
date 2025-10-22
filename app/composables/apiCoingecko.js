
export async function useFetchCoingecko(route, options = {})  {
    try {
        return await $fetch(`/api/coingecko/${route}`, options);
    } catch(error) {
        console.error('Error fetching CoinGecko data', error);
        throw error;
    }
}