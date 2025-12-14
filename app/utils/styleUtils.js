
export const getTrendClass = change => {
    if(Math.sign(change) === -1) {
        return '!text-red-400';
    } else if(Math.sign(change) === 0 || change === undefined) {
        return '!text-gray-500';
    } else {
        return '!text-progress';
    }
};

export const getBorderClass = change => {
    if (Math.sign(change) === -1) {
        return '!border-red-400';
    } else if (Math.sign(change) === 0) {
        return '!border-gray-500';
    } else {
        return '!border-emerald-400';
    }
};

export const getTrendIcon = number => {
    if(number === 0 || number === undefined) return 'ph:minus';
    return number > 0 ? 'ph:caret-up-duotone' : 'ph:caret-down-duotone';
};


// export const getIcon = symbol => `cryptocurrency-color:${symbol?.toLowerCase()}`;
