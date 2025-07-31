import { defineStore } from 'pinia';
import { useFetchCoinLoreData } from '~/composables/apiCoinLore.js';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { useFetchLiveCoinWatch } from '~/composables/apiLiveCoinWatch.js';
import { useFetchCoindesk } from '~/composables/apiCoindesk.js';
import { formatCoingeckoCoin, formatCoinsTable, formatLivecoinwatchCoin } from '~/utils/formatUtils.js';

export const useCryptocurrenciesStore = defineStore('CryptocurrenciesStore', {
    state: () => ({
        coins: [],
        coin: {
            coingecko: {},
            livecoinwatch: {},
            symbol: '',
            chart: {},
        },
        loading: false,
        marketOverview: [],
        news: {},
        article: {},
    }),
    
    actions: {
        async getCoin(coinId) {
            await this.getCoingeckoCoin(coinId);
            this.coin.symbol = this.coin?.coingecko?.symbol?.toUpperCase() || '';
            await this.fetchLiveCoinWatch('coins/single', { code: this.coin.symbol, meta: true });
        },
        
        async getCoingeckoMarkets(options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko('coins/markets', options);
                
                if(response) {
                    this.coins = [];
                    this.coins = formatCoinsTable(response);
                }
            }
            catch(error) {
                console.error(error)
            }
            finally {
                this.loading = false;
            }
        },
        
        async getCoingeckoCoin(coinId) {
            this.loading = true;
            
            try {
                const [coinResponse, chartResponse] = await Promise.all([
                    useFetchCoingecko(`coins/${coinId}`),
                    useFetchCoingecko(`coins/${coinId}/market_chart`, {
                        query: {
                            days: 7,
                            precision: 5,
                        }
                    })
                ]);
                
                if (coinResponse) {
                    this.coin.coingecko = formatCoingeckoCoin(coinResponse);
                }
                
                if (chartResponse) {
                    this.coin.chart = chartResponse;
                }
            }
            catch(error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async getCoingeckoCoinListSummary(options) {
            try {
                return await useFetchCoingecko('coins/markets', options);
            }
            catch(error) {
                console.error(error);
            }
        },
        
        async getCoindeskNews() {
            this.loading = true;
            
            try {
                const response = await useFetchCoindesk('news/v1/article/list', {
                    limit: 20,
                });
                
                if(response && response.Data) {
                    this.news = response.Data;
                }
            } catch(error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async getCoindeskNewsSingle(source_key, guid) {
          this.loading = true;
          
          try {
              const response = await useFetchCoindesk('news/v1/article/get', {
                  source_key,
                  guid,
              });
              
              if(response && response.Data) {
                  this.article = response.Data;
                  console.log(JSON.parse(JSON.stringify(this.article)));
              }
          } catch(error) {
              console.error(error);
          }
          finally {
              this.loading = false;
          }
        },
        
        async getCoinLore(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoinLoreData(route, options);
                
                if(response && route === 'global') {
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
                
                if(response && route === 'coins/single') {
                    this.coin.livecoinwatch = formatLivecoinwatchCoin(response);
                }
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
});
