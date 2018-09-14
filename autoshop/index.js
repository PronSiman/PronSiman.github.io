// vars
const orderBtns = document.querySelectorAll('.order-btn');
const switchBtnsBox = document.querySelector('.switchbtns');
const switchBtns = document.querySelectorAll('.switchbtn');
const feedbackFotoboxes = document.querySelectorAll('.feedback-fotobox');
const feedbackTxtboxes = document.querySelectorAll('.feedback-txtbox');
const clockBox = document.querySelector('.clock-box');
const clockBoxes = document.querySelectorAll('.clock-box');
const callBack = document.querySelector('.callback');
let timerData = [dh = 0, h = 1, dmin = 5, min = 2, dsec = 5, sec = 4];
let timers;
// functions vars
function onload() {
    function createClockBox() {
        const clockTmpl = `<div class="hour-box">
        <div class="digit">
            <p class="digit-txt decimal-hour"></p>
        </div>
        <div class="digit">
            <p class="digit-txt hour"></p>
        </div>
        </div>
        <div class="points-box">
        <div class="point"></div>
        <div class="point"></div>
        </div>
        <div class="minute-box">
        <div class="digit">
            <p class="digit-txt decimal-min"></p>
        </div>
        <div class="digit">
            <p class="digit-txt min"></p>
        </div>
        </div>
        <div class="points-box">
        <div class="point"></div>
        <div class="point"></div>
        </div>
        <div class="seconds-box">
        <div class="digit">
            <p class="digit-txt decimal-sec"></p>
        </div>
        <div class="digit">
            <p class="digit-txt sec"></p>
        </div>
        </div>`
        clockBoxes.forEach(clock => {
                clock.innerHTML = clockTmpl;
            })
            /////
        timers = [decimalHourContent = document.querySelectorAll('.decimal-hour'),
            hourContent = document.querySelectorAll('.hour'),
            decimalMinutesContent = document.querySelectorAll('.decimal-min'),
            minutesContent = document.querySelectorAll('.min'),
            decimalSecondsContent = document.querySelectorAll('.decimal-sec'),
            secondsContent = document.querySelectorAll('.sec'),
        ]
        clockData(timers, timerData);
    }

    function clockData(items, text) {
        let i = 0;
        for (item of items) {
            for (el of item) {
                el.textContent = text[i]
            }
            i++
        }
    }

    function clockCounter() {
        const secondsContentValue = setInterval(secondsCounter, 1000);

        // function minuser(n) {
        //     return --n;
        // }

        function counter(n, m) {
            // n = minuser(n);
            n = --n;
            if (n < 0) {
                return n = m;
            }
            return n;
        }

        function secondsCounter() {
            sec = counter(sec, 9);
            for (item of secondsContent) {
                item.textContent = sec;

            }
            if (sec === 9) {
                dsec = totable(dsec, 5, decimalSecondsContent);
                if (dsec === 5) {
                    min = totable(min, 9, minutesContent);
                    if (min === 9) {
                        dmin = totable(dmin, 5, decimalMinutesContent);
                        if (dmin === 0 && min === 0 && dsec === 0 && sec === 0) {
                            onload();
                        }
                    }
                }
            }
        }

        function totable(num, max, text) {
            num = counter(num, max);
            for (item of text) {
                item.textContent = num;
            }
            return num;
        }
    }

    function orderScroller() {
        orderBtns.forEach(btn => {
            btn.addEventListener('click', scroll);
        })
        callBack.addEventListener('click', scroll);

        function scroll() {
            window.scrollTo(0, 999999999);
        }
    }

    function sliderSwitcher() {
        function switchClassRemover() {
            switchBtnsBox.addEventListener('click', () => {
                let btnAtr;
                switchBtns.forEach(btn => {
                    btn.classList.remove('switchbtn--active');
                    switchClassAdder(event.target, "switchbtn--active");
                    btnAtr = idSliser(event.target);
                })
                classlistRemower(feedbackFotoboxes, "feedback-fotobox--active");
                classlistRemower(feedbackTxtboxes, "feedback-txtbox--active");
                showBlock(btnAtr, feedbackFotoboxes, "feedback-fotobox--active");
                showBlock(btnAtr, feedbackTxtboxes, "feedback-txtbox--active");
            })
        }

        function classlistRemower(elements, className) {
            elements.forEach(elem => {
                elem.classList.remove(className)
            })
        }

        function switchClassAdder(elem, className) {
            elem.classList.add(className);
        }

        function idSliser(elem) {
            return elem.getAttribute("id").slice(-1)
        }

        function showBlock(data, elements, className) {
            elements.forEach(elem => {
                if (data == idSliser(elem)) {
                    switchClassAdder(elem, className);
                }

            })
        }

        switchClassRemover();
    }

    createClockBox();
    clockCounter();
    orderScroller();
    sliderSwitcher();
}

onload();