"use strict";
// burger menu 
const toggleMenu = (burgerElement, menuElement) => {
  burgerElement.classList.toggle('active');
  menuElement.classList.toggle('active');
  document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
};

const closeMenu = (burgerElement, menuElement) => {
  burgerElement.classList.remove('active');
  menuElement.classList.remove('active');
  document.body.style.overflow = 'auto';
};

const isClickOutsideMenu = (e, menuElement) => {
  return !menuElement.contains(e.target) && menuElement.classList.contains('active');
};

const burger = document.querySelector('.burger');
const menu = document.querySelector('.site-anchors');
burger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu(burger, menu);
});

const popupBurger = document.querySelector('.popup-burger');
const popupMenu = document.querySelector('.popup-site-anchors');
popupBurger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu(popupBurger, popupMenu);
});

// Event listener for clicks outside the menu, which closes the menu
document.addEventListener('click', (e) => {
  if (isClickOutsideMenu(e, menu)) {
    closeMenu(burger, menu);
  }

  if (isClickOutsideMenu(e, popupMenu)) {
    closeMenu(popupBurger, popupMenu);
  }
});

document.addEventListener('DOMContentLoaded', () => {

  const popupMenu = document.querySelector('.popup-menu');
  const navMenu = document.querySelector('.nav-menu');
  const sectionOneContainer = document.querySelector('.section-one-container');

  // Get initial positions
  const navMenuBottom = navMenu.offsetTop + navMenu.offsetHeight;
  const sectionOneTop = sectionOneContainer.offsetTop;

  // Track the last scroll position
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

  // Function to toggle the popup menu visibility
  function toggleMenu(show) {
    if (show && !popupMenu.classList.contains('active')) {
      popupMenu.classList.add('active');
    } else if (!show && popupMenu.classList.contains('active')) {
      popupMenu.classList.add('animation');
      // Listen for the end of the animation before cleaning up classes
      popupMenu.addEventListener('animationend', function animationHandler() {
        popupMenu.classList.remove('animation');
        popupMenu.classList.remove('active');
        popupMenu.removeEventListener('animationend', animationHandler);
      });
    }
  }

  // Main scroll event handler
  window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;

    // Scrolling up and passing the navMenu and sectionOneContainer
    if (currentScroll < lastScrollTop &&
        currentScroll > navMenuBottom &&
        currentScroll > sectionOneTop) {
      toggleMenu(true);
    // Scrolling down or above navMenu and sectionOneContainer
    } else if (currentScroll > lastScrollTop ||
               currentScroll <= navMenuBottom ||
               currentScroll <= sectionOneTop) {
      toggleMenu(false);
    }
    // Update the last scroll position
    lastScrollTop = currentScroll;
  });
});







// Скрипт для попапа
const popupBg = document.querySelector('.popup_bg'); //фон
const popup = document.querySelector('.popup'); // окно попапа
const openPopupButtons = document.querySelectorAll('.open-popup'); //Кнопка для показа окна
const closePopupButton = document.querySelector('.close-popup'); //Кнопка выключения окна

openPopupButtons.forEach(button => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
        document.body.style.overflow = 'hidden';
    })
});

closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона и окна
    popup.classList.remove('active'); 
    document.body.style.overflow = 'auto';
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === popupBg ) { // Если цель клика - фон, то:
        popupBg.classList.remove('active'); 
        popup.classList.remove('active');
    }
});







// Скрипт для анимации при прокрутке
  // Create Intersection Observer for sections
function animateTitle(targetElement, animationSelector) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animationSelector.forEach(selector => {
            document.querySelector(selector).classList.add('animation');
          });
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    });
  
    observer.observe(targetElement);
  }
 // Define a function to iterate over sections and animate titles.
function animateSectionTitles(sections) {
  for (const [section, selectors] of Object.entries(sections)) {
    const element = document.querySelector(`.${section}-title`);
    if (element) {
      animateTitle(element, selectors);
    }
  }
}

