import appState from "../state.js";
import fetchProducts from "../utilities/fetchProducts.js"
import renderProductGrid from "./productGrid.js";
import renderPaginationControls from "./pagination.js";
import applyFilters from "../utilities/applyFilters.js";
import sort from "../utilities/sort.js";
import initGallery from "../utilities/gallerySlider.js";
import renderGoodsOfDay from "./goodsOfDayRender.js";

async function updateFromServerView() {
    try {
        const allProductsData = await fetchProducts();
        appState.products = allProductsData;
        renderGoodsOfDay(allProductsData);
        initGallery();
        applyFilters();
        sort();
        const isTooltipHovered = document.querySelector('.tooltip__btn:hover');
        if (!isTooltipHovered) {
            renderProductGrid(); 
        }
        renderPaginationControls();
    } catch (error) {
        console.error('Error while updating data:', error);

    }
}

function updateFilteredView() {
    applyFilters();
    sort();
    renderProductGrid();
    renderPaginationControls();
}

export {
    updateFromServerView,
    updateFilteredView,
}
