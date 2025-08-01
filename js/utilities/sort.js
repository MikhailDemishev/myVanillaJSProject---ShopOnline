import appState from "../state.js";
export default function sort() {
    const sortOption = document.querySelector('.catalog__sort-select').value;
    const filteredList = appState.filteredProducts;
    let sortedList;
    switch (sortOption) {
        case "price-min":
            sortedList = [...filteredList].sort((a, b) => a.price.new - b.price.new); 
            break;
        case "price-max":
            sortedList = [...filteredList].sort((a, b) => b.price.new - a.price.new);
            //test
            const pricesListForTestDown = sortedList.map(obj => obj.price.new)
            break;
        case "rating-max":
            sortedList = [...filteredList].sort((a, b) => b.rating - a.rating);
            const byRating = sortedList.map(obj => obj.rating)
            break;
    }


    appState.filteredProducts = sortedList;

}