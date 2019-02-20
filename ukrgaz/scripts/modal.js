'use strict';
console.log('fff')
const popBtn = document.querySelector('.pop-btn-js');
const modal = document.querySelector('.modal');
const closePopupBtn = document.querySelector('.close-popup-btn-js');

function showModal() {
    popBtn.addEventListener('click', () => {

        modal.style.display = 'block';
    })
}

function closeModal() {
    closePopupBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    })
}
showModal();
closeModal();