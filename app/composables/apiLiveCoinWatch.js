
export async function useFetchLiveCoinWatch(route, options = {}) {
    try {
        return await $fetch(`/api/livecoinwatch/${route}`, {
            method: 'POST',
            body: options
        });
    } catch (error) {
        console.error('Error fetching Livecoinwatch data:', error);
        throw error;
    }
}