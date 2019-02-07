'use strict'

const sliderToleftBtn = document.querySelector('.left-slider-btn-js');
const sliderToRightBtn = document.querySelector('.right-slider-btn-js');
const sliderList = document.querySelector('.slider-list-js');

function sliderMove() {
    sliderToleftBtn.addEventListener('click', changeSliderItemPositionToLeft);
    sliderToRightBtn.addEventListener('click', changeSliderItemPositionToRight);
    let currentLeft = 0;

    function changeSliderItemPositionToRight() {
        currentLeft = currentLeft + 300;
        if (currentLeft > 0) {
            currentLeft = 0;
            return;
        }
        sliderList.style.left = currentLeft + 'px';
    }

    function changeSliderItemPositionToLeft() {
        currentLeft = currentLeft - 300;
        if (currentLeft < -2100) {
            currentLeft = -2100;
            return;
        }
        sliderList.style.left = currentLeft + 'px';
    };
}
sliderMove()