'use strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
  console.log(window.scrollY);
  console.log(navbarHeight);
  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--bright');
  } else{
    navbar.classList.remove('navbar--bright');
  }
})