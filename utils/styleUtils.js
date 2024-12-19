const getIcon = symbol => `cryptocurrency-color:${symbol?.toLowerCase()}`;

const getTrendColor = change => {
    if(Math.sign(change) === -1) {
        return '!text-red-500';
    }
    
    else if(Math.sign(change) === 0){
        return '!text-gray-500';
    }
    
    else {
        return '!text-green-500';
    }
};

export {
    getIcon,
    getTrendColor,
};