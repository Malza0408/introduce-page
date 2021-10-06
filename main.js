'use strict';

const spyEls = document.querySelectorAll('section.scroll-spy');
const navbar = document.querySelector('#navbar');
const navbarMenu = document.querySelector('.navbar__menu');
const contactBtn = document.querySelector('.home_contact')
const contactMe = document.querySelector('#contact');

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

// Scroll 시 Navbar 버튼 배경색 생김
window.addEventListener('scroll',  (evenet) => {
  if (scrollY > 0) {
    navbar.classList.add('active');
    
  } else {
    navbar.classList.remove('active');
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