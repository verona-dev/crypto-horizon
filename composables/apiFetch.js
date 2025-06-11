
export const useCoinGeckoApi = (route) => {
    const { coingecko_api_key } = useRuntimeConfig().public;
    return $fetch(route, {
        baseURL: 'https://api.coingecko.com/api/v3',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-cg-demo-api-key': coingecko_api_key,
        },
        redirect: 'follow',
    });
}