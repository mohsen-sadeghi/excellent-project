import { getUrlParamInUrl } from "./utils.js";
import { getToken } from "./utils.js";
const showInfoCourseToDom = async () => {
  const courseName = getUrlParamInUrl("name");
  const res = await fetch(`http://localhost:4000/v1/courses/${courseName}` , {
    headers: {
      Authorization: `bearer ${getToken()}`,
    },
  });
  const course = await res.json();

  const mainImageElem = document.querySelector(".cover-image");
  const boxImageElem = document.querySelector(".course__image");
  const coursePriceElem = document.querySelector(".course__price");
  const TimeBoxElem = document.querySelector(".course__include-text");
  const courseTitle = document.querySelector(".course-information__title");
  const courseCaption = document.querySelector(".course-information__caption");
  const collapseWrapper = document.querySelector(".accordion-item");
  const registerLinkWrapperElem = document.querySelector('.register-links')
  console.log(course);

  const imageLink = `http://localhost:4000/courses/covers/${course.cover}`;
  mainImageElem.src = imageLink;
  boxImageElem.src = imageLink;

  coursePriceElem.innerHTML = `${course.price.toLocaleString()} تومان`;
  TimeBoxElem.innerHTML = `${5} ساعت ویدیوی درخواستی`;
  courseTitle.innerHTML = course.name;
  courseCaption.innerHTML = course.description;

  course.sessions.forEach((session, index) => {
    collapseWrapper.insertAdjacentHTML(
      "beforeend",
      `
                                    <div
                          id="collapseOne"
                          class="accordion-collapse session-wrapper collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                          style=""
                        >

                          <div
                            id="collapseOne"
                            class="accordion-collapse session-wrapper collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                            style=""
                          >
                            <div class="accordion-body introduction__accordion-body">
                              <div class="introduction__accordion-right">
                                <span class="introduction__accordion-count"
                                  >${++index}</span
                                >
                                <svg
                                  class="svg-inline--fa fa-youtube introduction__accordion-icon"
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fab"
                                  data-icon="youtube"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                  data-fa-i2svg=""
                                >
                                  <path
                                    fill="currentColor"
                                    d="M549.7 124.1c-6.281-23.65-24.79-42.28-48.28-48.6C458.8 64 288 64 288 64S117.2 64 74.63 75.49c-23.5 6.322-42 24.95-48.28 48.6-11.41 42.87-11.41 132.3-11.41 132.3s0 89.44 11.41 132.3c6.281 23.65 24.79 41.5 48.28 47.82C117.2 448 288 448 288 448s170.8 0 213.4-11.49c23.5-6.321 42-24.17 48.28-47.82 11.41-42.87 11.41-132.3 11.41-132.3s0-89.44-11.41-132.3zm-317.5 213.5V175.2l142.7 81.21-142.7 81.2z"> 
                                    </path></svg>
                                    ${
                                      session.free
                                        ? `<a href='episode.html?name=${course.shortName}&id=${session._id}' class='introduction__accordion-link'>${session.title}</a>`
                                        : `<p class='introduction__accordion-link'>${session.title}</p>`
                                    }
                                  
                              </div>
                              <div class="introduction__accordion-left">
                                <span class="introduction__accordion-time">
                                  ${session.time}
                                </span>
                                ${
                                  session.free
                                    ? "<i class='fa fa-unlock'></i>"
                                    : "<i class='fa fa-lock'></i>"
                                }
                              </div>
                            </div>
                          </div>
                        </div>
            `
    );
  });

  registerLinkWrapperElem.insertAdjacentHTML('beforeend' , `
    ${course.isUserRegisteredToThisCourse ? `<input href="#" type="button" class="course__link-add" value="دانشجو دوره هستید">` : `
    <input href="#" type="button" class="course__link-add" value="اضافه به سبد خرید">
    <input href="#" type="button" class="course__link-buy" value="خرید">
    `}
    `)

  showCourseComment(course.comments);
  showTimeCourses(course.sessions)
};

const showCourseComment = (comments) => {
  const commentWrapper = document.querySelector(".course-comment__title");
  if (comments.length) {
    comments.forEach((comment) => {
      commentWrapper.insertAdjacentHTML(
        "beforeend",
        `
                          <div class="comment">
                    <!-- questions -->
                    <div class="comment-questions">
                      <div class="comment-questions__header">
                        <div class="comment-questions__header--right">
                          <h2 class="comment-questions__name">${
                            comment.creator.name
                          }</h2>
                          <p class="comment-questions__status">${
                            comment.creator.role === "USER"
                              ? "(دانشجو)"
                              : "(مدرس)"
                          }</p>
                          <p class="comment-questions__date">${comment.createdAt.slice(
                            0,
                            10
                          )}</p>
                        </div>
                        <div class="comment-questions__header--left">
                          <a href="#" class="comment-questions__input">پاسخ</a>
                        </div>
                      </div>
                      <div class="comment-questions__body">
                        <p class="comment-questions__body--text">
                        ${comment.body}
                                                </p>
                      </div>
                    </div>
                    <!-- answer -->

                    ${
                      comment.answerContent
                        ? `
                    <div class="comment-answer">
                      <div class="comment-answer__header">
                        <div class="comment-answer__header--right">
                          <h2 class="comment-answer__name">${comment.answerContent.creator.name}</h2>
                          <p class="comment-answer__status">${comment.answerContent.creator.role === "ADMIN" ? "(مدرس)" : "(دانشجو)"} </p>
                          <p class="comment-answer__date">${comment.answerContent.createdAt.slice(0,10)}</p>
                        </div>
                        <div class="comment-answer__header--left">
                          <a href="#" class="comment-answer__input">پاسخ</a>
                        </div>
                      </div>
                      <div class="comment-answer__body">
                        <p class="comment-answer__body--text">${comment.answerContent.body}
                      </div>
                    </div>
                  </div>`
                        : ""
                    }

        `
      );
    });
  } else {
    commentWrapper.insertAdjacentHTML('beforeend' , `
      <p class="text-danger">نظری برای این دوره ثبت نشده است</p>
      `)
  }
};

const showTimeCourses = (sessions)=>{
  const courseTimeElem = document.querySelector('.content__caption')
  const boxTimeElem = document.querySelector('.course__include-text')
  let hour = 0
  let minutes = 0
  let second = 0
  sessions.forEach(session =>{
    let sessionMinutes = +session.time.slice(0 , 2)
    let sessionSecond = +session.time.slice(3 , 5)
    second += sessionSecond
    minutes += sessionMinutes
    if(second >= 60){
      ++minutes
      second -= 60
    }
    if(minutes >= 60){
      ++hour
      minutes -= 60
    }
  })

  let resultTime = `${hour}:${minutes}:${second}`
  courseTimeElem.innerHTML = resultTime
  boxTimeElem.innerHTML = `${hour} ساعت ویدیوی درخواستی`
}

const menuClickHandler = (btn , menuBtn)=>{
  console.log(btn);
  if(!btn.classList[1]){
    menuBtn.forEach(btn => btn.classList.remove('menu-courses__item--active'))
    btn.classList.add('menu-courses__item--active')
  }
}

export { showInfoCourseToDom , menuClickHandler};
