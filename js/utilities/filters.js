function filterByAvailability(products) {
    const availableItemsCheck = document.querySelector('input[value="instock"]');
    const cityEl = document.querySelector('[data-city]');
    const city = cityEl?.dataset.city || 'all';
    
    if (availableItemsCheck?.checked) {
        if (city === 'all') {
            return products.filter(product => {
                const stock = Object.values(product.availability || {});
                return stock.some(count => count > 0);
            });
        } else {
            return products.filter(product => product.availability?.[city] > 0);
        }
    }    
    return products;
}

function filterByCategory(products) {
    const checkBtns = document.querySelectorAll('.catalog-form__fieldset input[type="checkbox"]');
    const checkBtnsCheckedValues = Array.from(checkBtns)
        .filter(checkbox => checkbox.checked)
        .map(checkboxActive => checkboxActive.value);
    const filteredByCategories = products
        .filter(product => checkBtnsCheckedValues.every(item => product.type.includes(item)));    
    return filteredByCategories;
}

function filteredByGoodsOfDay (data) {
    const goodOfDay = data.filter((array) => array.goodsOfDay);
    return goodOfDay;
}

export {
    filterByAvailability,
    filterByCategory,
    filteredByGoodsOfDay,
}