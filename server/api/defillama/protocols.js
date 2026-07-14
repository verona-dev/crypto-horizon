import { DefiLlama } from '@defillama/api';

export default defineEventHandler(async(event) => {
    try {
        const client = new DefiLlama();
        return await client.tvl.getProtocols();
    } catch(error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch protocols',
        });
    }
});