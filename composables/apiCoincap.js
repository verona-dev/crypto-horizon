import { useApiFetch } from '~/composables/apiFetch';
const { API_COINCAP_URL } = useRuntimeConfig().public;

export function useCoincapApiFetch(route) {
    return useApiFetch(API_COINCAP_URL, route, { redirect: 'follow' });
}
