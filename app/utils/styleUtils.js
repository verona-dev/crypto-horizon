
export const getTrendClass = change => {
    if(Math.sign(change) === -1) {
        return '!text-destructive';
    } else if(Math.sign(change) === 0 || change === undefined) {
        return '!text-muted-foreground';
    } else {
        return '!text-progress';
    }
};

export const getBorderClass = change => {
    if (Math.sign(change) === -1) {
        return '!border-destructive';
    } else if (Math.sign(change) === 0) {
        return '!border-muted-foreground';
    } else {
        return '!border-progress';
    }
};

export const getTrendIcon = number => {
    if(number === 0 || number === undefined) return 'ph:minus';
    return number > 0 ? 'ph:caret-up-duotone' : 'ph:caret-down-duotone';
};


// export const getIcon = symbol => `cryptocurrency-color:${symbol?.toLowerCase()}`;
