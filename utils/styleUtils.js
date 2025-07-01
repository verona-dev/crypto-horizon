
export const getTextColor = change => {
    if(Math.sign(change) === -1) {
        return '!text-red-400';
    } else if(Math.sign(change) === 0){
        return '!text-gray-500';
    } else {
        return '!text-emerald-400';
    }
};

export const getBorderColor = change => {
    if (Math.sign(change) === -1) {
        return '!border-red-400';
    } else if (Math.sign(change) === 0) {
        return '!border-gray-500';
    } else {
        return '!border-emerald-400';
    }
};

// export const getIcon = symbol => `cryptocurrency-color:${symbol?.toLowerCase()}`;
