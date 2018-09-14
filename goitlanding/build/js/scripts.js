'use strict';

var btn_prev = document.querySelector('.arr-prev');
var btn_next = document.querySelector('.arr-next');
var reviews = document.querySelectorAll('.review-block__card');
var counters = document.querySelectorAll('.review-block__page-counter span');

var review = 0;
var counter = 0;

var prevClickHandler = function prevClickHandler() {
	goToReview(review - 1);
	goToCount(counter - 1);
};

var nextClickHandler = function nextClickHandler() {
	goToReview(review + 1);
	goToCount(counter + 1);
};

var goToCount = function goToCount(n) {
	counters[counter].classList.remove('through');
	counter = (n + counters.length) % counters.length;
	counters[counter].classList.add('through');
};

var goToReview = function goToReview(n) {
	reviews[review].style.display = 'none';
	review = (n + reviews.length) % reviews.length;
	reviews[review].style.display = 'flex';
};

btn_prev.addEventListener('click', prevClickHandler);
btn_next.addEventListener('click', nextClickHandler);

// jQuery Burger-menu

(function ($) {
	$(function () {
		$('.icon').on('click', function () {
			$(this).closest('.menu').toggleClass('menu-open');
		});
	});
})($);

// Скрипт плавной прокрутки страницы и скрытия кнопки to-top-button

$(document).ready(function () {
	// появление/затухание кнопки .to-top-button
	$(function () {
		// прячем кнопку .to-top-button
		$(".to-top-button").hide();

		$(window).scroll(function () {
			if ($(this).scrollTop() > 200) {
				$(".to-top-button").fadeIn();
			} else {
				$(".to-top-button").fadeOut();
			}
		});

		// при клике на ссылку плавно поднимаемся вверх
		$(".to-top-button").click(function () {
			$("body,html").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
});