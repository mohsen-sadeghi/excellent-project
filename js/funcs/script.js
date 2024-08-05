const getAndShowCategory = async () => {
  const categoryContainerElem = document.querySelector(".category-container");
  const res = await fetch(`http://localhost:4000/v1/menus`);
  const category = await res.json();
  category.forEach((category) => {
    categoryContainerElem.insertAdjacentHTML(
      "beforeend",
      `
            <div onclick="categoryClickHandler('${category.href}')" class="col-6 col-sm-4 col-md-3">
              <div class="category__box">
                <div class="category__svg--wrapper">
                  <svg
                    width="24"
                    height="24"
                    class="category__svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1601 15.928L16.3071 19.6466C16.7213 20.364 16.4755 21.2814 15.758 21.6956C15.0406 22.1099 14.1232 21.864 13.709 21.1466L11.0555 16.5505M19.4543 4.82986L19.8203 3.46384M21.4543 8.29398L22.8203 8.66M8.09809 17.16L18.7168 14.7285C20.0285 14.4282 20.6753 12.9443 20.0025 11.779L15.7104 4.34488C15.0376 3.17955 13.4291 2.99775 12.5132 3.98351L5.09809 11.9639L8.09809 17.16ZM5.34812 12.3968L7.84812 16.727C8.26233 17.4444 8.01652 18.3618 7.29908 18.776C6.58164 19.1902 5.66425 18.9444 5.25004 18.227L2.75004 13.8968C2.33583 13.1794 2.58164 12.262 3.29908 11.8478C4.01652 11.4336 4.9339 11.6794 5.34812 12.3968Z"
                      stroke="#100F14"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h3 class="category__box--title">${category.title}</h3>
                <p class="category__box--information">${category.submenus.length} تا دوره</p>
              </div>
            </div>
            `
    );
  });
};

const categoryClickHandler = (ID) => {
  location.href = `category.html?cat=${ID}`;
};

