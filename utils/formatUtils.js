import { getIcon, getTrendColor } from '~/utils/styleUtils.js';

const formatPriceRounded = (number, min = 0, max = 0) => {
    const options = {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
        style: 'currency',
        currency: 'USD'
    };
    
    return Number(number).toLocaleString('en-US', options);
};

const formatNumber = (number, usePrefix = true, useSuffix = true) => {
    if (number === null || number === undefined) return '-';
    
    const absNumber = Math.abs(number);
    let formattedNumber;
    let prefix = usePrefix ? '$' : '';
    let suffix = '';
    
    const floor = (num) => Math.floor(num * 100) / 100;
    
    if (absNumber >= 1_000_000_000_000) {
        // Trillions
        formattedNumber = floor(number / 1_000_000_000_000);
        useSuffix && (suffix = 't');
    } else if (absNumber >= 1_000_000_000) {
        // Billions
        formattedNumber = floor(number / 1_000_000_000);
        useSuffix && (suffix = 'b');
    } else if (absNumber >= 1_000_000) {
        // Millions
        formattedNumber = floor(number / 1_000_000);
        useSuffix && (suffix = 'm');
    } else if (absNumber >= 1_000) {
        // Thousands
        formattedNumber = floor(number / 1_000);
        useSuffix && (suffix = 'k');
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
        marketCap: formatNumber(coin?.market_cap_usd),
        name: coin?.name,
        nameId: coin?.nameid,
        price: formatPriceRounded(coin?.price_usd, 0, 2),
        rank: coin?.rank,
        c_supply: formatNumber(coin?.csupply),
        symbol: coin?.symbol,
        trend: getTrendColor(coin?.percent_change_24h),
        volume: formatNumber(coin?.volume24),
    }))
}


const formatCoin = coin => {
    return {
        ...coin,
        allTimeHighUSD: formatPriceRounded(coin?.allTimeHighUSD, 0, 2),
        cap: formatNumber(coin?.cap),
        circulatingSupply: formatNumber(coin?.circulatingSupply, false),
        links: extractLinks(coin?.links),
        liquidity: formatNumber(coin?.liquidity),
        maxSupply: formatNumber(coin?.maxSupply),
        rate: formatPriceRounded(coin?.rate, 0, 2),
        totalSupply: formatNumber(coin?.totalSupply),
        trend: getTrendColor(coin?.changePercent24Hr),
        volume: formatNumber(coin?.volume),
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
    formatNumber,
    formatPriceRounded,
    formatCoinsTable,
    formatCoin,
};

