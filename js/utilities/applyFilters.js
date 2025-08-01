import appState from "../state.js";
import showStockByCity from "../components/showStock.js";
import { filterByAvailability,filterByCategory } from "./filters.js";

export default function applyFilters() {


    let filtered = filterByAvailability(appState.products);
    showStockByCity(filtered);
    filtered = filterByCategory(filtered);

    appState.filteredProducts = filtered;
    if (appState.currentPage > appState.totalPages) {
        appState.currentPage = 1;
    }


}


