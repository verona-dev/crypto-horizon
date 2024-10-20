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

export { formatNumber, formatPrice };

