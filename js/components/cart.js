class CartItem {
    constructor({ id, name, priceNew, image, articleCount }) {
        this.id = id;
        this.name = name;
        this.price = priceNew;
        this.image = image;
        this.articleCount = articleCount;
    }
}

class Cart {
    #cartItems = [];
    addToCart(product) {
        const addedItem = this.#cartItems.find(item => item.id == product.id);
        if (addedItem) {
            addedItem.articleCount++;
        } else {
            const newItemInCart = new CartItem(product);
            newItemInCart.articleCount = 1;
            this.#cartItems.push(newItemInCart)
        }
    }

    get addedToCart() {
        return this.#cartItems;
    }

    refreshCartCount() {
        const count = this.#cartItems.reduce(
            (accumulator, item) => accumulator + item.articleCount,
            0,
        );
        document.querySelector('.header__user-count').textContent = count;
    }

    renderCart() {
        const cartList = document.querySelector('.basket__list');
        const emptyBlock = document.querySelector('.basket__empty-block');
        cartList.innerHTML = '';
        this.#cartItems.forEach(cartItem => {
            const listElement = this.createListEl(cartItem);
            cartList.append(listElement);
        });


        this.addBtn = this.addBuyBtn();
        if (this.addBtn) {
            cartList.append(this.addBtn);
        }

        if (this.#cartItems.length > 0) {
            emptyBlock.classList.add('basket__empty-block--hidden');
        } else {
            emptyBlock.classList.remove('basket__empty-block--hidden');
        }
    }


    createListEl(cartItem) {
        const listElement = document.createElement('li');
        listElement.dataset.id = cartItem.id;
        listElement.classList.add('basket__item');

        const cartImgWrapper = document.createElement('div');
        cartImgWrapper.classList.add('basket__img');
        const cartImg = document.createElement('img');
        cartImg.src = cartItem.image;
        cartImg.alt = 'Фотография товара';
        cartImg.setAttribute('height', '60');
        cartImg.setAttribute('width', '60');

        const cartNameEl = document.createElement('span');
        cartNameEl.classList.add('basket__name');
        cartNameEl.textContent = cartItem.name;

        const priceEl = document.createElement('span');
        priceEl.classList.add('basket__price');
        priceEl.textContent = cartItem.price * cartItem.articleCount + ' р.';

        const controlsWrapper = document.createElement('div');
        controlsWrapper.classList.add('basket__controls');

        const minusBtn = document.createElement('button');
        minusBtn.classList.add('basket__change-btn', 'basket__change-btn--minus', 'btn');
        minusBtn.type = 'button';
        minusBtn.textContent = '−';

        const countEl = document.createElement('span');
        countEl.classList.add('basket__count');
        countEl.textContent = cartItem.articleCount;

        const plusBtn = document.createElement('button');
        plusBtn.classList.add('basket__change-btn', 'basket__change-btn--plus', 'btn');
        plusBtn.type = 'button';
        plusBtn.textContent = '+';

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('basket__item-close');
        closeBtn.type = 'button';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('main-menu__icon');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('aria-hidden', 'true');
        
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-close');


        svg.appendChild(use);
        closeBtn.appendChild(svg);
        controlsWrapper.append(minusBtn, countEl, plusBtn);
        cartImgWrapper.append(cartImg);
        listElement.append(cartImgWrapper, cartNameEl, priceEl, controlsWrapper, closeBtn);
        return listElement;
    }

    addBuyBtn() {
        if (this.#cartItems.length > 0) {
            const buyBtn = document.createElement('a');
            buyBtn.classList.add('basket__link', 'btn');
            buyBtn.href = '#';
            buyBtn.textContent = 'Перейти к оформлению';
            return buyBtn;
        }
    }

    manageExisting(id, action) {
        const existingItem = this.#cartItems.find(item => item.id == id);
        if (!existingItem) return;
        if (action == '+') {
            existingItem.articleCount++;
        } else if (action == '-') {
            existingItem.articleCount > 1
                ? existingItem.articleCount--
                : this.removeCart(id);
        }

        return existingItem;
    }

    removeCart(id) {
        this.#cartItems = this.#cartItems.filter(cartItem => cartItem.id != id);
        requestAnimationFrame(() => {
            this.renderCart();  
        }); 
    }
}

//creating a cart instance here
const myCart = new Cart();
export default myCart;

