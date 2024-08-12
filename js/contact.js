import { submitContactUsMassage } from "./funcs/contact.js"

window.addEventListener('load' , ()=>{
    const submitBtn = document.querySelector('.form__btn')
    submitBtn.addEventListener('click' , ()=>{
        submitContactUsMassage()
    })
})