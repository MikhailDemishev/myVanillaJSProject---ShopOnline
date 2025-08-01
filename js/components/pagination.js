import appState from "../state.js";
import renderProductGrid from "./productGrid.js";

export default function renderPaginationControls() {
    const paginationList = document.querySelector('.catalog__pagination');
    paginationList.innerHTML = '';
    const { totalPages, currentPage } = appState;

    for (let i = 1; i <= totalPages; i++) {
        const listEl = document.createElement('li');
        listEl.classList.add('catalog__pagination-item');

        const paginationBtnEl = document.createElement('button');
        paginationBtnEl.classList.add('catalog__pagination-link');
        paginationBtnEl.type = "button";
        paginationBtnEl.textContent = i;

        if (i === currentPage) paginationBtnEl.disabled = true;


        paginationBtnEl.addEventListener('click', () => {
            appState.currentPage = i;
            renderProductGrid();
            renderPaginationControls();
        });

        listEl.append(paginationBtnEl);
        paginationList.append(listEl);

    }

}

 