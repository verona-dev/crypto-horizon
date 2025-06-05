
export async function useFetchCoinLoreData(route) {
    console.log(route);
    try {
        return await $fetch(`/api/coinlore/${route}`);
    } catch (error) {
        console.error('Error fetching CoinLore data:', error);
        return null;
    }
}