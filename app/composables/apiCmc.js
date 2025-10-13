
export async function useFetchCmc(route, options= {}) {
    try {
        return await $fetch(`/api/cmc/${route}`, options)
    } catch(error) {
        console.error('Error fetching Cmc data: ', error);
        throw error;
    }
}