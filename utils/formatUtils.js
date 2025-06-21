import { getIcon, getTrendColor } from '~/utils/styleUtils.js';

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
        changePercent24Hr: parseFloat(coin?.percent_change_24h).toFixed(2),
        icon: getIcon(coin?.symbol),
        id: coin?.id,
        marketCap: formatNumberWithOptions(coin?.market_cap_usd),
        name: coin?.name,
        nameId: coin?.nameid,
        price: formatPrice(coin?.price_usd, 2, 2),
        rank: coin?.rank,
        c_supply: formatNumberWithOptions(coin?.csupply, false),
        symbol: coin?.symbol,
        trend: getTrendColor(coin?.percent_change_24h),
        volume: formatNumberWithOptions(coin?.volume24),
    }))
}


const formatCoin = coin => {
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
        rate: formatPrice(coin?.rate, 2, 4),
        totalSupply: coin?.totalSupply,
        totalSupplyFormatted: formatNumberWithOptions(coin?.totalSupply, false),
        trend: getTrendColor(coin?.changePercent24Hr),
        volume: coin?.volume,
        volumeFormatted: formatNumberWithOptions(coin?.volume),
    }
}

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

export {
    formatNumberWithOptions,
    formatPrice,
    formatCoinsTable,
    formatCoin,
};

