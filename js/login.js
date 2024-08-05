import { loginUser } from "./funcs/auth.js"

window.addEventListener('load' , ()=>{
    const loginBtn= document.querySelector('#login-btn')
    loginBtn.addEventListener('click' , loginUser)
})