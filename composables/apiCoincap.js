import { useCoincapApiFetch } from '~/composables/apiFetch';
const assets = '/assets';

export function useCoincapApiFetchCoins() {
    return useCoincapApiFetch(assets);
}

export function useCoincapApiFetchCoin(coin) {
    return useCoincapApiFetch(`${assets}/${coin}`);
}