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

const formatLinks = (oldLinks, newLinks) => {
    let links = { ...oldLinks };
    
    for (let key in newLinks) {
        if (newLinks.hasOwnProperty(key)) {
            if(newLinks[key] !== null && newLinks[key] !== 'github') {
                links[key] = newLinks[key];
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
    formatLinks,
    capitalize,
    goBack,
};

