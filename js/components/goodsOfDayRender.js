import DayProductCard from "./goodOfDay.js";
import { filteredByGoodsOfDay } from "../utilities/filters.js";



export default function renderGoodsOfDay(data) { 
    const goodsOfDay = filteredByGoodsOfDay(data);
    const galleryList = document.querySelector('.day-products__list'); 

    goodsOfDay.forEach(goodOfDay => { 
        const listElement = document.createElement('li');
        listElement.classList.add('day-products__item', 'swiper-slide');
        const card = new DayProductCard(goodOfDay);
        const cardEl = card.createCardEl(); 
        listElement.append(cardEl);
        galleryList.append(listElement)
    });
}


