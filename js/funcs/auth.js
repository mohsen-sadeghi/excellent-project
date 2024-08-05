import {showSwal , setToLocalStorage , getToken} from "./utils.js"

const registerUser = async ()=>{
    const name = document.querySelector('#name')
    const userName = document.querySelector('#user-name')
    const userEmail = document.querySelector('#user-email')
    const userPhone = document.querySelector('#user-number')
    const userPassword = document.querySelector('#password')

    const userInformation = {
        username : userName.value.trim(),
        email : userEmail.value.trim(),
        password : userPassword.value.trim(),
        confirmPassword : userPassword.value.trim(),
        name : name.value.trim(),
        phone : userPhone.value.trim(),
    }

    const res = await fetch(`http://localhost:4000/v1/auth/register` , {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(userInformation)
    })
    const data = await res.json()

    if(res.status === 201){
        showSwal("با موفقیت ثبت نام شدید" , "success" , "تایید" , () => {location.href = 'index.html'})
        setToLocalStorage("token" , data.accessToken)
    }else if(res.status === 400){
        showSwal("آدرس ایمیل نامعتبر" , "error" , "تایید" , () => {})
    }
    else if(res.status === 409){
        showSwal("نام کاربری یا ایمیل قبلا استفاده شده" , "error" , "تایید" , () => {})
    }else if(res.status === 403){
        showSwal("متاسفانه این شماره تلفن بن شده" , "error" , "تایید" , () => {})
    }
}

const loginUser = async ()=>{
    const userEmail = document.querySelector('#email')
    const userPassword = document.querySelector('#password')

    const loginInfo = {
        identifier : userEmail.value.trim(),
        password : userPassword.value.trim()
    }

    const res = await fetch(`http://localhost:4000/v1/auth/login` , {
        method:"POST",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(loginInfo)
    })
    const data = await res.json()

    if(res.ok){
        showSwal("با موفقیت لاگین شدید" , "success" , "تایید" , () => {location.href = 'index.html'})
        setToLocalStorage("token" , data.accessToken)
    }else{
        showSwal("هیچ کاربری با این ایمیل یا نام کاربری وجود ندارد" , "error" , "تایید" , () => {})
    }

    // 401 => رمز اشتباه
}

const getMe = async ()=>{
    const token = getToken()
    if(token){
        const res = await fetch(`http://localhost:4000/v1/auth/me` , {
            headers:{
                Authorization : `bearer ${token}`
            }
        })
        const data = await res.json()
        return data
    }else{
        return false
    }

}

export{registerUser , loginUser , getMe}