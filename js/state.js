class State {
    #products = [];
    #filteredProducts = [];
    #pagination = {
        currentPage: 1,
        itemsPerPage: 6
    };
 
    //setters/getters for Products

    //general
    set products(data) {
        this.#products = Array.isArray(data) ? data : [];
        this.#filteredProducts = [...this.#products];
    }

    get products() {
        return this.#products;
    }

    //filtered
    set filteredProducts(array) {
        this.#filteredProducts = Array.isArray(array) ? array : [];
    }

    get filteredProducts() {
        return this.#filteredProducts;
    }

    //setters/getters for Paginations
    set currentPage(page) {
        if (typeof page === 'number' && page > 0) {
            this.#pagination.currentPage = page;
        }
    }

    get currentPage() {
        return this.#pagination.currentPage
    }

    get itemsPerPage() {
        return this.#pagination.itemsPerPage
    }

    get totalPages() {
        return Math.ceil(this.#filteredProducts.length / this.#pagination.itemsPerPage)
    }

    //Reset
    reset() {
        this.#products = [];
        this.#filteredProducts = [];
        this.#pagination.currentPage = 1;
    }
}

const appState = new State();
export default appState;
