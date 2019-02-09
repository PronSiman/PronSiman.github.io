'use strict'

// const sliderToleftBtn = document.querySelector('.left-slider-btn-js');
// const sliderToRightBtn = document.querySelector('.right-slider-btn-js');
// const sliderList = document.querySelector('.slider-list-js');

// function sliderMove() {
//     sliderToleftBtn.addEventListener('click', changeSliderItemPositionToLeft);
//     sliderToRightBtn.addEventListener('click', changeSliderItemPositionToRight);
//     let currentLeft = 0;

//     function changeSliderItemPositionToRight() {
//         currentLeft = currentLeft + 300;
//         if (currentLeft > 0) {
//             currentLeft = 0;
//             return;
//         }
//         sliderList.style.left = currentLeft + 'px';
//     }

//     function changeSliderItemPositionToLeft() {
//         currentLeft = currentLeft - 300;
//         if (currentLeft < -2100) {
//             currentLeft = -2100;
//             return;
//         }
//         sliderList.style.left = currentLeft + 'px';
//     };
// }
// sliderMove()

// Init fancyBox
// $().fancybox({
//     selector: '.slick-slide:not(.slick-cloned)',
//     hash: false
// });

///--------------------------------------------------------------------------------------------------------------

//инициализируем галерею ДО запуска слайдера
var gallery = $('.slide a');
//при клике на ссылку в слайде запускаем галерею
$('.slide a').on('click', function(e) {
    e.preventDefault();
    //узнаём индекс слайда без учёта клонов
    var totalSlides = +$(this).parents('.slider').slick("getSlick").slideCount,
        dataIndex = +$(this).parents('.slide').data('slick-index'),
        trueIndex;
    switch (true) {
        case (dataIndex < 0):
            trueIndex = totalSlides + dataIndex;
            break;
        case (dataIndex >= totalSlides):
            trueIndex = dataIndex % totalSlides;
            break;
        default:
            trueIndex = dataIndex;
    }
    //вызывается элемент галереи, соответствующий индексу слайда
    $.fancybox.open(gallery, {}, trueIndex);
    return false;
});

$('.slider').slick({
    slidesToShow: 4,
    autoplay: true,
    arrows: true,
    nextArrow: '<button type="button" class="slick-btn slick-prev">Previos</button>',
    prevArrow: '<button type="button" class="slick-btn slick-next">Next</button>',
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],

    customPaging: function() {
        return ''
    }
});