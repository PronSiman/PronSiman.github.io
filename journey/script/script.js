const toHome = document.querySelector('#tohome');
const toAbout = document.querySelector('#toabout');
const toGallary = document.querySelector('#togallary');
const toTours = document.querySelector('#totours');
const toBlog = document.querySelector('#toblog');
const toContacts = document.querySelector('#tocontacts');
const content = document.querySelector('.content');
const shadow = document.querySelector('.shadow');
const menuItems = document.querySelectorAll('.nav-link');

///// templates
const homePage = document.querySelector('#home').innerHTML.trim();
const templateHome = _.template(homePage);
const aboutPage = document.querySelector('#about').innerHTML.trim();
const templateAbout = _.template(aboutPage);
const gallaryPage = document.querySelector('#gallary').innerHTML.trim();
const templateGallary = _.template(gallaryPage);
const tourPage = document.querySelector('#tours').innerHTML.trim();
const templateTour = _.template(tourPage);
const blogPage = document.querySelector('#blog').innerHTML.trim();
const templateBlog = _.template(blogPage);
const contactsPage = document.querySelector('#contacts').innerHTML.trim();
const templateContacts = _.template(contactsPage);

///// home datas
const homePageData = {
    h1text: 'Home',
    h3text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam numquam aliquid possimus laborum, commodi dolorem iste ex qui assumenda sunt, sed unde fugit doloribus hic pariatur ad debitis nesciunt.',
    homeImages: [1, 2, 3, 4]
}
const aboutPageData = {
    h2text: 'About us',
    img_adress: 'img/about/images.jpg',
    abouttitleimg: 'Our principles are customer orientation',
    aboutimgtxt: `Phasellus tempus turpis venenatis facilisis tincidunt. Praesent sit amet velit sapien. Donec imperdiet, tortor quis mollis consequat, risus nulla viverra neque, id fermentum mauris augue eget neque. Ut hendrerit mauris velit, sed
    bibendum sapien pulvinar eu. Phasellus malesuada, lacus quis ultricies pretium, libero risus interdum purus, et pellentesque ex nibh sit amet ante. Vestibulum lobortis mattis ipsum in porttitor. Sed lobortis, purus eu malesuada
    laoreet, lacus massa elementum orci, at tempus est odio nec nunc. Mauris dignissim, enim eu hendrerit egestas, dolor enim blandit massa, in convallis turpis arcu eget magna. Nullam rutrum augue purus, et ultrices dolor blandit
    et. In at porttitor leo. Sed ac mi sed felis aliquet interdum in sed ex. Vestibulum at diam rhoncus, euismod velit mollis, fringilla lorem. Phasellus eget ligula vel diam imperdiet efficitur a quis sem. Maecenas facilisis enim
    eu suscipit vulputate. Nulla porttitor scelerisque dolor in aliquet. Cras quis finibus diam, a blandit est.`,
    aboutmaintxt: 'Our principles'
}

