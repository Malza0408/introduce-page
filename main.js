"use strict";

const spyEls = document.querySelectorAll("section.scroll-spy");
const navbar = document.querySelector("#navbar");
const navbarMenu = document.querySelector(".navbar__menu");
const contactBtn = document.querySelector(".home_contact");
const contactMe = document.querySelector("#contact");
const arrowUp = document.querySelector(".arrow-up");
const projectListBtn = document.querySelectorAll(".list__btn");
const myWorkProject = document.querySelector(".myWork__projects");
const projects = document.querySelectorAll(".project");
const contactRights = document.querySelector(".contact__rights");
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
const workListCount = document.querySelectorAll(".list__count");

// Scroll Magic 을 이용한 Scrolling
// scroll 을 인지해서 각 section 에 도달했는지 체크
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl,
    triggerHook: 0.8,
  })
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller());
});

// Scroll 시 Navbar 버튼 배경색 생김
window.addEventListener("scroll", (evenet) => {
  if (scrollY > 0) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active");
  }
  // arrowUp 활성화
  if (scrollY > 100) {
    arrowUp.classList.add("show");
  } else {
    arrowUp.classList.remove("show");
  }
});

// 작은 사이즈에서 navbar toggle 버튼
navbarToggleBtn.addEventListener("click", (event) => {
  navbarMenu.classList.toggle("open");
});

// navbar_menu click 시 해당 section으로 scroll
navbarMenu.addEventListener("click", (event) => {
  if (event.target.dataset.selected === undefined) return;
  const target = event.target;
  const selected = target.dataset.selected;
  scrollIntoView(selected);
});

// contactMe 버튼 click 시 contactMe 로 scroll
contactBtn.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

// arrow btn 활성화
arrowUp.addEventListener("click", (event) => {
  scrollIntoView("#home");
});

let frontendCount = 0;
let backendCount = 0;
projects.forEach((project) => {
  if (project.dataset.type === "frontend") {
    frontendCount++;
  } else {
    backendCount++;
  }
});

// project list 의 count 값
workListCount[0].innerText = `${frontendCount + backendCount}`;
workListCount[1].innerText = `${frontendCount}`;
workListCount[2].innerText = `${backendCount}`;

// project list 구분별로 띄우기
projectListBtn.forEach((list) => {
  list.addEventListener("click", (event) => {
    // list btn active
    const activeList = document.querySelector(".list__btn.active");
    activeList.classList.remove("active");
    event.target.classList.add("active");

    // show, hidden project
    myWorkProject.classList.add("playAnim");
    setTimeout(() => {
      const type = event.target.dataset.type;
      if (type === "all") {
        projects.forEach((project) => {
          project.classList.remove("hidden");
        });
      } else {
        projects.forEach((project) => {
          if (project.dataset.type === type) {
            project.classList.remove("hidden");
          } else {
            project.classList.add("hidden");
          }
        });
      }
      myWorkProject.classList.remove("playAnim");
    }, 300);
  });
});

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#myWork",
  "#testimonials",
  "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-selected="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
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
  rootMargin: "0px",
  threshold: 0.3,
});

// 각 section을 observe
sections.forEach((section) => observer.observe(section));
// scroll 은 모든 스크롤을 포함하기때문에 wheel 로 한다. 사용자가 스크롤링 할 때만 적용
window.addEventListener("wheel", () => {
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
