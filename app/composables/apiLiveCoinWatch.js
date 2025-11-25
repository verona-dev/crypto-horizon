
export async function useFetchLiveCoinWatch(route, options = {}) {
    try {
        const data = await $fetch(`/api/livecoinwatch/${route}`, {
            method: 'POST',
            body: options
        });
        
        return {
            data,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: {
                statusCode: error.status,
                statusMessage: error.statusText,
            }
        }
    }
}