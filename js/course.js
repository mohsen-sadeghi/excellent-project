import { showInfoCourseToDom , menuClickHandler} from "./funcs/course.js"
// window.menuClickHandler = menuClickHandler

window.addEventListener('load' , ()=>{
    const menuInfoBtn = document.querySelectorAll('.menu-courses__item')
    menuInfoBtn.forEach(menuBtn =>{
        menuBtn.addEventListener('click' , ()=>{
            menuClickHandler(menuBtn , menuInfoBtn)
        })
    })
    showInfoCourseToDom()
})