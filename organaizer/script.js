'use strict';
const todayDate = new Date();
const todayYear = todayDate.getFullYear();
const todayMonth = todayDate.getMonth();
const todayDayNum = todayDate.getDate();

const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const monthText = document.querySelector('.month');
const yearText = document.querySelector('.year');
const calendar = document.querySelector('.calendar');

const todayBtn = document.querySelector('.today-btn');
const backmonthArrow = document.querySelector('.backmonth-arrow');
const aheadmonthArrow = document.querySelector('.aheadmonth-arrow');

const modal = document.querySelector('.modal');
const modalDate = document.querySelector('.modal-date');
const closeModal = document.querySelector('.close-modal');
const eventData = document.querySelector('.event-data');
const descriptionData = document.querySelector('.description');
const submitBtn = document.querySelector('.submit-btn');


let currentDate;
let dateBox;
let numberOfBox;
let todayBoxName;
let calendarBox;
let allBoxes;
// let dayNameText;
let dayCounter;
let currentYear;
let currentMonth;
let dateNum;
let data;
let description;
// let keyForDataStorage;
let dataStorageString;
let dataStorage = [];
dataStorage = JSON.parse(localStorage.getItem('organizer'));
console.log(dataStorage)
    // console.log(dataStorage)

const objInStorage = function(evt, descr, year, month, num) {
    this.year = year;
    this.month = month;
    this.num = num;
    this.evt = evt;
    this.descr = descr;
}

function todayCalendar() {
    // calendar.innerHTML = '';   
    createCalendar(todayYear, todayMonth);
    todayLighter();
    btnListener();

}
todayCalendar();

function createCalendar(year, month) {
    calendar.innerHTML = '';
    dayCounter = 0;
    currentYear = year; ////////
    currentMonth = month; //////////
    monthText.textContent = monthArray.filter((elem, i) => i === currentMonth);
    yearText.textContent = currentYear;
    calendarBox = document.createElement('div');
    calendarBox.classList.add('calendar-box');
    currentDate = new Date(year, month);
    for (let i = 0, max = getDay(currentDate); i < max; i++) {
        boxCreater();
    }
    // ячейки календаря с датами
    while (currentDate.getMonth() == month) {
        boxCreater(currentDate.getDate())
        currentDate.setDate(currentDate.getDate() + 1);
    }
    if (getDay(currentDate) != 0) { // добить таблицу пустыми ячейками, если нужно
        for (let i = getDay(currentDate); i < 7; i++) {
            boxCreater();
        }
    }
    calendar.appendChild(calendarBox)
    allBoxes = document.querySelectorAll('.date-box');
    calendar.style.margin = '';
    if (allBoxes.length === 35) {
        calendar.style.margin = '0px 0px 110px 0px';
    }
    boxListener();
    if (dataStorage === '') {
        let filtred = dataStorage
            .filter(objInStorage => objInStorage.year === currentYear)
            .filter(objInStorage => objInStorage.month === currentMonth);
        console.log(filtred)
    }
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

// function boxCreater(numberOfDate = '') {
//     //     let userEventText;
//     // let userDescriptionText;
//     dateBox = document.createElement('div')
//     dateBox.classList.add('date-box');
//     topDateBox = document.createElement('div');
//     topDateBox.classList.add('top-date');
//     centralDateBox = document.createElement('div');
//     centralDateBox.classList.add('central-date');
//     // userEventText = document.createElement
//     dayNameText = document.createElement('p');
//     dayNameText.classList.add('dayname-text');
//     if (dayCounter < 7) {
//         dayNameText.textContent = daysArray[dayCounter];
//     }
//     numberOfBox = document.createElement('p');
//     numberOfBox.classList.add('box-number');
//     numberOfBox.textContent = numberOfDate;
//     dateBox.appendChild(topDateBox);
//     dateBox.appendChild(centralDateBox);
//     topDateBox.appendChild(dayNameText);
//     topDateBox.appendChild(numberOfBox);
//     calendarBox.appendChild(dateBox);
//     dayCounter += 1;
// }

function boxCreater(numberOfDate = '') {
    let dayNameText;
    if (dayCounter < 7) {
        dayNameText = daysArray[dayCounter];
    } else { dayNameText = '' }
    dayCounter += 1;
    dateBox = document.createElement('div');
    dateBox.classList.add('date-box');
    dateBox.innerHTML = `
    <div class="top-date">
    <p class="dayname-text">${dayNameText}</p>
    <p class="box-number">${numberOfDate}</p>
    </div>
    <div class="central-date">
    <p class="users-evt"></p>
    <p class="users-desc"></p>
    </div>`
    calendarBox.appendChild(dateBox);
}

function todayLighter() {
    allBoxes.forEach(box => {
        box.classList.remove('active-day');
        let boxElem = box.getElementsByClassName('box-number')[0].textContent
        if (boxElem == todayDayNum) {
            box.classList.add('active-day');
        }
    })
}

function changeMonth(counter) {
    currentMonth = currentMonth + counter;
    if (currentMonth == 12) {
        currentMonth = 0;
        currentYear += 1
    }
    if (currentMonth == -1) {
        currentMonth = 11;
        currentYear -= 1;
    }
    createCalendar(currentYear, currentMonth)
}

function btnListener() {
    todayBtn.addEventListener('click', todayCalendar);
    backmonthArrow.addEventListener('click', changeMonth.bind(event, -1));
    aheadmonthArrow.addEventListener('click', changeMonth.bind(event, 1));
    // boxListener();
}

function boxListener() {
    allBoxes.forEach(box => {
        box.addEventListener('click', openModal.bind(event, box));
        console.log(box)
    })
}

function openModal(currentBox) {
    eventData.value = '';
    descriptionData.value = '';
    closeModal.addEventListener('click', closeModalWindow);
    dateNum = +currentBox.getElementsByClassName('box-number')[0].textContent;
    modal.style.display = 'flex';
    modalDate.innerHTML = `<p class="num-txt">${dateNum}</p>
      <p class="month-txt" > ${monthText.textContent} </p>
      <p class="year-txt" > ${ yearText.textContent} </p>`;
    submitBtn.addEventListener('click', writeDataFromUser);


}
// const dateForKey = (num) => num < 10 ? '0' + num : num;

function writeDataFromUser(e) {
    event.preventDefault();
    let newToStorage = new objInStorage(eventData.value, descriptionData.value, currentYear, currentMonth, dateNum);
    dataStorage.push(newToStorage);
    console.log(dataStorage)
    dataStorageString = JSON.stringify(dataStorage);
    localStorage.setItem('organizer', dataStorageString);
    // closeModalWindow();
}

function closeModalWindow() {
    modal.style.display = 'none';
}