const swiper = new Swiper('.mySwiper', {
    autoplay: false,
    slidesPerView: 6,
    spaceBetween: 16,
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

window.onscroll = function () {
    var btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

setTimeout(function () {
    var popup = document.querySelector('.popup-alert');
    if (popup) popup.style.display = 'none';
}, 2500);

