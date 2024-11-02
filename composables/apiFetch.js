const { API_COINCAP_URL } = useRuntimeConfig().public;

export const useCoincapApiFetch = (route) => {
    return $fetch(route, {
        baseURL: API_COINCAP_URL,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
    });
}
