'use srtict'

$(document).ready(function() {
    $('.news-slider-list').slick({
        // slidesToShow: 3,
        slidesToShow: 1,
        accessibility: false,
        autoplay: true,
        pauseOnFocus: true,
        prevArrow: '<button type="button ">&lt;</button>',
        nextArrow: '<button type="button ">&gt;</button>',
        // mobileFirst: true,
        // responsive: [{
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 4,
        //             slidesToScroll: 4,
        //         }
        //     }, ]
        //     {
        //         breakpoint: 768,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2
        //         }
        //     },
        //     {
        //         breakpoint: 320,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     }
        // ],
        // responsive: [{
        //     breakpoint: 320,
        //     settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //     },
        //     breakpoint: 768,
        //     settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2
        //     },
        //     breakpoint: 992,
        //     settings: {
        //         slidesToShow: 3,
        //         slidesToScroll: 3
        //     }
        // }],
    });
});