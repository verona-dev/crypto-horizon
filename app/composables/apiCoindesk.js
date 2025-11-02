
export async function useFetchCoindesk(route, options = {}) {
    try {
        const data = await $fetch(`/api/coindesk/${route}`, {
            params: {
                lang: 'EN',
                ...options,
            }
        });
        return {
            data,
            error: null,
        }
    } catch(error) {
        return {
            data: null,
            error: {
                statusCode: error.status,
                statusMessage: error.statusText,
            }
        }
    }
}