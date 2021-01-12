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

  console.log(event.target.dataset.link);

  scrollIntoView(link);
});

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