import { DefiLlama } from '@defillama/api';

export default defineEventHandler(async(event) => {
    const route = event.context.params?.route || '';
    
    try {
        const client = new DefiLlama();
        return await client.tvl.getProtocol(route);
    } catch(error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch protocols',
        });
    }
});