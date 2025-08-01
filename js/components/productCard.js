import myCart from "./cart.js";

export default class ProductCard {
  constructor({
    id,
    name = '',
    price = { new: 0, old: 0 },
    image = '',
    availability = { moscow: 0, orenburg: 0, saintPetersburg: 0 },
    type = [],
    rating = 0,
    goodsOfDay = false
  }) {
    this.id = id;
    this.name = name;
    this.priceNew = price.new;
    this.priceOld = price.old;
    this.image = image;
    this.availability = availability;
    this.type = type;
    this.rating = rating;
    this.goodsOfDay = goodsOfDay;
  }

  createCardEl() {
    //card itself
    this.itemCardEl = document.createElement('div');
    this.itemCardEl.classList.add('product-card');
    this.itemCardEl.dataset.id = this.id;
    this.productCardVisual = this.createVisualPartCard();
    this.productCardInfo = this.createInfoPart();

    this.itemCardEl.append(this.productCardVisual, this.productCardInfo);
    this.addListeners();
    return this.itemCardEl
  }


  createVisualPartCard() {
    // Create wrapper for image and buttons
    const visualWrapper = document.createElement('div');
    visualWrapper.classList.add('product-card__visual');

    // Product image
    const img = document.createElement('img');
    img.classList.add('product-card__img');
    img.src = this.image;
    img.alt = 'Изображение товара';
    img.width = 290;
    img.height = 436;

    // Buttons block
    const moreBlock = document.createElement('div');
    moreBlock.classList.add('product-card__more');

    // "Add to cart" button
    this.btnAddToCart = document.createElement('button');
    this.btnAddToCart.classList.add('product-card__link', 'btn', 'btn--icon');
    this.btnAddToCart.type = 'button';


    const btnTextAdd = document.createElement('span');
    btnTextAdd.classList.add('btn__text');
    btnTextAdd.textContent = 'В корзину';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-basket');

    svg.appendChild(use);
    this.btnAddToCart.append(btnTextAdd, svg);

    // "More details" button
    this.btnDetails = document.createElement('a');
    this.btnDetails.classList.add('product-card__link', 'btn', 'btn--secondary');
    this.btnDetails.href = '#';

    const btnTextDetails = document.createElement('span');
    btnTextDetails.classList.add('btn__text');
    btnTextDetails.textContent = 'Подробнее';

    this.btnDetails.appendChild(btnTextDetails);

    // Append buttons to container
    moreBlock.append(this.btnAddToCart, this.btnDetails);

    // Assemble visual block
    visualWrapper.append(img, moreBlock);

    return visualWrapper;
  }

  createInfoPart() {

    const infoBlock = document.createElement('div');
    infoBlock.classList.add('product-card__info');

    // Title
    const infoBlockTitle = document.createElement('h2');
    infoBlockTitle.classList.add('product-card__title');
    infoBlockTitle.textContent = this.name;

    // Old price block
    const oldPrice = document.createElement('span');
    oldPrice.classList.add('product-card__old');

    const oldPriceNumber = document.createElement('span');
    oldPriceNumber.classList.add('product-card__old-number');
    oldPriceNumber.textContent = this.priceOld.toLocaleString();

    const oldPriceAdd = document.createElement('span');
    oldPriceAdd.classList.add('product-card__old-add');
    oldPriceAdd.textContent = '₽';

    oldPrice.append(oldPriceNumber, oldPriceAdd);

    // New price block
    const newPrice = document.createElement('span');
    newPrice.classList.add('product-card__price');

    const newPriceNumber = document.createElement('span');
    newPriceNumber.classList.add('product-card__price-number');
    newPriceNumber.textContent = this.priceNew.toLocaleString();

    const newPriceAdd = document.createElement('span');
    newPriceAdd.classList.add('product-card__price-add');
    newPriceAdd.textContent = '₽';

    newPrice.append(newPriceNumber, newPriceAdd);

    const toolTip = this.createToolTip()

    // Assemble info block
    infoBlock.append(infoBlockTitle, oldPrice, newPrice, toolTip);

    return infoBlock;
  }

  createToolTip() {
    this.toolTip = document.createElement('div');
    this.toolTip.classList.add('product-card__tooltip', 'tooltip');
    this.toolTip.innerHTML = `
                    <button class="tooltip__btn" aria-label="Показать подсказку">
                      <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-i"></use>
                      </svg>
                    </button>
                    <div class="tooltip__content">
                      <span class="tooltip__text">Наличие товара по городам:</span>
                      <ul class="tooltip__list">
                        <li class="tooltip__item">
                          <span class="tooltip__text">Москва: <span class="tooltip__count">${this.availability.moscow}</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Оренбург: <span class="tooltip__count">${this.availability.orenburg}</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${this.availability.saintPetersburg}</span></span>
                        </li>
                      </ul>`
    return this.toolTip
  }

  addListeners() {
    this.itemCardEl.addEventListener('click', (e) => {
      const addToCartBtn = e.target.closest('.btn--icon');
      const aboutLink = e.target.closest('.btn--secondary');
      if (addToCartBtn) {
        myCart.addToCart(this);
        myCart.refreshCartCount()
        myCart.renderCart();
      }
      if (aboutLink) {
        console.log('link');
      }

    });

    const tooltipBtn = this.toolTip.querySelector('.tooltip__btn');
    const tooltipContent = this.toolTip.querySelector('.tooltip__content');

    if (tooltipBtn._tippy) {
      tooltipBtn._tippy.destroy();
    }


    tippy(tooltipBtn, {
      content: tooltipContent.innerHTML,
      trigger: 'mouseenter focus',
      theme: 'tooltip__content',
      allowHTML: true,
      interactive: true,
      hideOnClick: true,
      appendTo: () => document.body   

    });
  }
}