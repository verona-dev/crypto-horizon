
export async function useFetchCoinLoreData(route, options = {}) {
    const { start = 0, limit = 20 } = options;
    
    const params = new URLSearchParams();
    start && params.append('start', start);
    limit && params.append('limit', limit);
    
    try {
        return await $fetch(`/api/coinlore/${route}/?${params.toString()}`);
    } catch (error) {
        console.error('Error fetching CoinLore data:', error);
        return null;
    }
}