const getAndShowAllCourses = async (event) => {
  const courseWrapper = document.querySelector(".course-wrapper");
  const courseAllBtn = document.querySelectorAll(".courses__link");
  const res = await fetch(`http://localhost:4000/v1/courses`);
  const courses = await res.json();

  if (event === 0 || !event.target.classList[1]) {
    courseWrapper.innerHTML = "";

    courseAllBtn.forEach(elem => elem.classList.remove("courses__link--active"))
    courseAllBtn[0].classList.add("courses__link--active");

    courses.forEach((course) => {
      courseWrapper.insertAdjacentHTML(
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


                   ${Array(5 - course.courseAverageScore)
                     .fill(0)
                     .map(
                       (score) =>
                         `<svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="courses__svg"
                    >
                      <path
                        d="M14.7191 18.8919C14.2774 18.8919 13.7107 18.7503 13.0024 18.3336L10.5107 16.8586C10.2524 16.7086 9.75235 16.7086 9.50234 16.8586L7.00232 18.3336C5.5273 19.2086 4.66063 18.8586 4.26896 18.5753C3.88562 18.2919 3.28561 17.5669 3.67728 15.9003L4.26896 13.3419C4.33562 13.0752 4.20229 12.6169 4.00229 12.4169L1.9356 10.3502C0.902253 9.31685 0.985587 8.43351 1.12726 8.00017C1.26892 7.56683 1.71893 6.80016 3.15228 6.55849L5.81064 6.11682C6.06064 6.07515 6.41898 5.80848 6.52731 5.58348L8.00233 2.64178C8.669 1.3001 9.54401 1.1001 10.0023 1.1001C10.4607 1.1001 11.3357 1.3001 12.0024 2.64178L13.4691 5.57514C13.5857 5.80015 13.9441 6.06682 14.1941 6.10848L16.8524 6.55015C18.2941 6.79182 18.7441 7.5585 18.8774 7.99184C19.0108 8.42517 19.0941 9.30852 18.0691 10.3419L16.0024 12.4169C15.8024 12.6169 15.6774 13.0669 15.7357 13.3419L16.3274 15.9003C16.7108 17.5669 16.1191 18.2919 15.7357 18.5753C15.5274 18.7253 15.1941 18.8919 14.7191 18.8919Z"
                        fill="#A8A7AE"
                        fill-opacity="0.2"
                      />
                    </svg>`
                     )
                     .join(" ")}

                  ${Array(course.courseAverageScore)
                    .fill(0)
                    .map(
                      (score) =>
                        `<svg
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
                    </svg>`
                    )
                    .join(" ")}
                    
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
                      <p class="courses-box__user-text">${course.registers}</p>
                    </div>
                  </div>
                  <div class="courses__price--wrapper">
                    <h3 class="courses__teacher">${course.creator}</h3>
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
  }
};

const getAndShowPopularCourses = async ()=>{
  const courseWrapper = document.querySelector(".course-wrapper");
  courseWrapper.innerHTML = "";
  const courseAllBtn = document.querySelectorAll(".courses__link");
  const res = await fetch(`http://localhost:4000/v1/courses/popular`)
  const popularCourses = await res.json()
  courseAllBtn.forEach(elem => elem.classList.remove("courses__link--active"))
  courseAllBtn[1].classList.add("courses__link--active");
  popularCourses.forEach((course) => {
      courseWrapper.insertAdjacentHTML(
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


                   ${Array(5 - course.courseAverageScore)
                     .fill(0)
                     .map(
                       (score) =>
                         `<svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="courses__svg"
                    >
                      <path
                        d="M14.7191 18.8919C14.2774 18.8919 13.7107 18.7503 13.0024 18.3336L10.5107 16.8586C10.2524 16.7086 9.75235 16.7086 9.50234 16.8586L7.00232 18.3336C5.5273 19.2086 4.66063 18.8586 4.26896 18.5753C3.88562 18.2919 3.28561 17.5669 3.67728 15.9003L4.26896 13.3419C4.33562 13.0752 4.20229 12.6169 4.00229 12.4169L1.9356 10.3502C0.902253 9.31685 0.985587 8.43351 1.12726 8.00017C1.26892 7.56683 1.71893 6.80016 3.15228 6.55849L5.81064 6.11682C6.06064 6.07515 6.41898 5.80848 6.52731 5.58348L8.00233 2.64178C8.669 1.3001 9.54401 1.1001 10.0023 1.1001C10.4607 1.1001 11.3357 1.3001 12.0024 2.64178L13.4691 5.57514C13.5857 5.80015 13.9441 6.06682 14.1941 6.10848L16.8524 6.55015C18.2941 6.79182 18.7441 7.5585 18.8774 7.99184C19.0108 8.42517 19.0941 9.30852 18.0691 10.3419L16.0024 12.4169C15.8024 12.6169 15.6774 13.0669 15.7357 13.3419L16.3274 15.9003C16.7108 17.5669 16.1191 18.2919 15.7357 18.5753C15.5274 18.7253 15.1941 18.8919 14.7191 18.8919Z"
                        fill="#A8A7AE"
                        fill-opacity="0.2"
                      />
                    </svg>`
                     )
                     .join(" ")}

                  ${Array(course.courseAverageScore)
                    .fill(0)
                    .map(
                      (score) =>
                        `<svg
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
                    </svg>`
                    )
                    .join(" ")}
                    
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
                      <p class="courses-box__user-text">${course.registers}</p>
                    </div>
                  </div>
                  <div class="courses__price--wrapper">
                    <h3 class="courses__teacher">${course.creator}</h3>
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
}

const getAndShowPresellCourses = async ()=>{
  const courseWrapper = document.querySelector(".course-wrapper");
  courseWrapper.innerHTML = "";
  const courseAllBtn = document.querySelectorAll(".courses__link");
  const res = await fetch(`http://localhost:4000/v1/courses/presell`)
  const presellCourses =  await res.json()

  // add active class 
  courseAllBtn.forEach(elem => elem.classList.remove("courses__link--active"))
  courseAllBtn[2].classList.add("courses__link--active");

  // add courses to dom
  presellCourses.forEach((course) => {
      courseWrapper.insertAdjacentHTML(
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


                   ${Array(5 - course.courseAverageScore)
                     .fill(0)
                     .map(
                       (score) =>
                         `<svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="courses__svg"
                    >
                      <path
                        d="M14.7191 18.8919C14.2774 18.8919 13.7107 18.7503 13.0024 18.3336L10.5107 16.8586C10.2524 16.7086 9.75235 16.7086 9.50234 16.8586L7.00232 18.3336C5.5273 19.2086 4.66063 18.8586 4.26896 18.5753C3.88562 18.2919 3.28561 17.5669 3.67728 15.9003L4.26896 13.3419C4.33562 13.0752 4.20229 12.6169 4.00229 12.4169L1.9356 10.3502C0.902253 9.31685 0.985587 8.43351 1.12726 8.00017C1.26892 7.56683 1.71893 6.80016 3.15228 6.55849L5.81064 6.11682C6.06064 6.07515 6.41898 5.80848 6.52731 5.58348L8.00233 2.64178C8.669 1.3001 9.54401 1.1001 10.0023 1.1001C10.4607 1.1001 11.3357 1.3001 12.0024 2.64178L13.4691 5.57514C13.5857 5.80015 13.9441 6.06682 14.1941 6.10848L16.8524 6.55015C18.2941 6.79182 18.7441 7.5585 18.8774 7.99184C19.0108 8.42517 19.0941 9.30852 18.0691 10.3419L16.0024 12.4169C15.8024 12.6169 15.6774 13.0669 15.7357 13.3419L16.3274 15.9003C16.7108 17.5669 16.1191 18.2919 15.7357 18.5753C15.5274 18.7253 15.1941 18.8919 14.7191 18.8919Z"
                        fill="#A8A7AE"
                        fill-opacity="0.2"
                      />
                    </svg>`
                     )
                     .join(" ")}

                  ${Array(course.courseAverageScore)
                    .fill(0)
                    .map(
                      (score) =>
                        `<svg
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
                    </svg>`
                    )
                    .join(" ")}
                    
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
                      <p class="courses-box__user-text">${course.registers}</p>
                    </div>
                  </div>
                  <div class="courses__price--wrapper">
                    <h3 class="courses__teacher">${course.creator}</h3>
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
}

const getAndShowAllArticle = async ()=>{
  const articleWrapper = document.querySelector('.article-wrapper')
  const res = await fetch(`http://localhost:4000/v1/articles`)
  const allArticle = await res.json()
  allArticle.sort(() => Math.random() - 0.5);
  allArticle.slice(0 , 3).forEach(article =>{
    console.log(article);
    articleWrapper.insertAdjacentHTML("beforeend" , `
             <div class="col-12 col-sm-6 col-lg-4">
              <div class="article__container">
                <div class="article__header">
                  <a href="blog.html?${article.shortName}">
                    <img
                      class="article__image"
                      src=http://localhost:4000/courses/covers/${article.cover}
                      alt="article image"
                    />
                  </a>
                </div>
                <p class="article__title">${article.title}</p>
                <p class="article__caption">
                    ${article.description} 
                </p>
                <a href="blog.html?${article.shortName}" class="article__link">بیشتر بخوانید</a>
              </div>
            </div>
      `)
  })
}

export {
  getAndShowCategory,
  categoryClickHandler,
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowAllArticle
};
