import { getUrlParamInUrl } from "./utils.js"

const getAndShowArticleDetails = async ()=>{
    const articleTitleElem = document.querySelector('.article-right-header__title')
    const articleImageElem = document.querySelector('.article-right-header__image')
    const teacherNameElem = document.querySelector('.article-left-header__name')
    const publicationDateElem = document.querySelector('.article-left-body__data') 
    const updateDateElem = document.querySelector('.article-left-body__update')   
    const shortName = getUrlParamInUrl('shortName')
    const res = await fetch(`http://localhost:4000/v1/articles/${shortName}`)
    const article = await res.json()
    
    const createdAt = article.creator.createdAt.slice(0 , 10)
    const updatedAt = article.creator.updatedAt.slice(0 , 10)
    articleTitleElem.innerHTML = article.title
    articleImageElem.src = `http://localhost:4000/courses/covers/${article.cover}`
    teacherNameElem.innerHTML = article.creator.name
    publicationDateElem.innerHTML = `تاریخ انتشار : ${createdAt}`
    if(createdAt !== updatedAt){
        updateDateElem.innerHTML = `تاریخ آپدیت : ${updatedAt}`
    }else{
        updateDateElem.innerHTML = `تاریخ آپدیت : (آپدیت نشده)`
    }
}

export {getAndShowArticleDetails}