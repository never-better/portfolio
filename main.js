'use strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--bright');
  } else{
    navbar.classList.remove('navbar--bright');
  }
});

// Hand Scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu');
navbar.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if(link == null){
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener ('click', (event) =>{
  navbarMenu.classList.toggle('open');
})

// Handle contact button on home
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
  scrollIntoView('#contact')
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = (1 - window.scrollY / homeHeight);
});

// show arrow up
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight/2){
    arrowUp.classList.add('visible');
  } else{
    arrowUp.classList.remove('visible')
  }
})

// handle click on the arrow up
arrowUp.addEventListener('click', ()=>{
  scrollIntoView('#home');
})




// My travel filltering and animation

const workBtnContainer = document.querySelector('.travel__categories');
const projectContainer = document.querySelector('.travel__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e)=> {
  const filter = e.target.dataset.filter ||
  e.target.parentNode.dataset.filter;

  if(filter==null){
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;

  target.classList.add('selected');


  projectContainer.classList.add('anim-out');
  setTimeout(()=> {
    projects.forEach((project) => {
    console.log(project.dataset.type);
    if(filter == '*' || filter == project.dataset.type){
      project.classList.remove('invisible');
    } else{
      project.classList.add('invisible');
    }
  })

  projectContainer.classList .remove('anim-out');
  }, 300);

})




const sectionIDs = [
  '#home', 
  '#about', 
  '#skills',
  '#travel', 
  '#testimonials',
  '#contact' 
];

const sections = sectionIDs.map(id => document.querySelector(id));
const navItems = sectionIDs.map(id => 
  document.querySelector(`[data-link="${id}"]`)
  );

  let selectedNavIndex = 0;
  let selectedNavItem = navItems[0];

  function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
  }


function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior : 'smooth'})
  selectNavItem(navItems[sectionIDs.indexOf(selector)]);
}

  const observerOptions = {
    root: null,
    rootMargine: '0px',
    threshold: 0.3,
  }

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting && entry.intersectionRatio > 0){
        const index = sectionIDs.indexOf(`#${entry.target.id}`);
        if(entry.boundingClientRect.y < 0 ){
          selectedNavIndex = index + 1;
        } else{
          selectedNavIndex = index - 1;
        }
      }
    });
  };



  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  window.addEventListener('wheel', ()=>{
    if(window.scrollY === 0){
      selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight)
      >= document.body.clientHeight){
      selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);  
  })