// Define sections with their selectors.
const sectionAnimations = {
  'section-one': ['.section-one-title', '.section-one-title-span-1', '.section-one-title-span-2', '.section-one-title-span-3', '.section-one-title-span-4', '.section-one-subtitle','.section-one-button'],
  'section-two': ['.section-two-title', '.section-two-title-1', '.section-two-title-2', '.section-two-title-3'],
  'section-three': ['.section-three-title', '.section-three-title-1', '.section-three-title-2', '.section-three-title-3'],
  'section-four': ['.section-four-title', '.section-four-title-1', '.section-four-title-2'],
  'section-five': ['.section-five-title', '.section-five-title-1', '.section-five-title-2', '.section-five-title-3'],
  'section-six': ['.section-six-title', '.section-six-title-1', '.section-six-title-2', '.section-six-title-3'],
  'section-seven': ['.section-seven-title', '.section-seven-title-1', '.section-seven-title-2'],
  'section-eight': ['.section-eight-title', '.section-eight-title-1', '.section-eight-title-2', '.section-eight-title-3']
};

// Animate titles for all sections.
animateSectionTitles(sectionAnimations);

  




//Callback функция для открытия попапа
  function setupPopup(openButton, popupBg, popupContainer, closeButton) {
    // Toggle popup visibility
    function togglePopup(isVisible) {
      const action = isVisible ? 'add' : 'remove';
      popupBg.classList[action]('active');
      popupContainer.classList[action]('active');
      document.body.style.overflow = isVisible ? 'hidden' : 'auto';
    }
  
    // Open popup
    openButton.addEventListener('click', (e) => {
      e.preventDefault();
      togglePopup(true);
    });
  
    // Close popup
    const closePopup = () => togglePopup(false);
    closeButton.addEventListener('click', closePopup);
  
    // Close popup if background is clicked
    popupBg.addEventListener('click', (e) => {
      if (e.target === popupBg) {
        closePopup();
      }
    });
  
    // Close popup on pressing the Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    });
  }
  
  // Setup popups
  const popups = [
    { open: '.infoblock-1', bg: '.section-four-popupBG-1', container: '.section-four-popup-1', close: '.close-popup-1' },
    { open: '.infoblock-2', bg: '.section-four-popupBG-2', container: '.section-four-popup-2', close: '.close-popup-2' },
    { open: '.infoblock-3', bg: '.section-four-popupBG-3', container: '.section-four-popup-3', close: '.close-popup-3' }
  ];
  
  popups.forEach(popup => {
    const openButton = document.querySelector(popup.open);
    const popupBg = document.querySelector(popup.bg);
    const popupContainer = document.querySelector(popup.container);
    const closeButton = document.querySelector(popup.close);
  
    setupPopup(openButton, popupBg, popupContainer, closeButton);
  });

  
  
  
  
  
  //Слайдер
  const slider = document.querySelector('.section-seven-slider');
  const carousel = document.querySelector('.carousel');
  const arrowBtns = document.querySelectorAll('.section-seven-slider i');
  const firstCardWidth = document.querySelector('.comment').offsetWidth;
  const carouselChildren = [...carousel.children];
  //Кнопки
  arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
  })
  //Получение числа комментариев, которые могут поместиться в карусели одновременно
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  
  //Вставка копий последних комментариев в начало карусели для бесконечной прокрутки
  carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
  });

  //Вставка копий последних комментариев в конец карусели для бесконечной прокрутки
  carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML);
  });

  let isDragging = false, startX, startScrollLeft, timeoutId;

  const draggStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  }
  const dragStop = (e) => {
    isDragging = false;
    carousel.classList.remove('dragging');
  }
  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  }

  const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 4000);
  }
  autoPlay();
  const infiniteScroll = () => {
    if(carousel.scrollLeft === 0){
      carousel.classList.add('no-transition');
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove('no-transition');

    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
      carousel.classList.add('no-transition');
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove('no-transition');
    }

    clearTimeout(timeoutId);
    if(!slider.matches(":hover")) autoPlay();
    
  }
  carousel.addEventListener('mousedown', draggStart);
  carousel.addEventListener('mousemove', dragging);
  document.addEventListener('mouseup', dragStop);
  carousel.addEventListener('scroll', infiniteScroll);
  slider.addEventListener('mouseenter', () => clearTimeout(timeoutId));
  slider.addEventListener('mouseleave', autoPlay);

