import { getTrendClass } from '~/utils/styleUtils.js';

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
    
    if (style === 'percent') {
        num = num / 100;
        // minimumFractionDigits = 2;
        // maximumFractionDigits = 2;
    } else {
        if (num > 0 && num < 0.000001) {
            minimumFractionDigits = 8;
            maximumFractionDigits = 12;
        } else if (num >= 0.000001 && num < 0.0001) {
            minimumFractionDigits = 6;
            maximumFractionDigits = 8;
        } else if (num >= 0.0001 && num < 0.001) {
            minimumFractionDigits = 4;
            maximumFractionDigits = 6;
        } else if (num >= 0.001 && num < 0.01) {
            minimumFractionDigits = 4;
            maximumFractionDigits = 4;
        } else if (num >= 0.01 && num < 1) {
            minimumFractionDigits = 3;
            maximumFractionDigits = 3;
        } else if (num >= 1 && num < 10) {
            minimumFractionDigits = 2;
            maximumFractionDigits = 2;
        } else if (num >= 1000) {
            minimumFractionDigits = decimals;
            maximumFractionDigits = decimals;
        }
    }
    
    let options = {
        style,
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
        notation: compact ? 'compact' : 'standard',
        roundingMode,
    };
    
    // truncate for stablecoins to display $0.99 instead of $1
    if (truncate) {
        const factor = Math.pow(10, maximumFractionDigits);
        num = Math.sign(num) * Math.floor(Math.abs(num) * factor) / factor;
    }
    
    return new Intl.NumberFormat(locale, options).format(num);
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
            volume_label: formatNumber(coin.market_data.total_volume?.usd),
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
    formatCoingeckoCoin,
    formatLivecoinwatchCoin,
    capitalize,
    goBack,
};

