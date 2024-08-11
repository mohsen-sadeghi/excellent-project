import { getAndShowCategoryCourses, courseSorting } from "./funcs/category.js";
import {
  paginateItem,
  getUrlParamInUrl,
  insertCourseBoxHtml,
} from "./funcs/utils.js";
window.addEventListener("load", () => {
  getAndShowCategoryCourses().then((response) => {
    const sortingElem = document.querySelectorAll(
      ".category-header__filter-link"
    );
    const categorySearchBtn = document.querySelector(
      ".category-header__search-link"
    );
    const categorySearchText = document.querySelector(
      ".category-header__search-input"
    );
    const courseWrapper = document.querySelector(".course-wrapper");
    const paginateWrapper = document.querySelector(".paginate");
    const currentPage = getUrlParamInUrl("paginate");
    const category = getUrlParamInUrl("cat");
    const categoryResult = paginateItem(
      response,
      paginateWrapper,
      currentPage,
      3,
      `category.html?cat=${category}&`
    );

    // add courses
    if (categoryResult.length) {
      insertCourseBoxHtml(categoryResult, courseWrapper);
    } else {
      courseWrapper.insertAdjacentHTML(
        "beforeend",
        `<p class="text-danger">دوره ای یافت نشد</p>`
      );
    }

    //handle search category
    categorySearchBtn.addEventListener("click", () => {
      const searchResult = response.filter((category) => {
        return category.name.includes(categorySearchText.value.trim());
      });

      paginateWrapper.innerHTML = "";
      courseWrapper.innerHTML = "";

      if (searchResult.length) {
        const searchArray = paginateItem(
          searchResult,
          paginateWrapper,
          currentPage,
          3,
          `category.html?cat=${category}&`
        );
        insertCourseBoxHtml(searchArray, courseWrapper);
      } else {
        courseWrapper.insertAdjacentHTML(
          "beforeend",
          `<p class="text-danger">دوره ای یافت نشد</p>`
        );
      }
    });

    // handle sorting courses
    sortingElem.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        sortingElem.forEach((elem) =>
          elem.classList.remove("category-header__filter-link--active")
        );
        event.target.classList.add("category-header__filter-link--active");

        const dataKey = event.target.dataset.key;
        const sortingArray = courseSorting(dataKey, [...response]);
        paginateWrapper.innerHTML = "";
        courseWrapper.innerHTML = "";
        insertCourseBoxHtml(sortingArray, courseWrapper);
      });
    });
  });
});
