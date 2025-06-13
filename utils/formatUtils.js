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

const formatPriceWithSuffix = (number) => {
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
        icon: getIcon(coin.symbol),
        id: coin.id,
        marketCap: formatPriceWithSuffix(coin.market_cap_usd),
        name: coin.name,
        nameId: coin.nameid,
        price: formatPriceRounded(coin.price_usd, 0, 2),
        rank: coin.rank,
        c_supply: formatPriceWithSuffix(coin.csupply),
        symbol: coin.symbol,
        trend: getTrendColor(coin.percent_change_24h),
        volume: formatPriceWithSuffix(coin.volume),
    }))
}


const formatCoin = coin => {
    return {
        ...coin,
        allTimeHighUSD: formatPriceRounded(coin.allTimeHighUSD),
        cap: formatPriceWithSuffix(coin.cap),
        circulatingSupply: formatPriceWithSuffix(coin.circulatingSupply),
        liquidity: formatPriceWithSuffix(coin.liquidity),
        maxSupply: formatPriceWithSuffix(coin.maxSupply),
        rate: formatPriceRounded(coin.rate),
        totalSupply: formatPriceWithSuffix(coin.totalSupply),
        trend: getTrendColor(coin.changePercent24Hr),
        volume: formatPriceWithSuffix(coin.volume),
    }
}

export {
    formatPriceWithSuffix,
    formatPriceRounded,
    formatTableCoins,
    formatCoin,
};

