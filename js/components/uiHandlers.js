import { updateFilteredView } from "./updateView.js";
import appState from "../state.js";
import myCart from "./cart.js";
import initFormValidation from "./formValidation.js";


export default function initApp() {
    initUI();
    initFilters();
    handleCart();
    handleAccordion();
    initFormValidation();
    handleModalForm();
}

function initUI() {
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('change', function (e) {
        if (e.target.closest('.catalog__sort-select')) {
            updateFilteredView();
        }
    });

}

function initFilters() {

    const catalogForm = document.querySelector('.catalog-form');
    if (!catalogForm) return;

    catalogForm.addEventListener('change', function (e) {
        if (e.target.matches('input[type="radio"], input[type="checkbox"]')) {
            updateFilteredView();
        }
    });

    catalogForm.addEventListener('click', function (e) {
        const resetBtn = e.target.closest('.catalog-form__reset');

        if (resetBtn) {
            e.preventDefault();
            console.log('filtered', appState.filteredProducts);
            catalogForm.reset();
            updateFilteredView();
        }
    });

}


function handleGlobalClick(e) {
    const target = e.target;
    // ================== Burger menu ==================
    const mainMenu = document.querySelector('.main-menu');


    if (target.closest('.header__catalog-btn')) {
        mainMenu.classList.add('main-menu--active');
    } else if (target.closest('.main-menu__close')) {
        mainMenu.classList.remove('main-menu--active');
    }

    // ================== Cart ==================
    const cartItself = document.querySelector('.basket');

    if (target.closest('.header__user-btn--basket')) {
        cartItself.classList.toggle('basket--active');
    } else if (!target.closest('.basket')) {
        cartItself.classList.remove('basket--active');
    }

    // ================== Location ==================
    const locationCityBtn = document.querySelector('.location__city');
    if (!locationCityBtn) return;

    const locationCityNameEl = locationCityBtn.querySelector('.location__city-name');
    const subLinks = document.querySelectorAll('.location__sublink');

    //clicked
    const clickedCityBtn = target.closest('.location__city');
    const clickedSubLink = target.closest('.location__sublink');


    if (clickedCityBtn) {
        locationCityBtn.classList.toggle('location__city--active');

        const currentCity = locationCityNameEl.textContent.trim();
        subLinks.forEach(sublink => {
            const li = sublink.closest('li');
            if (li) {
                li.style.display = sublink.textContent.trim() === currentCity ? 'none' : '';
            }
        });
    } else if (!target.closest('.location__sublist')) {
        locationCityBtn.classList.remove('location__city--active');
    }

    if (clickedSubLink && locationCityBtn.classList.contains('location__city--active')) {
        locationCityNameEl.textContent = e.target.textContent;
        locationCityBtn.dataset.city = clickedSubLink.dataset.city;
        locationCityBtn.classList.remove('location__city--active');
        updateFilteredView();
    }
}

function handleCart() {
    const cartList = document.querySelector('.basket__list');
    cartList.addEventListener('click', (e) => {
        const minusBtn = e.target.closest('.basket__change-btn--minus');
        const plusBtn = e.target.closest('.basket__change-btn--plus');
        const itemInCartCloseBtn = e.target.closest('.basket__item-close');

        const listElement = e.target.closest('li');
        const id = listElement.dataset.id;

        if (minusBtn || plusBtn) {
            const operation = minusBtn ? '-' : '+';
            const cartItem = myCart.manageExisting(id, operation);
            const count = cartItem.articleCount;
            const price = cartItem.price;
            const countEl = e.target.closest('div').querySelector('.basket__count');
            if (countEl && count !== undefined) countEl.textContent = count;
            listElement.querySelector('.basket__price').textContent = count * price + ' р.';
        }

        if (itemInCartCloseBtn) {
            myCart.removeCart(id);
        }
        myCart.refreshCartCount();
    });

}

function handleAccordion() {
    const buttons = document.querySelectorAll('.accordion__btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const isActive = btn.classList.contains('accordion__btn--active');
            buttons.forEach(b => {
                b.classList.remove('accordion__btn--active');
                b.nextElementSibling.style.maxHeight = null;
            });
            if (!isActive) {
                btn.classList.add('accordion__btn--active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

function handleModalForm() {
    const modal = document.querySelector('.modal');

    const modalClosebtn = document.querySelector('.modal__close');
    modalClosebtn.addEventListener('click', () => {
        modal.classList.remove('modal--active')
    });

}


