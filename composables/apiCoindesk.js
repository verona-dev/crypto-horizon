
export async function useFetchCoindesk(route, options = {}) {
    try {
        return await $fetch(route, {
            method: 'GET',
            body: options,
        });
    } catch(error) {
        console.error('Error fetching Coindesk data: ', error);
        return null;
    }
}