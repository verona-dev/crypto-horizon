import { getIcon } from '~/utils/styleUtils.js';
const formatNumber = number => {
    const options = {
        minimumFractionDigits: 0,
        style: "currency",
        currency: "USD"
    };
    
    return parseInt(number).toLocaleString('en-US', options);
};

const formatPrice = number => {
    const options = {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "USD"
    };
    
    return parseFloat(number).toLocaleString('en-US', options);
};

const formatTableCoins = coins => {
    return coins?.map(row => ({
        changePercent24Hr: parseFloat(row.changePercent24Hr).toFixed(2),
        explorer: row.explorer,
        icon: getIcon(row.symbol),
        id: row.id,
        marketCap: formatNumber(row.marketCapUsd),
        name: row.name,
        price: formatPrice(row.priceUsd),
        supply: formatNumber(row.supply),
        symbol: row.symbol,
        trend: getTrendColor(row.changePercent24Hr),
        volume: formatNumber(row.volumeUsd24Hr),
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

