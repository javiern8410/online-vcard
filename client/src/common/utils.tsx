export const transformPrice = (number, decimals) => {
    const price = number.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
    
    return price;
}

const translations = {
    new: 'Nuevo',
    user: 'Usado'
}

export const getTranslation = (word: string) => {
    return translations[word] || word;
}