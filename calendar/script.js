'use strict'

const date = new Date;
const yearDate = document.querySelector('.year-date');
const mounthName = document.querySelector('.mounth-name');
const mounthNames = ['Январь', 'Февраль', 'Март', 'Аперль', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
const arrowBack = document.querySelector('.arrow-back');
const arrowForward = document.querySelector('.arrow-forward');
const todayBtn = document.querySelector('.today-btn');
const calendarBox = document.querySelector('.calendar-box');
const dataWindow = document.querySelector('.data-window');
const closeBtn = document.querySelector('.close-btn');
///// inputs
const findField = document.querySelector('.find-field')
const eventInput = document.querySelector('.event-input');
const dateOfInput = document.querySelector('.date-input');
const membersInput = document.querySelector('.members-input');
const descriptionInput = document.querySelector('.description-input');
////btns 
const submitBtn = document.querySelector('.submit-btn');
const resetBtn = document.querySelector('.reset-btn');

/////
let currentMounthNum;
let currentYearNum;
let dataBoxes = '';
let datesElements;
let currentEvent;
let keysDatesArrey = [];
let boxData;
let stringData;
let dateNumbers;



function currentDate() {
    currentYearNum = date.getFullYear();
    yearDate.textContent = currentYearNum;
    mounthName.textContent = getMounthName(date.getMonth());
    topArrowListener();
    creatCalendar(currentMounthNum, currentYearNum);
    hideModal();
    localDataCheker();

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
    dateClickListener();
    localDataCheker();
}

function getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

function creatCalendar(month, year) {
    calendarBox.innerHTML = '';
    let currentData;
    let calendar = document.createDocumentFragment();
    currentData = new Date(year, month);

    for (let i = 0, max = getDay(currentData); i < max; i += 1) {
        boxCreater();
    }

    while (currentData.getMonth() == month) {
        boxCreater(currentData.getDate())
        currentData.setDate(currentData.getDate() + 1);
    }
    if (getDay(currentData) != 0) {
        for (let i = getDay(currentData); i < 7; i += 1) {
            boxCreater();
        }
    }
    calendarBox.appendChild(calendar);

    function boxCreater(datenum = '') {
        dataBoxes = document.createElement('div');
        let dataBoxesNum = document.createElement('p');
        let insideBox = document.createElement('div');
        insideBox.classList.add('inside');
        dataBoxes.classList.add('date');
        dataBoxesNum.classList.add('date-number')
        dataBoxesNum.textContent += datenum;
        dataBoxes.appendChild(dataBoxesNum);
        dataBoxes.appendChild(insideBox);
        calendar.appendChild(dataBoxes);


    }
    datesElements = document.querySelectorAll('.date');
    dateNumbers = document.querySelectorAll('.date-number');


    function todayLighter() {
        datesElements.forEach(elem => {
            elem.classList.remove('date--active');
            if (elem.textContent == date.getDate()) {
                elem.classList.add('date--active');
            }
        })
    }
    todayLighter();

    function dayNamesCreator(days) {
        for (let i = 0; i < 7; i += 1) {
            let dayName = document.createElement('p');
            dayName.classList.add('boldtext');
            dayName.textContent += days[i];
            datesElements[i].prepend(dayName);
            dayName.classList.add('dayname');
        }
    }
    dayNamesCreator(dayNames);
}

function dateClickListener() {
    datesElements.forEach(box => {
        box.addEventListener('click', showDataWindow)
    })
}

function showDataWindowClear() {
    eventInput.value = '';
    dateOfInput.value = '';
    membersInput.value = '';
    descriptionInput.value = '';
}

function hideModal() {
    dataWindow.hidden = true;
}

let currentNum;

function showDataWindow() {
    showDataWindowClear();
    let currentEvent = this;
    currentNum = currentEvent.getElementsByClassName('date-number')[0].textContent;
    if (currentEvent.classList.contains('info')) {
        eventInput.value = setTextContent('event-txt');
        dateOfInput.value = setTextContent('userdates-txt');
        membersInput.value = setTextContent('members-txt');
        descriptionInput.value = setTextContent('desc-txt');

        function setTextContent(classname) {
            return currentEvent.getElementsByClassName(classname)[0].textContent
        }
    }
    dataWindow.hidden = false;
}

function modalBtnsLissener() {
    submitBtn.addEventListener('click', submitClick);
    closeBtn.addEventListener('click', hideModal);
}

modalBtnsLissener();

function deleteFromLocal(num) {
    if (num < 10) {
        num = '0' + num;
    }
    for (let key in localStorage) {
        if (isNaN(key) == false) {
            let local = JSON.parse(localStorage.getItem(key));
            if (local.eventDate == num) {
                localStorage.removeItem(key);
            }
        }
    }
}

function currentBoxClear(num) {
    dateNumbers.forEach(i => {
        if (num == i.textContent) {
            i.parentNode.classList.remove('info');
            i.nextSibling.innerHTML = '';
        }
    })
};

function submitClick() {
    if (eventInput.value == '' && dateOfInput.value == '' &&
        membersInput.value == '' && descriptionInput.value == '') {
        deleteFromLocal(currentNum);
        currentBoxClear(currentNum);
        localDataCheker();
        hideModal();
        return;
    }
    let userInputData = {
        evt: eventInput.value,
        userdates: dateOfInput.value,
        members: membersInput.value,
        description: descriptionInput.value,
        numCreator: function(num, n) {
            num = num + '';
            if (num < 10) {
                num = '0' + num;
            }
            return userInputData[n] = num;
        }
    }
    userInputData.numCreator(currentNum, 'eventDate');
    userInputData.numCreator(currentMounthNum, 'eventBoxMonth');
    userInputData.numCreator(currentYearNum, 'eventBoxYear');
    let localKey = userInputData.eventDate +
        userInputData.eventBoxMonth +
        userInputData.eventBoxYear;
    let stringData = JSON.stringify(userInputData);
    localStorage.setItem(localKey, stringData);
    hideModal();

}

function localDataCheker() {
    for (let key in localStorage) {
        if (isNaN(key) == false) {
            getFromLocalStorage(key)
        }
    }
}

function getFromLocalStorage(key) {
    let localIndex = JSON.parse(localStorage.getItem(key));
    if (localIndex.eventDate.charAt(0) === '0') {
        localIndex.eventDate = localIndex.eventDate.substr(1);
    }
    if (currentYearNum == localIndex.eventBoxYear) {
        if (currentMounthNum == localIndex.eventBoxMonth) {
            datesElements.forEach(i => {
                let dateNumber = i.getElementsByClassName('date-number')[0];
                if (dateNumber.textContent == localIndex.eventDate) {
                    dateNumber.parentNode.classList.add('info');
                    boxData = `<p class='event-txt'>${localIndex.evt}</p>
                               <p class='userdates-txt'>${localIndex.userdates}</p> 
                               <p class='members-txt'>${localIndex.members}</p>
                               <p class='desc-txt'>${localIndex.description}</p>`;
                    dateNumber.parentNode.children[1].innerHTML = boxData;
                }
            })
        }
    }
}
dateClickListener();

findField.addEventListener('keypress', liveFind);
let forSearch = '';

function findFieldClear() {
    findField.value = '';
}


function liveFind(event) {
    if (event.key !== 'Enter') {
        forSearch = forSearch + event.key
    } else(searchOnLocalStorage(forSearch))
}

function searchOnLocalStorage(search) {
    findFieldClear();
    for (let key in localStorage) {
        if (isNaN(key) == false) {
            let currentLocal = JSON.parse(localStorage.getItem(key));
            for (let data in currentLocal) {
                if (search === currentLocal[data]) {
                    let searchingMonth = +currentLocal.eventBoxMonth;
                    let searchingYear = +currentLocal.eventBoxYear;
                    if (searchingYear < currentYearNum) {
                        searchingMonth -= 12;
                    }
                    if (searchingYear > currentYearNum) {
                        searchingMonth += 12;
                    }
                    if (currentMounthNum > searchingMonth) {
                        for (let i = 0, max = currentMounthNum - searchingMonth; i < max; i += 1) {
                            mounthChanger(-1);
                        }
                    }
                    if (currentMounthNum < searchingMonth) {
                        for (let i = 0, max = searchingMonth - currentMounthNum; i < max; i += 1) {
                            mounthChanger(1);
                        }
                    }
                }
            }
            findFieldClear();
        }
    }
}