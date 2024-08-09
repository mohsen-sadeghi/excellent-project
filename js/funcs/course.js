import { getUrlParamInUrl, getToken, showSwal } from "./utils.js";
const showInfoCourseToDom = async () => {
  const courseName = getUrlParamInUrl("name");
  const res = await fetch(`http://localhost:4000/v1/courses/${courseName}`, {
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
  const registerLinkWrapperElem = document.querySelector(".register-links");

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

  registerLinkWrapperElem.insertAdjacentHTML(
    "beforeend",
    `
    ${
      course.isUserRegisteredToThisCourse
        ? `<input href="#" type="button" class="course__link-add" value="دانشجو دوره هستید">`
        : `
    <input href="#" type="button" class="course__link-add" value="اضافه به سبد خرید">
    <input href="#" type="button" class="course__link-buy" value="خرید">
    `
    }
    `
  );

  showCourseComment(course.comments);
  showTimeCourses(course.sessions);
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
                          <h2 class="comment-answer__name">${
                            comment.answerContent.creator.name
                          }</h2>
                          <p class="comment-answer__status">${
                            comment.answerContent.creator.role === "ADMIN"
                              ? "(مدرس)"
                              : "(دانشجو)"
                          } </p>
                          <p class="comment-answer__date">${comment.answerContent.createdAt.slice(
                            0,
                            10
                          )}</p>
                        </div>
                        <div class="comment-answer__header--left">
                          <a href="#" class="comment-answer__input">پاسخ</a>
                        </div>
                      </div>
                      <div class="comment-answer__body">
                        <p class="comment-answer__body--text">${
                          comment.answerContent.body
                        }
                      </div>
                    </div>
                  </div>`
                        : ""
                    }

        `
      );
    });
  } else {
    commentWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <p class="text-danger">نظری برای این دوره ثبت نشده است</p>
      `
    );
  }
};

const showTimeCourses = (sessions) => {
  const courseTimeElem = document.querySelector(".content__caption");
  const boxTimeElem = document.querySelector(".course__include-text");
  let hour = 0;
  let minutes = 0;
  let second = 0;
  sessions.forEach((session) => {
    let sessionMinutes = +session.time.slice(0, 2);
    let sessionSecond = +session.time.slice(3, 5);
    second += sessionSecond;
    minutes += sessionMinutes;
    if (second >= 60) {
      ++minutes;
      second -= 60;
    }
    if (minutes >= 60) {
      ++hour;
      minutes -= 60;
    }
  });

  let resultTime = `${hour}:${minutes}:${second}`;
  courseTimeElem.innerHTML = resultTime;
  boxTimeElem.innerHTML = `${hour} ساعت ویدیوی درخواستی`;
};

const showCourseInformation = (event) => {
  const className = event.target.parentElement.classList;
  if (!className[1]) {
    addActiveClass(0);
    const courseReviewElem = document.querySelector(".course-review");
    courseReviewElem.style.display = "block";
  }
};

const showTeacherInformation = (event) => {
  const className = event.target.parentElement.classList;
  if (!className[1]) {
    addActiveClass(1);
    const teacherInfoElem = document.querySelector(".teacher-info");
    teacherInfoElem.style.display = "block";
  }
};

const ShowCourseComments = (event) => {
  const className = event.target.parentElement.classList;
  if (!className[1]) {
    addActiveClass(2);
    const courseCommentElem = document.querySelector(".course-comment");
    courseCommentElem.style.display = "block";
  }
};

const addActiveClass = (index) => {
  const teacherInfoElem = document.querySelector(".teacher-info");
  const courseReviewElem = document.querySelector(".course-review");
  const courseCommentElem = document.querySelector(".course-comment");
  const allMenuElem = document.querySelectorAll(".menu-courses__item");
  allMenuElem.forEach((elem) =>
    elem.classList.remove("menu-courses__item--active")
  );
  allMenuElem[index].classList.add("menu-courses__item--active");
  teacherInfoElem.style.display = "none";
  courseReviewElem.style.display = "none";
  courseCommentElem.style.display = "none";
};

const submitComments = async () => {
  const reviewScoreElem = document.querySelector("#review__score");
  let score = reviewScoreElem.value;
  const commentElem = document.querySelector(".comments__score-input-respond");
  const courseShortName = getUrlParamInUrl("name");

  const newCommentInfo = {
    body: commentElem.value.trim(),
    courseShortName: courseShortName,
    score: score,
  };

  const res = await fetch(`http://localhost:4000/v1/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCommentInfo),
  });

  if (res.ok) {
    showSwal("با موفقیت نظ شما ثبت شد", "success", "درسته", () => {});
  } else {
    showSwal(
      "نظر شما ثبت نشد لطفا اطلاعات را به درستی وارد نمایید",
      "error",
      "خوب",
      () => {}
    );
  }
};

