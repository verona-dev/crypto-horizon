import { getTextColor } from '~/utils/styleUtils.js';

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
        locale,
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
    
    return `${prefix}${formattedNumber}${suffix}`;
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
        price: formatNumber(coin?.current_price, 2, 2),
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
                usd: formatNumber(coin.market_data.ath.usd, 2, 2)
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
        allTimeHighUSDFormatted: formatNumber(coin?.allTimeHighUSD, 2, 2),
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
        rateFormatted: formatNumber(coin?.rate, 0, 2),
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

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

export {
    formatNumberWithOptions,
    formatNumber,
    formatCoinsTable,
    formatCoingeckoCoin,
    formatLivecoinwatchCoin,
    getDeltaPercentage,
    capitalize,
};

