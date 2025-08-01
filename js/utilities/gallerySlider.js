export default function initGallery() {
    new Swiper('.day-products__slider', {
        slidesPerView: 4,
        spaceBetween: 40,
        navigation: {
            nextEl: '.day-products__navigation-btn--next',   
            prevEl: '.day-products__navigation-btn--prev'
        },
        loop: true,
        breakpoints: {
            375: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            1280: {
                slidesPerView: 4
            }
        }
    });
}
