
export async function useFetchLiveCoinWatch(route) {
    try {
        return await $fetch(`/api/livecoinwatch/${route}`);
    } catch (error) {
        console.error('Error fetching Livecoinwatch data:', error);
        return null;
    }
}