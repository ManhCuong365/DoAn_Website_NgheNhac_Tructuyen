const swiper = new Swiper('.mySwiper', {
    autoplay: false,
    slidesPerView: 7,
    spaceBetween: 7,
    loop: true,
    centeredSlides: false,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


