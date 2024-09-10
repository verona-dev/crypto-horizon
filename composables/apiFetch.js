export const useApiFetch = (baseURL, route, options) => {
    return $fetch(route, {
        baseURL: baseURL,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        ...options
    });
}
