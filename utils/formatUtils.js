import { getIcon, getTrendColor } from '~/utils/styleUtils.js';

const formatNumber = number => {
    const options = {
        minimumFractionDigits: 0,
        style: 'currency',
        currency: 'USD'
    };
    
    return parseInt(number).toLocaleString('en-US', options);
};

const formatPrice = number => {
    const options = {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'USD'
    };
    
    return parseFloat(number).toLocaleString('en-US', options);
};

const formatMarketCap = (number) => {
    if (number === null || number === undefined) return '-';
    
    const absNumber = Math.abs(number);
    let formattedNumber;
    let suffix = '';
    
    if (absNumber >= 1_000_000_000_000) {
        // Trillions
        formattedNumber = (number / 1_000_000_000_000).toFixed(2);
        suffix = 't';
    } else if (absNumber >= 1_000_000_000) {
        // Billions
        formattedNumber = (number / 1_000_000_000).toFixed(2);
        suffix = 'b';
    } else if (absNumber >= 1_000_000) {
        // Millions
        formattedNumber = (number / 1_000_000).toFixed(2);
        suffix = 'm';
    } else if (absNumber >= 1_000) {
        // Thousands
        formattedNumber = (number / 1_000).toFixed(2);
        suffix = 'k';
    } else {
        // Less than thousand, just show the number
        formattedNumber = number.toFixed(2);
    }
    
    return `$${formattedNumber}${suffix}`;
};

const formatTableCoins = coins => {
    return coins?.map(coin => ({
        changePercent24Hr: parseFloat(coin.percent_change_24h).toFixed(2),
        explorer: coin.explorer,
        icon: getIcon(coin.symbol),
        id: coin.id,
        marketCap: formatMarketCap(coin.market_cap_usd),
        name: coin.name,
        price: formatPrice(coin.price_usd),
        rank: coin.rank,
        supply: formatNumber(coin.tsupply),
        symbol: coin.symbol,
        trend: getTrendColor(coin.percent_change_24h),
        volume: formatNumber(coin.volume24),
    }))
}


const formatCoin = coin => {
    return {
        changePercent24Hr: parseFloat(coin.changePercent24Hr).toFixed(2),
        explorer: coin.explorer,
        icon: getIcon(coin.symbol),
        id: coin.id,
        marketCap: formatNumber(coin.marketCapUsd),
        name: coin.name,
        price: formatPrice(coin.priceUsd),
        supply: formatNumber(coin.supply),
        symbol: coin.symbol,
        trend: getTrendColor(coin.changePercent24Hr),
        volume: formatNumber(coin.volumeUsd24Hr),
    }
}

export {
    formatNumber,
    formatPrice,
    formatTableCoins,
    formatCoin,
};

