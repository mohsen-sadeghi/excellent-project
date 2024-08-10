import { getUrlParamInUrl, getToken } from "./utils.js";
const getSessionDetails = async () => {
  const shortName = getUrlParamInUrl("name");
  const courseId = getUrlParamInUrl("id");
  const videoSourceElem = document.querySelector(".video-source");
  const listSessionElem = document.querySelector(".sidebar-topic");
  const res = await fetch(
    `http://localhost:4000/v1/courses/${shortName}/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  videoSourceElem.src = `http://localhost:4000/v1/courses/${data.session.video}`;
  data.sessions.forEach((session) => {
    listSessionElem.insertAdjacentHTML(
      "beforeend",
      `
                <li class="sidebar-topic__list" style=${session._id === data.session._id?"background-color:#c1b7f8":``}>
                    <div class="sidebar-topics__list-right">
                        <svg class="svg-inline--fa fa-circle-play sidebar-topics__list-item-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                        <path fill="currentColor" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"></path>
                        </svg>
                        ${
                          session.free
                            ? `<a class="sidebar-topics__list-item-link" href="episode.html?name=${shortName}&id=${session._id}">${session.title}</a>`
                            : `<span class="sidebar-topics__list-item-link">${session.title}</span>`
                        }
                        
                    </div>
                    <div class="sidebar-topics__list-left">
                        <span class="sidebar-topics__list-item-time">${
                          session.time
                        }</span>
                        ${
                          session.free
                            ? "<i class='fa fa-unlock'></i>"
                            : "<i class='fa fa-lock'></i>"
                        }
                    </div>
                </li>
            `
    );
  });
};

export { getSessionDetails };
