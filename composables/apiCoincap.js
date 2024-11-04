import { useCoincapApi } from '~/composables/apiFetch';
const assets = '/assets';

export function useCoincapFetchCoins() {
    return useCoincapApi(assets);
}

export function useCoincapFetchCoin(coin) {
    return useCoincapApi(`${assets}/${coin}`);
}