'use strict'

const date = new Date;
const yearDate = document.querySelector('.year-date');
const mounthName = document.querySelector('.mounth-name');
const mounthNames = ['Январь', 'Февраль', 'Март', 'Аперль', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const arrowBack = document.querySelector('.arrow-back');
const arrowForward = document.querySelector('.arrow-forward');
const todayBtn = document.querySelector('.today-btn');
const calendarBox = document.querySelector('.calendar-box');
let currentMounthNum;
let currentYearNum;
let dataBoxes = '';

function currentDate() {
    currentYearNum = date.getFullYear();
    yearDate.textContent = currentYearNum;
    mounthName.textContent = getMounthName(date.getMonth());
    topArrowListener();
    creatCalendar(currentMounthNum, currentYearNum);
    // const dateSquares = document.querySelectorAll('.date');
    // todayActiveElement(dateSquares);
}
currentDate();

function getMounthName(mounthnum) {
    for (let i = 0, max = mounthNames.length; i < max; i += 1) {
        if (mounthnum === i) {
            currentMounthNum = mounthnum;
            return mounthNames[i];
        }
    }
}

function topArrowListener() {
    arrowBack.addEventListener('click', mounthChanger.bind(event, -1));
    arrowForward.addEventListener('click', mounthChanger.bind(event, 1));
    todayBtn.addEventListener('click', currentDate);
}

function mounthChanger(num) {
    currentMounthNum += num;
    if (currentMounthNum < 0) {
        currentMounthNum = 11;
        currentYearNum -= 1;
        yearDate.textContent = currentYearNum;
    }
    if (currentMounthNum > 11) {
        currentMounthNum = 0;
        currentYearNum += 1;
        yearDate.textContent = currentYearNum;
    }
    mounthName.textContent = getMounthName(currentMounthNum);
    creatCalendar(currentMounthNum, currentYearNum);
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

function creatCalendar(month, year) {
    dataBoxes = '';
    let currentData;
    currentData = new Date(year, month);

    for (let i = 0, max = getDay(currentData); i < max; i += 1) {
        dataBoxes += '<div class="date"></div>'; //////
    }

    while (currentData.getMonth() == month) {
        dataBoxes += '<div class="date">' + currentData.getDate() + '</div>';
        currentData.setDate(currentData.getDate() + 1);
    }
    if (getDay(currentData) != 0) {
        for (var i = getDay(currentData); i < 7; i++) {
            dataBoxes += '<div class="date"></div>';
        }
    }
    calendarBox.innerHTML = dataBoxes;
}

// function todayActiveElement(elements) {

//     elements.forEach(function(elem) {
//         console.log(elem)
//         if (elem.textContent == date.getDate()) {

//         }
//     })
// }