
export async function useFetchCoingecko(route, options)  {
    try {
        return await $fetch(`/api/coingecko/${route}`, {
            query: { vs_currency: 'usd' },
            ...options
        });
    } catch(error) {
        console.error('Error fetching CoinGecko data', error);
    }
}

/*
export const useCoingeckoHistoricalChartData = (coin, days) => {
    const params = new URLSearchParams();
    params.append('vs_currency', 'usd');
    params.append('interval', 'daily');
    days && params.append('days', days);
    const chartData = `coins/${coin}/market_chart?${params}`;
}
*/
