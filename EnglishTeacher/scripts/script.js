'use strict'

const menuIcon = document.querySelector('.menu-icon');
const navList = document.querySelector('.nav-list');
const arrowIcon = document.querySelector('.arrow-icon');
const sloganTitle = document.querySelector('.slogan-title');
const workTitles = document.querySelectorAll('.work-title');
const portfolioTitle = document.querySelector('.portfolio-title');
const teamTitle = document.querySelector('.team-title');

const pinkColor = '#ff6666'



function lissenMenu() {
    menuIcon.addEventListener('click', () => {
        navList.style = `display:block `;
    })

    arrowIcon.addEventListener('click', () => {
        navList.style = 'display: none'
    })
}

lissenMenu();

function makeColorPoint(str, color) {
    const strTxt = str.textContent.split('');
    strTxt[strTxt.length - 1] = `<span style='color:${color}'>${strTxt[strTxt.length - 1]}</span>`;
    return strTxt.join('')
}

workTitles.forEach(e => {
    e.innerHTML = makeColorPoint(e, pinkColor);
})

sloganTitle.innerHTML = makeColorPoint(sloganTitle, pinkColor);
portfolioTitle.innerHTML = makeColorPoint(portfolioTitle, pinkColor);
teamTitle.innerHTML = makeColorPoint(teamTitle, pinkColor);