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
const deleteBtn = document.querySelector('.delete-btn');
const reminderBox = document.querySelector('.reminder');
const exchangeRates = document.querySelector('.exchange-rates');


let currentDate;
let dateBox;
let numberOfBox;
let todayBoxName;
let calendarBox;
let allBoxes;
let dayCounter;
let currentYear;
let currentMonth;
let dateNum;
let data;
let description;
let dataStorageString;
let filtreddataStorage;
let currencyBox;
let dataStorage = [];
dataStorage = JSON.parse(localStorage.getItem('organizer'));
// console.log(dataStorage)
if (dataStorage === null) { dataStorage = [] }

const ObjInStorage = function(id, evt, descr, year, month, num) {
    this.id = id;
    this.year = year;
    this.month = month;
    this.num = num;
    this.evt = evt;
    this.descr = descr;
}

const monthNameFounder = (arr, num) => arr.filter((elem, i) => i === num);

function todayCalendar() {
    createCalendar(todayYear, todayMonth);
    todayLighter();
    btnListener();
}
todayCalendar();
getPrivatCurency();


function createCalendar(year, month) {
    calendar.innerHTML = '';
    dayCounter = 0;
    currentYear = year; ////////
    currentMonth = month; //////////
    monthText.textContent = monthNameFounder(monthArray, currentMonth)
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

    if (dataStorage !== []) {
        filtreddataStorage = dataStorage
            .filter(objInStorage => objInStorage.year === currentYear)
            .filter(objInStorage => objInStorage.month === currentMonth);
    }
    boxListener(filtreddataStorage);
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

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

if (dataStorage == null || dataStorage.length !== 0) {
    findForReminder();
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
    createCalendar(currentYear, currentMonth);
    if (todayYear === currentYear && todayMonth === currentMonth) {
        todayLighter();
    }
}

function btnListener() {
    todayBtn.addEventListener('click', todayCalendar);
    backmonthArrow.addEventListener('click', changeMonth.bind(event, -1));
    aheadmonthArrow.addEventListener('click', changeMonth.bind(event, 1));
}

function boxListener(obj) {
    allBoxes.forEach(box => {
        // прописать функцию узнавания пустая ли ячейка
        box.addEventListener('click', openModal.bind(event, box));
        let boxnum = +box.getElementsByClassName('box-number')[0].textContent;
        let userEvt = box.getElementsByClassName('users-evt')[0];
        let userDesc = box.getElementsByClassName('users-desc')[0];
        obj.map(obj => {
            if (obj.num == boxnum) {
                userEvt.textContent = obj.evt;
                userDesc.textContent = obj.descr;
                box.style.background = '#98FB98';
                if (userDesc.textContent == '' && userEvt.textContent == '') {
                    box.style.background = '#fff';
                }
            }
        });
    })
}

function openModal(currentBox) {
    if (+currentBox.getElementsByClassName('box-number')[0].textContent == 0) {
        return;
    }
    console.log(currentBox.getElementsByClassName('box-number')[0].textContent)
    eventData.value = currentBox.getElementsByClassName('users-evt')[0].textContent;
    descriptionData.value = currentBox.getElementsByClassName('users-desc')[0].textContent;
    closeModal.addEventListener('click', closeModalWindow);
    dateNum = +currentBox.getElementsByClassName('box-number')[0].textContent;
    modal.style.display = 'flex';
    modalDate.innerHTML = `<p class="num-txt">${dateNum}</p>
      <p class="month-txt" > ${monthText.textContent} </p>
      <p class="year-txt" > ${ yearText.textContent} </p>`;
    submitBtn.addEventListener('click', writeDataFromUser);
}

function writeDataFromUser() {
    const datePlusZero = (num) => num < 10 ? '' + 0 + num : num;
    let date = datePlusZero(dateNum);
    let month = datePlusZero(currentMonth);
    let id = '' + date + month + currentYear;
    for (let i = 0, max = dataStorage.length; i < max; i += 1) {
        if (dataStorage[i].id == id) {
            dataStorage.splice(i, 1)
            localStorage.setItem('organizer', JSON.stringify(dataStorage));
            return;
        }
    }
    let newToStorage = new ObjInStorage(id, eventData.value, descriptionData.value, currentYear, currentMonth, dateNum);
    dataStorage.push(newToStorage);
    console.log(dataStorage)
    localStorage.setItem('organizer', JSON.stringify(dataStorage));
}

function closeModalWindow() {
    modal.style.display = 'none';
}

function findForReminder() {
    const closestYearElem = dataStorage.filter(elem => elem.year >= currentYear)
        .reduce((acc, elem) => acc.year < elem.year ? acc : elem);
    const closestMonthArray = dataStorage.filter(elem => elem.year == closestYearElem.year);
    const closestMonth = closestMonthArray.reduce((acc, elem) => acc.month < elem.month ? acc : elem);
    const closestDate = closestMonthArray.filter(elem => elem.month == closestMonth.month)
        .reduce((acc, elem) => acc.num < elem.num ? acc : elem);
    const closestMonthName = monthNameFounder(monthArray, closestDate.month);
    const reminder = document.createElement('div');
    reminder.classList.add('remind-js');
    reminder.innerHTML = `<p class="reminddate-js">On ${closestDate.num} ${closestMonthName} ${closestDate.year}.</p>
                <p class='remindtxt-js'>Event: ${closestDate.evt} Description: ${closestDate.descr} </p>`;
    reminderBox.appendChild(reminder);
    reminder.addEventListener('click', jumpToEvent.bind(event, closestDate.year, closestDate.month))
}

function jumpToEvent(year, month) {
    currentYear = year;
    currentMonth = month;
    createCalendar(currentYear, currentMonth);

}
////coorect if description out of box

function getPrivatCurency() {
    fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Error fetching data")
                // }).then(data => console.log(data));
        }).then(data => data.map(elem => {
            currencyBox = document.createElement('div');
            currencyBox.classList.add('currency-box');
            currencyBox.innerHTML += `          
        <div class='currency-js currency-name'>${elem.ccy}</div>
        <div class='currency-js base-name'>${elem.base_ccy}</div>
        <div class='currency-js buy-count'>1</div>
        <div class='currency-js sale-count'>${parseInt(elem.sale*100)/100}/${parseInt(elem.buy*100)/100}</div>`;
            exchangeRates.appendChild(currencyBox);
        }))

}

// function getCurrentWeather() {
//     // fetch('https://api.gismeteo.net/v2/weather/current/?latitude=54.35&longitude=52.52')
//     fetch('http://dataservice.accuweather.com/locations/v1/adminareas/UA')
//         .then(response => {
//             if (response.ok) return response.json();
//             throw new Error("Error fetching data")
//         }).then(data => console.log(data));

// }

// getCurrentWeather();