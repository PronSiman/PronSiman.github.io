'use strict';

const popBtn = document.querySelector('.pop-btn-js');
const modal = document.querySelector('.modal');
const closePopupBtn = document.querySelector('.close-popup-btn-js');
const currentDate = new Date;
const discountDate = document.querySelector('.discount-date-js');


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


function setDate() {
    let monthNum = currentDate.getMonth() + 1;
    let yearNum = currentDate.getFullYear();

    function getDateNum() {
        Date.prototype.daysInMonth = function() {
            return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
        };
        let dateNum = currentDate.getDate() + 3;
        if (dateNum > currentDate.daysInMonth()) {
            dateNum = dateNum - currentDate.daysInMonth();
            monthNum += 1;
        }
        return checkNum(dateNum);
    }

    function checkNum(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }
    return `${getDateNum()}.${checkNum(monthNum)}.${yearNum}`;
}

discountDate.textContent = setDate();

showModal();
closeModal();