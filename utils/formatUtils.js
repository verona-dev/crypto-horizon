import { getIcon, getTrendColor } from '~/utils/styleUtils.js';

const formatPrice = number => {
    const options = {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'USD'
    };
    
    return parseFloat(number).toLocaleString('en-US', options);
};

const formatNumber = (number) => {
    if (number === null || number === undefined) return '-';
    
    const absNumber = Math.abs(number);
    let formattedNumber;
    let suffix = '';
    
    const floor = (num) => Math.floor(num * 100) / 100;
    
    if (absNumber >= 1_000_000_000_000) {
        // Trillions
        formattedNumber = floor(number / 1_000_000_000_000);
        suffix = 't';
    } else if (absNumber >= 1_000_000_000) {
        // Billions
        formattedNumber = floor(number / 1_000_000_000);
        suffix = 'b';
    } else if (absNumber >= 1_000_000) {
        // Millions
        formattedNumber = floor(number / 1_000_000);
        suffix = 'm';
    } else if (absNumber >= 1_000) {
        // Thousands
        formattedNumber = floor(number / 1_000);
        suffix = 'k';
    } else {
        // Less than thousand, show the number
        formattedNumber = floor(number);
    }

    return `$${formattedNumber.toFixed(2)}${suffix}`;
};

const formatTableCoins = coins => {
    return coins?.map(coin => ({
        changePercent24Hr: parseFloat(coin.percent_change_24h).toFixed(2),
        explorer: coin.explorer,
        icon: getIcon(coin.symbol),
        id: coin.id,
        marketCap: formatNumber(coin.market_cap_usd),
        name: coin.name,
        nameId: coin.nameid,
        price: formatPrice(coin.price_usd),
        rank: coin.rank,
        c_supply: formatNumber(coin.csupply),
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

