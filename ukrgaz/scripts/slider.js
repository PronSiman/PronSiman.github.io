'use srtict'

$(document).ready(function() {
    $('.news-slider-list').slick({
        slidesToShow: 4,
        accessibility: false,
        autoplay: true,
        pauseOnFocus: true,
        prevArrow: '<button type="button ">&lt;</button>',
        nextArrow: '<button type="button ">&gt;</button>',
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ],
    });
});