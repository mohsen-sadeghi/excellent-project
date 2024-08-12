import { insertCourseBoxHtml } from "./utils.js";
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
  location.href = `category.html?cat=${ID}&paginate=1`;
};

const getAndShowAllCourses = async (event) => {
  const courseWrapper = document.querySelector(".course-wrapper");
  const courseAllBtn = document.querySelectorAll(".courses__link");
  const res = await fetch(`http://localhost:4000/v1/courses`);
  const courses = await res.json();

  if (event === 0 || !event.target.classList[1]) {
    courseWrapper.innerHTML = "";

    courseAllBtn.forEach((elem) =>
      elem.classList.remove("courses__link--active")
    );
    courseAllBtn[0].classList.add("courses__link--active");
    insertCourseBoxHtml(courses, courseWrapper);
  }
};

const getAndShowPopularCourses = async () => {
  const courseWrapper = document.querySelector(".course-wrapper");
  courseWrapper.innerHTML = "";
  const courseAllBtn = document.querySelectorAll(".courses__link");
  const res = await fetch(`http://localhost:4000/v1/courses/popular`);
  const popularCourses = await res.json();
  courseAllBtn.forEach((elem) =>
    elem.classList.remove("courses__link--active")
  );
  courseAllBtn[1].classList.add("courses__link--active");
  insertCourseBoxHtml(popularCourses, courseWrapper);
};

const getAndShowPresellCourses = async () => {
  const courseWrapper = document.querySelector(".course-wrapper");
  courseWrapper.innerHTML = "";
  const courseAllBtn = document.querySelectorAll(".courses__link");
  const res = await fetch(`http://localhost:4000/v1/courses/presell`);
  const presellCourses = await res.json();

  // add active class
  courseAllBtn.forEach((elem) =>
    elem.classList.remove("courses__link--active")
  );
  courseAllBtn[2].classList.add("courses__link--active");

  // add courses to dom
  insertCourseBoxHtml(presellCourses, courseWrapper);
};

const getAndShowAllArticle = async () => {
  const articleWrapper = document.querySelector(".article-wrapper");
  const res = await fetch(`http://localhost:4000/v1/articles`);
  const allArticle = await res.json();
  allArticle.sort(() => Math.random() - 0.5);
  allArticle.slice(0, 3).forEach((article) => {
    articleWrapper.insertAdjacentHTML(
      "beforeend",
      `
             <div class="col-12 col-sm-6 col-lg-4">
              <div class="article__container">
                <div class="article__header">
                  <a href="blog.html?shortName=${article.shortName}">
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
                <a href="blog.html?shortName=${article.shortName}" class="article__link">بیشتر بخوانید</a>
              </div>
            </div>
      `
    );
  });
};

export {
  getAndShowCategory,
  categoryClickHandler,
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowAllArticle,
};
