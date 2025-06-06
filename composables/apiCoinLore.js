
export async function useFetchCoinLoreData(route) {
    try {
        return await $fetch(`/api/coinlore/${route}`);
    } catch (error) {
        console.error('Error fetching CoinLore data:', error);
        return null;
    }
}