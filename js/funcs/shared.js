import { isLogin } from "./utils.js";
import { getMe } from "./auth.js";

const showNameInNavbar = async () => {
  const navIconContainer = document.querySelector(".nav__links");
  const login = isLogin();
  if (login) {
    getMe().then((response) => {
      navIconContainer.insertAdjacentHTML(
        "afterbegin",
        `
                <a href="login.html" class="nav__login-icon">${response.name}</a>
                `
      );
    });
  } else {
    navIconContainer.insertAdjacentHTML(
      "afterbegin",
      `
            <a href="login.html" class="nav__login-icon">لاگین</a>
            `
    );
  }
};

const getAndShowCourseInNavbarAndFooter = async () => {
  const NavbarContainer = document.querySelector(".main-header__dropdown");
  const footerCourseContainer = document.querySelector(
    ".footer__courses-links"
  );
  const res = await fetch(`http://localhost:4000/v1/menus/topbar`);
  const data = await res.json();

  
  const shuffleArray = data.sort(() => Math.random() - 0.5);
  shuffleArray.slice(0, 5).forEach((course) => {
    NavbarContainer.insertAdjacentHTML(
      "beforeend",
      `
                    <li class="main-header__dropdown-item">
                      <a href="course.html?name=${course.href.slice(13)}" class="main-header__dropdown-link">
                        ${course.title}
                      </a>
                    </li>
            `
    );
  });
  shuffleArray.slice(5, 9).forEach((course) => {
    footerCourseContainer.insertAdjacentHTML(
      "beforeend",
      `
                <li class="footer__courses-link"><a href="course.html?name=${course.href.slice(13)}">${course.title}</a></li>
                `
    );
  });
};

const searchClickHandler = () => {
  swal({
    text: "چه چیزی دوست داری یاد بگیری",
    content: "input",
    button: {
      text: "سرچ",
    },
  }).then((result) => {
    if (result) {
      location.href = `search.html?searchName=${result}`;
    }
  });
};

export { showNameInNavbar, getAndShowCourseInNavbarAndFooter , searchClickHandler };
