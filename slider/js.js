const sliderList = document.querySelector('.slider-list-js');
const sliderItemFirst = document.querySelector('.slider-item-first-js');
let position;
let leftPoint;
let rightPoint;

if (sliderList.children.length % 2 == 1) {
  position = 10;
  leftPoint = (((sliderList.children.length/2)-0.5) * 420) + position;
  rightPoint = (((sliderList.children.length/2)-0.5) * 420)*-1 + position;  
  // position = leftPoint;
}
else {
  position = -190;
  leftPoint = (((sliderList.children.length/2)) * 420) + position;
  rightPoint = (((sliderList.children.length/2)) * 420)*-1;
  // position = leftPoint;
}

const currentWindowWidth = window.innerWidth;
const currentWindowLeftSide = currentWindowWidth / 2;


sliderItemFirst.style.marginLeft = position + 'px';

sliderList.addEventListener('touchstart',()=>{
  console.log('syat')
const clickPosition= event.changedTouches[0].clientX;
moveSlider(clickPosition);
})
// sliderList.addEventListener('click', () => {
//   const clickPosition = event.clientX;
//   moveSlider(clickPosition);
// })
function moveSlider(clickPosition){
  if (clickPosition < currentWindowLeftSide) {
    position = position + 420;
    if (position <= leftPoint) {
      sliderItemFirst.style.marginLeft = position + 'px';
      return;
    }
    position = position - 420;
    sliderItemFirst.style.marginLeft = position + 'px';
    return
  }
  if (clickPosition > currentWindowLeftSide) {
    position = position - 420;
    if (position >= rightPoint) {
      sliderItemFirst.style.marginLeft = position + 'px';
      return;
    }
    position = position + 420;
    return;
  }
}

