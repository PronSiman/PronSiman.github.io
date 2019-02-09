'use strict'
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
    autoplaySpeed: 1500,
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