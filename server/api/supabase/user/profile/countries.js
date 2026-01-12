import countries from '~/assets/data/countries.json';

export default defineCachedEventHandler(() => {
    try {
        if(!countries) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Countries data is missing or invalid',
            })
        }
        
        return countries;
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to load countries data.',
        })
    }
}, { maxAge: 60 * 60 * 24 * 30 });