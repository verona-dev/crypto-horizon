
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

const formatLinks = (coingeckoLinks, livecoinwatchLinks) => {
    livecoinwatchLinks = livecoinwatchLinks || {};
    
    const chat = coingeckoLinks.chat_url[0] || null;
    const facebook = coingeckoLinks.facebook_username;
    const forum = coingeckoLinks.official_forum_url[0];
    const github = coingeckoLinks.repos_url?.github;
    
    const homepage = livecoinwatchLinks.website || coingeckoLinks.homepage[0];
    const whitepaper = livecoinwatchLinks.whitepaper || coingeckoLinks.whitepaper;
    
    let links = {
        main: [],
        socials: [],
        github: [],
    };
    
    if(chat) links.main.push({ key: 'chat', value: chat, });
    if(facebook) links.socials.push({ key: "facebook", value: `https://www.facebook.com/${facebook}` });
    if(forum) links.main.push({ key: 'forum', value: forum, });
    if(github) {
        github.forEach((src, index) => {
            links.github.push({ key: `repository ${index + 1}`, value: src, });
        })
    };
    if(homepage) links.main.push({ key: 'homepage', value: homepage });
    if(whitepaper) links.main.push({ key: 'whitepaper', value: whitepaper });
    
    for (let key in livecoinwatchLinks) {
        if (livecoinwatchLinks[key] !== null) {
            if (key !== 'website' && key !== 'whitepaper' && livecoinwatchLinks[key]) {
                links.socials.push({ key: key, value: livecoinwatchLinks[key] });
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

