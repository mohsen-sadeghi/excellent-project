import { showSwal } from "./utils.js"

const submitContactUsMassage = async ()=>{
    const formNameElem = document.querySelector('.form__name')
    const formEmailElem = document.querySelector('.form__email')
    const formNumberElem = document.querySelector('.form__number')
    const formTextElem = document.querySelector('.form__name')

    const newMassage = {
        name: formNameElem.value.trim(),
        email: formEmailElem.value.trim(),
        phone: formNumberElem.value.trim(),
        body: formTextElem.value.trim(),
    }

    const res = await fetch(`http://localhost:4000/v1/contact` , {
        method:'POST',
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(newMassage)
    })
    const data = await res.json()
    if(res.ok){
        showSwal("نظر شما با موفقیت ثبت شد" , 'success' , 'خیلی خب' , ()=>{})
    }else{
        showSwal(`${data.message[0].message}` , 'error' , 'خیلی خب' , ()=>{})
    }
}

export {submitContactUsMassage}