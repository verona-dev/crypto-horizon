
export async function useFetchCoindesk(route, options = {}) {
    try {
        return await $fetch(`/api/coindesk/${route}`, {
            params: {
                lang: 'EN',
                ...options,
            }
        });
    } catch(error) {
        console.error('Error fetching Coindesk data: ', error);
        throw error;
    }
}