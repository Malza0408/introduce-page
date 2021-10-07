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
const contactRights = document.querySelector('.contact__rights');
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');


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
  // arrowUp 활성화
  if (scrollY > 100) {
    arrowUp.classList.add('show');
  } else {
    arrowUp.classList.remove('show');
  }

  // Scroll 시 각 section 투명하게
  const foggy = document.querySelectorAll('.foggy');
  const lastEl = foggy[foggy.length - 1];
  if (window.matchMedia("(min-width: 769px)").matches) {
    if (lastEl) {
      const elHeight = lastEl.getBoundingClientRect().height;
      const y = lastEl.getBoundingClientRect().y;
      let opacity = 1 - (Math.abs(y) / elHeight);
      if (opacity > 0.95) opacity = 1;
      lastEl.style.opacity = opacity;
    }
  } else {
    foggy.forEach(fog => {
      fog.style.opacity = 1;
    })
  }
});


// 작은 사이즈에서 navbar toggle 버튼
navbarToggleBtn.addEventListener('click', (event) => {
  navbarMenu.classList.toggle('open');
})

// navbar_menu click 시 해당 section으로 scroll
navbarMenu.addEventListener('click', (event) => {
  if (event.target.dataset.selected === undefined) return;
  const target = event.target;
  const seleted = target.dataset.selected;
  const menu = document.querySelector(seleted);
  menu.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

  const activeNavbar = document.querySelector('.navbar__menu__item.active');
  activeNavbar.classList.remove('active');
  target.classList.add('active');
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

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#myWork',
  '#testimonials',
  '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-selected="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}


const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(callback, {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
});

// 각 section을 observe
sections.forEach((section) => observer.observe(section));
// scroll 은 모든 스크롤을 포함하기때문에 wheel 로 한다. 사용자가 스크롤링 할 때만 적용
window.addEventListener('wheel', () => {
  if (window.scrollY == 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

const date = new Date();
contactRights.innerText = `${date.getFullYear()} Malza' Homepage - All rights reserved`;