import ProductCard from "./productCard.js";

export default class DayProductCard extends ProductCard {
    constructor(productData) {
        super(productData);
    }

    createCardEl() {
        const goodOfDayCard = super.createCardEl(); 
        goodOfDayCard.classList.add('product-card--small'); 
        return goodOfDayCard;
    }
}


