'use strict';

const spyEls = document.querySelectorAll('section.scroll-spy');
const navbar = document.querySelector('#navbar');
const navbarMenu = document.querySelector('.navbar__menu');
const contactBtn = document.querySelector('home_contact')

spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,
      triggerHook: .8,
    })
    .setClassToggle(spyEl, 'show')    
    .addTo(new ScrollMagic.Controller());
});

window.addEventListener('scroll',  (evenet) => {
  if (scrollY > 0) {
    navbar.classList.add('active');
    
  } else {
    navbar.classList.remove('active');
  }
});

navbarMenu.addEventListener('click', (event) => {
  if (event.target.dataset.selected === undefined) return;
  const target = event.target;
  const seleted = target.dataset.selected;
  const menu = document.querySelector(seleted);
  menu.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
})