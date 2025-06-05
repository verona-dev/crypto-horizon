const { coingecko_api_key } = useRuntimeConfig().public;
const { coincap_api_key } = useRuntimeConfig().public;

export const useCoincapApi = (route) => {
    return $fetch(route, {
        baseURL: 'https://api.coincap.io/v3',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + coincap_api_key
        },
        redirect: 'follow',
    });
}

export const useCoinGeckoApi = (route) => {
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