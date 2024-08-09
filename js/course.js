import { showInfoCourseToDom ,showCourseInformation ,showTeacherInformation ,ShowCourseComments , submitComments , relatedCourses} from "./funcs/course.js"
window.showCourseInformation = showCourseInformation
window.showTeacherInformation = showTeacherInformation
window.ShowCourseComments = ShowCourseComments
window.addEventListener('load' , ()=>{
    const submitCommentBtn = document.querySelector('.comments__respond-btn')
    submitCommentBtn.addEventListener('click' , ()=>{
        submitComments()
    })
    showInfoCourseToDom()
    relatedCourses()
})