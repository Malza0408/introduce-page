'use strict';

const spyEls = document.querySelectorAll('section.scroll-spy');
const navbar = document.querySelector('#navbar');
const navbarMenu = document.querySelector('.navbar__menu');
const contactBtn = document.querySelector('.home_contact')
const contactMe = document.querySelector('#contact');
const arrowUp = document.querySelector('.arrow-up');
const projectListBtn = document.querySelectorAll('.list__btn');
const myWorkProject = document.querySelector('.myWork__projects');
const projects = document.querySelectorAll('.project');


// Scroll Magic 을 이용한 Scrolling
// scroll 을 인지해서 각 section 에 도달했는지 체크
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,
      triggerHook: .8,
    })
    .setClassToggle(spyEl, 'show')    
    .addTo(new ScrollMagic.Controller());
});

spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,
      triggerHook: -.3,
    })
    .setClassToggle(spyEl, 'foggy')    
    .addTo(new ScrollMagic.Controller());
});

// Scroll 시 Navbar 버튼 배경색 생김
window.addEventListener('scroll',  (evenet) => {
  if (scrollY > 0) {
    navbar.classList.add('active');
    
  } else {
    navbar.classList.remove('active');
  }
  if (scrollY > 100) {
    arrowUp.style.opacity = 1;
  } else {
    arrowUp.style.opacity = 0;
  }
  // Scroll 시 각 section 투명하게
  const foggy = document.querySelectorAll('.foggy');
  const lastEl = foggy[foggy.length - 1];
  if (lastEl) {
    const elHeight = lastEl.getBoundingClientRect().height;
    const y = lastEl.getBoundingClientRect().y;
    lastEl.style.opacity = 1 - (Math.abs(y) / elHeight);
  }
});

// navbar_menu click 시 해당 section으로 scroll
navbarMenu.addEventListener('click', (event) => {
  if (event.target.dataset.selected === undefined) return;
  const target = event.target;
  const seleted = target.dataset.selected;
  const menu = document.querySelector(seleted);
  menu.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
})

// contactMe 버튼 click 시 contactMe 로 scroll
contactBtn.addEventListener('click', (event) => {
  contactMe.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
})

// arrow btn 활성화
arrowUp.addEventListener('click', (event) => {
  scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// project list 구분별로 띄우기
projectListBtn.forEach(list => {
  list.addEventListener('click', (event) => {
    // list btn active
    const activeList = document.querySelector('.list__btn.active');
    activeList.classList.remove('active');
    event.target.classList.add('active');

    // show, hidden project    
    myWorkProject.classList.add('playAnim');
    setTimeout(() => {
    const type = event.target.dataset.type;
    if (type === "all") {
      projects.forEach(project => {
        project.classList.remove('hidden');
      })
    } else {
      projects.forEach(project => {
        if (project.dataset.type === type) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      })
      }
      myWorkProject.classList.remove('playAnim');
    }, 300);
  })
})