const relatedCourses = async () => {
  const relatedCourseWrapper = document.querySelector(".related-wrapper");
  const courseShortName = getUrlParamInUrl("name");
  const res = await fetch(
    `http://localhost:4000/v1/courses/related/${courseShortName}`
  );
  const relatedCourses = await res.json();
  relatedCourses.forEach((course) => {
    relatedCourseWrapper.insertAdjacentHTML(
      "beforeend",
      `
              <div class="col-12 col-sm-6 col-lg-4">
              <div class="courses__box">
                <a href="course.html?name=${
                  course.shortName
                }" class="courses-box__link">
                  <img
                    src=http://localhost:4000/courses/covers/${course.cover}
                    class="courses__image"
                  />
                  <div class="courses__svgs">
                   <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="courses__svg"
                    >
                      <path
                        d="M14.7191 18.8919C14.2774 18.8919 13.7107 18.7503 13.0024 18.3336L10.5107 16.8586C10.2524 16.7086 9.75235 16.7086 9.50234 16.8586L7.00232 18.3336C5.5273 19.2086 4.66063 18.8586 4.26896 18.5753C3.88562 18.2919 3.28561 17.5669 3.67728 15.9003L4.26896 13.3419C4.33562 13.0752 4.20229 12.6169 4.00229 12.4169L1.9356 10.3502C0.902253 9.31685 0.985587 8.43351 1.12726 8.00017C1.26892 7.56683 1.71893 6.80016 3.15228 6.55849L5.81064 6.11682C6.06064 6.07515 6.41898 5.80848 6.52731 5.58348L8.00233 2.64178C8.669 1.3001 9.54401 1.1001 10.0023 1.1001C10.4607 1.1001 11.3357 1.3001 12.0024 2.64178L13.4691 5.57514C13.5857 5.80015 13.9441 6.06682 14.1941 6.10848L16.8524 6.55015C18.2941 6.79182 18.7441 7.5585 18.8774 7.99184C19.0108 8.42517 19.0941 9.30852 18.0691 10.3419L16.0024 12.4169C15.8024 12.6169 15.6774 13.0669 15.7357 13.3419L16.3274 15.9003C16.7108 17.5669 16.1191 18.2919 15.7357 18.5753C15.5274 18.7253 15.1941 18.8919 14.7191 18.8919Z"
                        fill="#FFB127" 
                      />
                    </svg>
                     <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="courses__svg"
                    >
                      <path
                        d="M14.7191 18.8919C14.2774 18.8919 13.7107 18.7503 13.0024 18.3336L10.5107 16.8586C10.2524 16.7086 9.75235 16.7086 9.50234 16.8586L7.00232 18.3336C5.5273 19.2086 4.66063 18.8586 4.26896 18.5753C3.88562 18.2919 3.28561 17.5669 3.67728 15.9003L4.26896 13.3419C4.33562 13.0752 4.20229 12.6169 4.00229 12.4169L1.9356 10.3502C0.902253 9.31685 0.985587 8.43351 1.12726 8.00017C1.26892 7.56683 1.71893 6.80016 3.15228 6.55849L5.81064 6.11682C6.06064 6.07515 6.41898 5.80848 6.52731 5.58348L8.00233 2.64178C8.669 1.3001 9.54401 1.1001 10.0023 1.1001C10.4607 1.1001 11.3357 1.3001 12.0024 2.64178L13.4691 5.57514C13.5857 5.80015 13.9441 6.06682 14.1941 6.10848L16.8524 6.55015C18.2941 6.79182 18.7441 7.5585 18.8774 7.99184C19.0108 8.42517 19.0941 9.30852 18.0691 10.3419L16.0024 12.4169C15.8024 12.6169 15.6774 13.0669 15.7357 13.3419L16.3274 15.9003C16.7108 17.5669 16.1191 18.2919 15.7357 18.5753C15.5274 18.7253 15.1941 18.8919 14.7191 18.8919Z"
                        fill="#FFB127" 
                      />
                    </svg>
                     <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="courses__svg"
                    >
                      <path
                        d="M14.7191 18.8919C14.2774 18.8919 13.7107 18.7503 13.0024 18.3336L10.5107 16.8586C10.2524 16.7086 9.75235 16.7086 9.50234 16.8586L7.00232 18.3336C5.5273 19.2086 4.66063 18.8586 4.26896 18.5753C3.88562 18.2919 3.28561 17.5669 3.67728 15.9003L4.26896 13.3419C4.33562 13.0752 4.20229 12.6169 4.00229 12.4169L1.9356 10.3502C0.902253 9.31685 0.985587 8.43351 1.12726 8.00017C1.26892 7.56683 1.71893 6.80016 3.15228 6.55849L5.81064 6.11682C6.06064 6.07515 6.41898 5.80848 6.52731 5.58348L8.00233 2.64178C8.669 1.3001 9.54401 1.1001 10.0023 1.1001C10.4607 1.1001 11.3357 1.3001 12.0024 2.64178L13.4691 5.57514C13.5857 5.80015 13.9441 6.06682 14.1941 6.10848L16.8524 6.55015C18.2941 6.79182 18.7441 7.5585 18.8774 7.99184C19.0108 8.42517 19.0941 9.30852 18.0691 10.3419L16.0024 12.4169C15.8024 12.6169 15.6774 13.0669 15.7357 13.3419L16.3274 15.9003C16.7108 17.5669 16.1191 18.2919 15.7357 18.5753C15.5274 18.7253 15.1941 18.8919 14.7191 18.8919Z"
                        fill="#FFB127" 
                      />
                    </svg>
                     <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="courses__svg"
                    >
                      <path
                        d="M14.7191 18.8919C14.2774 18.8919 13.7107 18.7503 13.0024 18.3336L10.5107 16.8586C10.2524 16.7086 9.75235 16.7086 9.50234 16.8586L7.00232 18.3336C5.5273 19.2086 4.66063 18.8586 4.26896 18.5753C3.88562 18.2919 3.28561 17.5669 3.67728 15.9003L4.26896 13.3419C4.33562 13.0752 4.20229 12.6169 4.00229 12.4169L1.9356 10.3502C0.902253 9.31685 0.985587 8.43351 1.12726 8.00017C1.26892 7.56683 1.71893 6.80016 3.15228 6.55849L5.81064 6.11682C6.06064 6.07515 6.41898 5.80848 6.52731 5.58348L8.00233 2.64178C8.669 1.3001 9.54401 1.1001 10.0023 1.1001C10.4607 1.1001 11.3357 1.3001 12.0024 2.64178L13.4691 5.57514C13.5857 5.80015 13.9441 6.06682 14.1941 6.10848L16.8524 6.55015C18.2941 6.79182 18.7441 7.5585 18.8774 7.99184C19.0108 8.42517 19.0941 9.30852 18.0691 10.3419L16.0024 12.4169C15.8024 12.6169 15.6774 13.0669 15.7357 13.3419L16.3274 15.9003C16.7108 17.5669 16.1191 18.2919 15.7357 18.5753C15.5274 18.7253 15.1941 18.8919 14.7191 18.8919Z"
                        fill="#FFB127" 
                      />
                    </svg>
                     <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="courses__svg"
                    >
                      <path
                        d="M14.7191 18.8919C14.2774 18.8919 13.7107 18.7503 13.0024 18.3336L10.5107 16.8586C10.2524 16.7086 9.75235 16.7086 9.50234 16.8586L7.00232 18.3336C5.5273 19.2086 4.66063 18.8586 4.26896 18.5753C3.88562 18.2919 3.28561 17.5669 3.67728 15.9003L4.26896 13.3419C4.33562 13.0752 4.20229 12.6169 4.00229 12.4169L1.9356 10.3502C0.902253 9.31685 0.985587 8.43351 1.12726 8.00017C1.26892 7.56683 1.71893 6.80016 3.15228 6.55849L5.81064 6.11682C6.06064 6.07515 6.41898 5.80848 6.52731 5.58348L8.00233 2.64178C8.669 1.3001 9.54401 1.1001 10.0023 1.1001C10.4607 1.1001 11.3357 1.3001 12.0024 2.64178L13.4691 5.57514C13.5857 5.80015 13.9441 6.06682 14.1941 6.10848L16.8524 6.55015C18.2941 6.79182 18.7441 7.5585 18.8774 7.99184C19.0108 8.42517 19.0941 9.30852 18.0691 10.3419L16.0024 12.4169C15.8024 12.6169 15.6774 13.0669 15.7357 13.3419L16.3274 15.9003C16.7108 17.5669 16.1191 18.2919 15.7357 18.5753C15.5274 18.7253 15.1941 18.8919 14.7191 18.8919Z"
                        fill="#FFB127" 
                      />
                    </svg>
                    
                  </div>
                  <h2 class="courses__title">${course.name}</h2>
                  <div class="courses-box__status">
                    <div class="courses-box__date">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z"
                          stroke="#100F14"
                          stroke-width="1.5"
                        />
                        <path
                          d="M3 9H21"
                          stroke="#100F14"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M8 2L8 5"
                          stroke="#100F14"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16 2V5"
                          stroke="#100F14"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <circle cx="12" cy="15" r="1" fill="#100F14" />
                        <circle cx="16" cy="15" r="1" fill="#100F14" />
                        <circle cx="8" cy="15" r="1" fill="#100F14" />
                      </svg>
                      <p class="courses__date">${course.createdAt.slice(
                        0,
                        10
                      )}</p>
                    </div>
                    <div class="courses-box__user">
                      <svg
                        class="svg-inline--fa fa-users course-box__users-icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="users"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"
                        ></path>
                      </svg>
                      <p class="courses-box__user-text">22</p>
                    </div>
                  </div>
                  <div class="courses__price--wrapper">
                    <h3 class="courses__teacher">محمد امین سعیدی راد</h3>
                    <p class="courses__price">${
                      course.price ? course.price.toLocaleString() : "رایگان"
                    }</p>
                  </div>
                </a>
              </div>
            </div>

          `
    );
  });

  console.log(relatedCourses);
};

export {
  showInfoCourseToDom,
  showCourseInformation,
  showTeacherInformation,
  ShowCourseComments,
  submitComments,
  relatedCourses,
};