const gallaryPageData = {
    gallary_main: 'Our gallary',
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

const tourPageData = [
    { imgAdress: 'img/tours/brazil.jpg', fotoName: 'Brazil', shortTourData: '7 nights', shortTourPrice: '599', longTourData: '12 nights', longTourPrice: '999' },
    { imgAdress: 'img/tours/castle.jpg', fotoName: 'Castle', shortTourData: '5 nights', shortTourPrice: '299', longTourData: '20 nights', longTourPrice: '999' },
    { imgAdress: 'img/tours/fields.jpg', fotoName: 'Fields', shortTourData: '8 nights', shortTourPrice: '499', longTourData: '14 nights', longTourPrice: '899' },
    { imgAdress: 'img/tours/mount.jpg', fotoName: 'Mount', shortTourData: '10 nights', shortTourPrice: '299', longTourData: '17 nights', longTourPrice: '1099' },
    { imgAdress: 'img/tours/sea.jpg', fotoName: 'Sea', shortTourData: '7 nights', shortTourPrice: '399', longTourData: '12 nights', longTourPrice: '699' },
    { imgAdress: 'img/tours/seaside.jpg', fotoName: 'Seaside', shortTourData: '9 nights', shortTourPrice: '299', longTourData: '15 nights', longTourPrice: '1099' },
    { imgAdress: 'img/tours/city.jpg', fotoName: 'City', shortTourData: '5 nights', shortTourPrice: '399', longTourData: '12 nights', longTourPrice: '1599' },
    { imgAdress: 'img/tours/snow.jpg', fotoName: 'Snow', shortTourData: '9 nights', shortTourPrice: '499', longTourData: '15 nights', longTourPrice: '1299' },
    // { imgAdress: 'img/tours/Terkey.jpg', fotoName: 'Terkey', shortTourData: '8 nights', shortTourPrice: '399', longTourData: '14 nights', longTourPrice: '699' },
    // { imgAdress: 'img/tours/USA.jpg', fotoName: 'USA', shortTourData: '9 nights', shortTourPrice: '499', longTourData: '15 nights', longTourPrice: '1299' },
];
const blogPageData = {};

const contactsPageData = {};

function onloader() {
    pageLoader(templateHome(homePageData));
    menuItemActivator(menuItems);
    pageLisseners();
    setTimeout(animationOpacity, 200);
    // contentAnimationInterval();
}
onloader();

//////pageloader
function pageLoader(markup) {
    content.innerHTML = ''
    content.innerHTML = markup;
}

function toursloader() {
    pageLoader(templateTour())
    let templateTourOrders = _.template(' <div class="tour-item">\
            <img class="tour-foto" src="<%-imgAdress%>" alt="\
                                    <%-fotoName%>">\
            <div class="tour-about">\
                <h4 class="tour-name">Tour to\
                    <%-fotoName%>\
                </h4>\
                <p class="short-tour">\
                    <%-shortTourData%>\
                </p>\
                <p class="price">from\
                    <%-shortTourPrice%>$</p>\
                <p class="long-tour">\
                    <%-longTourData%>\
                </p>\
                <p class="price">from\
                    <%-longTourPrice%>$</p>\
                <button class="tour-detailsbtn">Details</button>\
            </div>\
        </div>');
    const toursList = document.querySelector('.tours-list');
    const markup = tourPageData.reduce((acc, item) => acc + templateTourOrders(item), '');
    toursList.innerHTML = markup;
}

function gallaryLoader() {
    pageLoader(templateGallary(gallaryPageData));
    const gallaryItemsList = document.querySelectorAll('.gallary-item');
    const modalDiv = document.querySelector('#modal-div');
    const modalClose = document.querySelector("#modal-close");


    gallaryItemsList.forEach(item => {
        item.addEventListener('click', imageToBig)
    })
    shadow.addEventListener('click', closingModal);
    modalClose.addEventListener('click', closingModal);

    function imageToBig() {
        let currentId = this.getAttribute("id");
        let modalImg = document.querySelector('.modal-img');
        let imgAdress = `img/gallary/${currentId}.jpg`;
        modalImg.setAttribute("src", `${imgAdress}`);
        modalDiv.style.display = 'block';
        shadow.style.display = 'block';
    }

    function closingModal() {
        modalDiv.style.display = 'none';
        shadow.style.display = 'none';
    }
}

function blogPageLoader() {
    pageLoader(templateBlog(blogPageData));
    sliderMover();
}

function sliderMover() {
    const sliderImages = document.querySelectorAll(".mainblog-img");
    const previosBtn = document.querySelector('#previos');
    const nextBtn = document.querySelector("#next");
    const sliders = document.querySelectorAll(".slider-item");
    const sliderBox = document.querySelector(".slider");
    const showing = document.querySelector('.showing');

    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 1500);
    let playing = true;

    makeSliderHeight();

    sliderImages.forEach(item => {
        item.onclick = () => {
            if (playing) {
                pauseSlide();
            } else {
                playSlide();
            }
        }
    })

    previosBtn.onclick = () => {
        pauseSlide();
        previosSlide();
    }
    nextBtn.onclick = () => {
        pauseSlide();
        nextSlide();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function previosSlide() {
        goToSlide(currentSlide - 1);
    }

    function goToSlide(n) {
        sliders[currentSlide].className = 'slider-item';
        currentSlide = (n + sliders.length) % sliders.length;
        sliders[currentSlide].className = 'slider-item showing';
    }

    function pauseSlide() {
        clearInterval(slideInterval);
        playing = false;
    }

    function playSlide() {
        slideInterval = setInterval(nextSlide, 1500);
        playing = true;
    }

    function makeSliderHeight() {
        let showingStyles = getComputedStyle(showing);
        let showingStylesWidth = showingStyles.width;
        sliderBox.style.height = parseFloat(showingStylesWidth) / 1.5 + 'px';
    }
}

function menuItemActivator(menuItems) {
    menuItems.forEach(item => {
        item.addEventListener('click', () => {

            menuItemRemover(menuItems);
            item.classList.add('nav-link--active');

            setTimeout(animationOpacity, 500);
        })
    })
}

function menuItemRemover(menuItems) {
    menuItems.forEach(elem => {
        elem.classList.remove('nav-link--active');
        // clearOpacity();
    })
}

function animationOpacity() {
    content.style.cssText = ` opacity: 1;`;
}

// function clearOpacity() {
//     content.style.cssText = ` opacity: 0;
//     transition: opacity 2s ease-out;`
// }
///// clicks
function pageLisseners() {
    toHome.addEventListener('click', pageLoader.bind(event, templateHome(homePageData)));
    toAbout.addEventListener('click', pageLoader.bind(event, templateAbout(aboutPageData)));
    toGallary.addEventListener('click', gallaryLoader)
    toTours.addEventListener('click', toursloader);
    toBlog.addEventListener('click', blogPageLoader);
    toContacts.addEventListener('click', pageLoader.bind(event, templateContacts(contactsPageData)));
}