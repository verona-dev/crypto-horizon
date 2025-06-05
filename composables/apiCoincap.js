
export async function useFetchCoincapData(route) {
    try {
        return await $fetch(`/api/coincap/${route}`);
    } catch (error) {
        console.error('Error fetching CoinCap data:', error);
        return null;
    }
}

export function useCoincapFetchCoin(coin) {
    // return useCoincapApi(`${assets}/${coin}`);
}