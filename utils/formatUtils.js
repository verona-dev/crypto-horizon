import { getTextColorClass } from '~/utils/styleUtils.js';

const formatNumber = (value, {
       locale = 'en-US',
       style = 'currency',
       currency = 'USD',
       decimals = 0,
       minimumFractionDigits = 2,
       maximumFractionDigits = 2,
       compact = false,
       truncate = false,
       roundingMode = 'floor',
   } = {}
) => {
    if (value == null || isNaN(value)) return '-';
    
    let num = Math.abs(Number(value));
    
    let options = {
        style,
        currency,
        minimumFractionDigits: Math.abs(num) > 10000 ? decimals : minimumFractionDigits,
        maximumFractionDigits: Math.abs(num) > 10000 ? decimals : maximumFractionDigits,
        notation: compact ? 'compact' : 'standard',
        roundingMode,
    };
    
    // truncate for stablecoins to display $0.99 instead of $1
    if (truncate) {
        const factor = Math.pow(10, maximumFractionDigits);
        num = Math.sign(num) * Math.floor(Math.abs(num) * factor) / factor;
    }
    
    if(style === 'percent') {
        num = num / 100;
    }
    
    return new Intl.NumberFormat(locale, options).format(num);
};

const formatCoinsTable = coins => {
    return coins?.map(coin => ({
        ...coin,
        changePercent24Hr: coin?.price_change_percentage_24h.toFixed(2),
        c_supply: formatNumber(coin?.circulating_supply, {
            compact: true, style: 'decimal', decimals: 2
        }),
        icon: coin?.symbol,
        id: coin?.id,
        marketCap: formatNumber(coin?.market_cap, {
            compact: true, decimals: 2
        }),
        name: coin?.name,
        price: formatNumber(coin?.current_price, {
            maximumFractionDigits: 4,
        }),
        rank: coin?.market_cap_rank,
        symbol: coin?.symbol.toUpperCase(),
        trend: getTextColorClass(coin?.price_change_percentage_24h),
        volume: formatNumber(coin?.total_volume, {
            compact: true, decimals: 2
        }),
    }));
};

const formatCoingeckoCoin = coin => {
    return {
        ...coin,
        market_data: {
            ...coin.market_data,
            market_cap_label: formatNumber(coin.market_data.market_cap.usd),
            max_supply_label: formatNumber(coin.market_data.max_supply, {
                style: 'decimal'
            }),
            total_supply_label: formatNumber(coin.market_data.total_supply, {
                style: 'decimal'
            }),
            circulating_supply_label: formatNumber(coin.market_data.circulating_supply, {
                style: 'decimal'
            }),
        },
    }
};

const formatLivecoinwatchCoin = coin => {
    return {
        ...coin,
        links: extractLinks(coin?.links),
    }
};

const extractLinks = externalLinks => {
    let links = {
        socials: {},
    };
    
    for (let key in externalLinks) {
        if (externalLinks.hasOwnProperty(key)) {
            if(key === 'website' || key === 'whitepaper') {
                links[key] = externalLinks[key];
            } else {
                if(externalLinks[key] !== null) {
                    links.socials[key] = externalLinks[key];
                }
            }
        }
    }
    
    return links;
};

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

const goBack = (router, path) => {
    const history = window.history.length > 1;
    if(history) return router.back();
    else return router.push(path);
};

export {
    formatNumber,
    formatCoinsTable,
    formatCoingeckoCoin,
    formatLivecoinwatchCoin,
    capitalize,
    goBack,
};

