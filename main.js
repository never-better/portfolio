'use strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--bright');
    navbarMenu.classList.remove('open');
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




// function
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior : 'smooth'})
}