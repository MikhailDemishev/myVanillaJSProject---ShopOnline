import ProductCard from "./productCard.js";
import appState from "../state.js";

export default function renderProductGrid(data = appState.filteredProducts) {
    const catalogList = document.querySelector('.catalog__list');
    catalogList.innerHTML = ''; 
    const {currentPage, itemsPerPage} = appState;
    const start = (currentPage-1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start,end); 

    paginatedData.forEach(dataArray => {
        const listElement = document.createElement('li');
        listElement.classList.add('catalog__item');
        const newCard = new ProductCard(dataArray);
        const cardEl = newCard.createCardEl();
        listElement.append(cardEl);
        catalogList.append(listElement)
    });
}

