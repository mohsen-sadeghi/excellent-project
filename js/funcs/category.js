import {getUrlParamInUrl} from './utils.js'

const getAndShowCategoryCourses = async ()=>{
    let categoryName = getUrlParamInUrl('cat')
    categoryName = categoryName.slice(15)
    const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
    const category = await res.json()
    return category
}

const courseSorting = (name , array)=>{
    let outPutArray = []

    switch(name){
        case 'free' : {
            outPutArray = array.filter(course => course.price === 0)
            break;
        }
        case 'price' : {
            outPutArray = array.filter(course => course.price !== 0)
            break;
        }
        case 'first' : {
            outPutArray = [...array].reverse()
            break;
        }
        default: {
            outPutArray = array;
        }
    }

    return outPutArray
}

export {getAndShowCategoryCourses , courseSorting}