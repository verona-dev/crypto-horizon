
export async function useFetchDefillama(route) {
    try {
        return await $fetch(`/api/defillama/${route}`);
    } catch(error) {
        console.error('Error fetching Defillama data: ', error);
        throw error;
    }
}