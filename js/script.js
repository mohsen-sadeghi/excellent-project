import {
  getAndShowCategory,
  categoryClickHandler,
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowAllArticle
} from "./funcs/script.js";

window.categoryClickHandler = categoryClickHandler;
window.getAndShowAllCourses = getAndShowAllCourses;
window.getAndShowPopularCourses = getAndShowPopularCourses;
window.getAndShowPresellCourses = getAndShowPresellCourses;

let $ = document;
window.addEventListener("load", () => {
  const navToggleIconElem = $.querySelector(".nav__toggle-icon");
  const mobileMenuElem = $.querySelector(".mobile-menu");

  navToggleIconElem.addEventListener("click", () => {
    navToggleIconElem.classList.toggle("nav__toggle-icon--open");
    mobileMenuElem.classList.toggle("mobile-menu--open");
  });

  getAndShowCategory();
  getAndShowAllCourses(0);
  getAndShowAllArticle()
});
