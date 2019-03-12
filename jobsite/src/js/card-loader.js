'use strict';
/////buttons
const loadMoreBtn = document.querySelector('.load-more-btn-js');
const submitIdBtn = document.querySelector('#submit-id-btn-js');
const submitSortBtn = document.querySelector('#sort-btn-js');
////// inputs
const findFormInput = document.querySelector('.find-form-js');
const ageInputMin = document.querySelector('.age-input-min');
const ageInputMax = document.querySelector('.age-input-max');
const countInput = document.querySelector('.count-input');
const cityInput = document.querySelector('.city-input');
const countryInput = document.querySelector('.country-input');
///// blocks
const jobsList = document.querySelector('.jobs-list');
let cardItterator = 1;
let id;
let minAge;
let maxAge;
let count;
let city;
let country;



/// submit btns
submitIdBtn.addEventListener('click', loadCardById);
submitSortBtn.addEventListener('click', loadCardByTypes);

function loadCardByTypes() {
    event.preventDefault();
    minAge = ageInputMin.value;
    maxAge = ageInputMax.value;
    count = countInput.value;
    city = cityInput.value;
    country = countryInput.value;
    // console.log(minAge, maxAge, count, city, country);
    getCards('', minAge, maxAge, count, city, country);
}

function loadCardById() {
    event.preventDefault();
    if (findFormInput.value === '') {
        return;
    }
    id = findFormInput.value;
    getCards(id)
}

function getCards(id = '', minAge = '', maxAge = '', count = '', city = '', country = '') {
    fetch('../json/get-dates.json', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.ok) return response.json();
            throw new Error("Error fetching data");

        })
        .then(res => {
            let currentData = res.data;
            const entries = Object.entries(currentData);
            if (minAge !== '' || maxAge !== '' || count !== '' || city !== '' || country !== '') {
                console.log('ok')

            }
            if (id !== '') {
                for (const entry of entries) {
                    const key = entry[0]
                    const valueId = entry[1];
                    if (findFormInput.value == valueId.id) {
                        jobsList.innerHTML = makeCardById(key, currentData);
                        // findFormInput.value = '';
                        break;
                    } else {
                        jobsList.innerHTML = `<p class='mo-matches'>No matches</p>`;
                    }

                }
                findFormInput.value = '';
                return;
            }
            if (findFormInput.value == '' && ageInputMin.value == '' && ageInputMax.value == '' &&
                countInput.value == '' && cityInput.value == '' && countryInput.value == '') {
                for (let max = cardItterator + 3; cardItterator <= max; cardItterator += 1) {
                    if (currentData === undefined) {
                        return;
                    }
                    jobsList.innerHTML += makeCardById(cardItterator, currentData);
                }
            }
        })
}
getCards();

loadMoreBtn.addEventListener('click', clearJobList);

function clearJobList() {
    if (id === undefined) {
        getCards();
    } else {
        jobsList.innerHTML = '';
        findFormInput.value = '';
        cardItterator = 1;
        id = undefined;
        getCards();
    }
}











function makeCardById(cardItterator, currentData) {
    return `<li class="jobs-item-card">
    <div class="card-descr">
        <p class="id">${currentData[cardItterator].id}</p>
        <p class="date">${currentData[cardItterator].date}</p>
    </div>
    <img src=${currentData[cardItterator].image} alt="job-image" class="card-img">
    <div class="requirements">
        <div class="age">
            <p class="min-age">Age: ${currentData[cardItterator].min_age} &#8211;</p>
            <p class="max-age">${currentData[cardItterator].max_age}</p>
        </div>
        <p class="count">Count: ${currentData[cardItterator].count_available}</p>
    </div>
    <div class="card-descr-text">
        <p class="job-name">${currentData[cardItterator].name}</p>
        <p class="job-descr">${currentData[cardItterator].description}</p>
    </div>
    <div class="location">
        <div class="city">City: ${currentData[cardItterator].city}</div>
        <div class="country">Country: ${currentData[cardItterator].country}</div>
    </div>
</li>`
}