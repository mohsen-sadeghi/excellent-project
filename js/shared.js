import { showNameInNavbar , getAndShowCourseInNavbarAndFooter  , searchClickHandler} from "./funcs/shared.js"
window.searchClickHandler = searchClickHandler
window.addEventListener('load' , ()=>{
    showNameInNavbar()
    getAndShowCourseInNavbarAndFooter()
})