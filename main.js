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
})

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
})

// Handle contact button on home
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
  scrollIntoView('#contact')

})


function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior : 'smooth'})
}



