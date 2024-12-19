import { useCoinGeckoApi } from '~/composables/apiFetch';

export const useCoingeckoHistoricalChartData = (coin, days) => {
    const params = new URLSearchParams();
    params.append('vs_currency', 'usd');
    params.append('interval', 'daily');
    days && params.append('days', days);
    const chartData = `coins/${coin}/market_chart?${params}`;
    return useCoinGeckoApi(chartData);
}