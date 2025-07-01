import { defineStore } from 'pinia';
import { useFetchCoinLoreData } from '~/composables/apiCoinLore.js';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { formatLivecoinwatchCoin, formatCoinsTable, formatCoingeckoCoin } from '~/utils/formatUtils.js';
import { useFetchLiveCoinWatch } from '~/composables/apiLiveCoinWatch.js';

export const useCryptocurrenciesStore = defineStore('CryptocurrenciesStore', {
    state: () => ({
        coins: [],
        coinsList: [],
        coin: {
            coingecko: {},
            livecoinwatch: {},
            symbol: '',
        },
        coinCg: {},
        coinChartData: {},
        loading: false,
        marketOverview: [],
    }),
    
    actions: {
        async setCoin(coinId) {
            await this.fetchCoingeckoCoin(coinId);
            this.coin.symbol = this.coin?.coingecko?.symbol?.toUpperCase() || '';
            await this.fetchLiveCoinWatch('coins/single', { code: this.coin.symbol, meta: true });
        },
        
        async fetchCoingecko(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko(route, options);
                
                if(route === 'coins/markets') {
                    this.coins = [];
                    this.coins = formatCoinsTable(response);
                }
            }
            catch(error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async fetchCoingeckoCoin(coinId) {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko(`coins/${coinId}`);
                
                if(response) {
                    this.coin.coingecko = formatCoingeckoCoin(response);
                }
            }
            catch(error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async fetchCoinLore(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoinLoreData(route, options);
                
                if(route === 'global') {
                    this.marketOverview = [];
                    this.marketOverview = response[0];
                }
                
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        
        async fetchLiveCoinWatch(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchLiveCoinWatch(route, options);
                
                if(route === 'coins/single') {
                    this.coin.livecoinwatch = formatLivecoinwatchCoin(response);
                    // console.log(JSON.parse(JSON.stringify(this.coin.coingecko)));
                }
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        
        /*
        async fetchCoingeckoHistoricalChartData(coin, days) {
            this.loading = true;
            
            try {
                this.coinChartData = await useCoingeckoHistoricalChartData(coin, days);
                console.log(JSON.parse(JSON.stringify(this.coinChartData)));
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        },
        */
    },
});
