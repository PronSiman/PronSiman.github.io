'use strict';
const headerBgcImg = document.querySelector('.header-bgc-img');
const loadMoreBtn = document.querySelector('.load-more-btn-js');
const gallaryList = document.querySelector('.gallary-list-js');


const imgNamesArr = ['©daniel', 'digital', 'digital2'];

const gallaryImagesAdressList = {
    0: 'img/img-gallary/nature1.jpg',
    1: 'img/img-gallary/nature2.jpg',
    2: 'img/img-gallary/nature3.jpg',
    3: 'img/img-gallary/nature4.jpg',
    4: 'img/img-gallary/nature5.jpg',
    5: 'img/img-gallary/nature6.jpg',
    6: 'img/img-gallary/nature7.jpg',
    7: 'img/img-gallary/nature8.jpg',
}
let objSize = Object.keys(gallaryImagesAdressList).length;
let maxElementCounter = 4;

function showHeaderSlider(box, arr) {
    let i = 1;
    let timerId = setInterval(function() {
        box.style.backgroundImage = `url(img/header-banner/${arr[i]}.png)`;
        i++;
        if (i === arr.length) {
            i = 0
        }
    }, 5000);
}
showHeaderSlider(headerBgcImg, imgNamesArr);

function loadGallaryElements() {
    if (maxElementCounter > objSize) {
        maxElementCounter = 4;
    }
    let gallaryItems = '';
    for (let i = maxElementCounter - 4; i < maxElementCounter; i += 1) {
        gallaryItems +=
            `<li class="gallary-item animated flip">                           
        <img src=${gallaryImagesAdressList[i]} alt="nature image" class="gallary-item-img">
        <div class="more-img-info">
        <button class="scale-btn"></button>
        <div class="img-extra-descr">
        <p class="extra-descr-title">Lorem ipsum dolor sit</p>
        <p class="extra-descr-txt">amet consetetur sadipscing elitr</p>
        </div>
        </div>
        </li>`
    }
    gallaryList.innerHTML = gallaryItems;
    maxElementCounter += 4;
}
loadGallaryElements();
loadMoreBtn.addEventListener('click', loadGallaryElements);