
export async function useFetchCoingecko()  {
    try {
        return await $fetch('/api/coingecko/coins/markets', {
            query: { vs_currency: 'usd' }
        });
    } catch(error) {
        console.error('Error fetching CoinLore data', error);
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
