import './style.css'

import Exprience from './Experience/Experience'
const exprience=new Exprience(document.querySelector('canvas'))

const burger=document.querySelector('#app .home .burger')
const canvas=document.querySelector('#app  canvas')
const nav_right=document.querySelector('#app  .nav-right')
burger.addEventListener('click',()=>{
    burger.classList.toggle('close')
    nav_right.classList.toggle('show')
    canvas.classList.toggle('move') 
})


