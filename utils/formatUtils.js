import { getTextColor } from '~/utils/styleUtils.js';

const formatPrice = (number, min = 2, max = 2) => {
    if (number == null || isNaN(number)) return '-';
    
    const factor = Math.pow(10, max);
    const truncatedNumber = Math.floor(Number(number) * factor) / factor;
    
    const options = {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
        style: 'currency',
        currency: 'USD',
    };
    
    return truncatedNumber.toLocaleString('en-US', options);
};

const formatNumberWithOptions = (number, usePrefix = true, useSuffix = true) => {
    if (number === null || number === undefined) return '-';
    
    const absNumber = Math.abs(number);
    let formattedNumber;
    let prefix = usePrefix ? '$' : '';
    let suffix = '';
    
    const floor = (num) => Math.floor(num * 100) / 100;
    
    if (absNumber >= 1_000_000_000_000) {
        // Trillions
        formattedNumber = floor(number / 1_000_000_000_000);
        useSuffix && (suffix = 'T');
    } else if (absNumber >= 1_000_000_000) {
        // Billions
        formattedNumber = floor(number / 1_000_000_000);
        useSuffix && (suffix = 'B');
    } else if (absNumber >= 1_000_000) {
        // Millions
        formattedNumber = floor(number / 1_000_000);
        useSuffix && (suffix = 'M');
    } else if (absNumber >= 1_000) {
        // Thousands
        formattedNumber = floor(number / 1_000);
        useSuffix && (suffix = 'K');
    } else {
        // Less than thousand, show the number
        formattedNumber = floor(number);
    }
    
    return `${prefix}${formattedNumber.toFixed(2)}${suffix}`;
};

const formatCoinsTable = coins => {
    return coins?.map(coin => ({
        ...coin,
        changePercent24Hr: coin?.price_change_percentage_24h.toFixed(2),
        c_supply: formatNumberWithOptions(coin?.circulating_supply, false),
        icon: coin?.symbol,
        id: coin?.id,
        marketCap: formatNumberWithOptions(coin?.market_cap),
        name: coin?.name,
        price: formatPrice(coin?.current_price, 2, 2),
        rank: coin?.market_cap_rank,
        symbol: coin?.symbol.toUpperCase(),
        trend: getTextColor(coin?.price_change_percentage_24h),
        volume: formatNumberWithOptions(coin?.total_volume),
    }))
};

const formatCoingeckoCoin = coin => {
    return {
        ...coin,
        market_data: {
            ...coin.market_data,
            ath: {
                ...coin.market_data.ath,
                usd: formatPrice(coin.market_data.ath.usd, 2, 2)
            },
            ath_change_percentage: {
                ...coin.market_data.ath_change_percentage,
                usd: coin?.market_data.ath_change_percentage.usd.toFixed(2)
            },
            ath_change_percentage_trend: getTextColor(coin?.market_data.ath_change_percentage.usd),
        },
    }
};

const formatLivecoinwatchCoin = coin => {
    return {
        ...coin,
        allTimeHighUSD: coin?.allTimeHighUSD,
        allTimeHighUSDFormatted: formatPrice(coin?.allTimeHighUSD, 2, 2),
        circulatingSupply: coin?.circulatingSupply,
        circulatingSupplyFormatted: formatNumberWithOptions(coin?.circulatingSupply, false),
        exchanges: coin?.exchanges,
        links: extractLinks(coin?.links),
        liquidity: coin?.liquidity,
        liquidityFormatted: formatNumberWithOptions(coin?.liquidity),
        marketCap: coin?.cap,
        marketCapFormatted: formatNumberWithOptions(coin?.cap),
        maxSupply: coin?.maxSupply,
        maxSupplyFormatted: formatNumberWithOptions(coin?.maxSupply, false),
        rate: coin?.rate,
        rateFormatted: formatPrice(coin?.rate, 0, 2),
        totalSupply: coin?.totalSupply,
        totalSupplyFormatted: formatNumberWithOptions(coin?.totalSupply, false),
        trend: getTextColor(coin?.changePercent24Hr),
        volume: coin?.volume,
        volumeFormatted: formatNumberWithOptions(coin?.volume),
    }
};

const extractLinks = (externalLinks) => {
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

const getDeltaPercentage = (delta, currentPrice) => {
    return (delta - 1) * 100;
};

export {
    formatNumberWithOptions,
    formatPrice,
    formatCoinsTable,
    formatCoingeckoCoin,
    formatLivecoinwatchCoin,
    getDeltaPercentage,
};

