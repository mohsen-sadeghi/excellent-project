import { getUrlParamInUrl } from "./utils.js"

const getAndShowArticleDetails = async ()=>{
    const shortName = getUrlParamInUrl('shortName')
    const res = await fetch(`http://localhost:4000/v1/articles/${shortName}`)
    const article = await res.json()
    console.log(article);

}

export {getAndShowArticleDetails}