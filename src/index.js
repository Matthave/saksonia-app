import "./SASS/style.scss";
import {
  familyTrip,
  cityTrip,
  activeTrip,
  unescoTrip,
  listColor,
} from "./constant/constantText";
import { dotsFilterTool, generateDotsLocalization } from "./tools/utils";
import { tns } from "../node_modules/tiny-slider/src/tiny-slider";

class App {
  constructor() {
    this.burgerToggle = false;
    this.selectDot = false;
    this.dotsFiltered = [
      ...familyTrip,
      ...cityTrip,
      ...activeTrip,
      ...unescoTrip,
    ];
  }

  init = () => {
    const burgerIcon = document.querySelector(".burger__container");
    const tripMenu = document.querySelectorAll(".trip__list");
    tripMenu.forEach((ele) => {
      ele.addEventListener("click", (e) => this.dotsFilter(e, listColor));
    });
    burgerIcon.addEventListener("click", () => this.burgerClickFunc());

    this.generateDotsLocalization();
    this.generateRegionElements();
  };

  dotsFilter = (e, listColor) => {
    const classListArray = [...e.target.classList];
    const everyDotsArray = [
      ...familyTrip,
      ...cityTrip,
      ...activeTrip,
      ...unescoTrip,
    ];

    const dotsFilter = everyDotsArray.filter((ele) => {
      return ele.dotClass.slice(5) === classListArray[1];
    });

    if (classListArray[1] === "all") {
      this.dotsFiltered = [
        ...familyTrip,
        ...cityTrip,
        ...activeTrip,
        ...unescoTrip,
      ];
    } else {
      this.dotsFiltered = dotsFilter;
    }

    dotsFilterTool(e, listColor);
    this.generateRegionElements();

    const tripLists = document.querySelectorAll(".trip__list");
    const currentList = document.querySelector(`.${classListArray[1]}`);
    tripLists.forEach((ele) => (ele.style.backgroundColor = "#fff"));

    const currentColor = listColor.filter(
      (ele) => ele.id === classListArray[1]
    );
    currentList.style.backgroundColor = currentColor[0].color;
  };

  burgerClickFunc = () => {
    const ulElement = document.querySelector(".nav__ul");
    if (this.burgerToggle) {
      ulElement.classList.remove("nav__ul--hideToggle");
    } else {
      ulElement.classList.add("nav__ul--hideToggle");
    }
    this.burgerToggle = !this.burgerToggle;
  };

  generateDotsLocalization = () => {
    const tripMap = document.querySelector(".trip__map");
    const allDots = [...familyTrip, ...cityTrip, ...activeTrip, ...unescoTrip];
    allDots.forEach((ele) => {
      const dot = document.createElement("span");
      dot.setAttribute("class", `fas fa-map-marker dot ${ele.dotClass}`);
      dot.setAttribute("id", ele.id);
      dot.style.top = `${Math.random() * (90 - 10) + 10}%`;
      dot.style.left = `${Math.random() * (90 - 10) + 10}%`;

      dot.addEventListener("touchstart", (e) => this.touchStartFunc(e));

      tripMap.appendChild(dot);
    });
  };

  generateRegionElements = () => {
    const sliderContainer = document.querySelector(".my-slider");
    sliderContainer.innerHTML = "";
    this.dotsFiltered.forEach((ele) => {
      const sliderElement = document.createElement("div");
      const sliderImg = document.createElement("h2");
      const sliderText = document.createElement("h4");
      const sliderBtn = document.createElement("button");

      sliderElement.setAttribute("class", "region__slide");
      sliderImg.textContent = "Any Picture Here";
      sliderImg.setAttribute("class", "region__img");
      sliderText.textContent = ele.name;
      sliderText.setAttribute("class", "region__text");
      sliderBtn.textContent = "Dowiedz sie więcej";
      sliderBtn.setAttribute("class", "region__btn");

      sliderElement.appendChild(sliderImg);
      sliderElement.appendChild(sliderText);
      sliderElement.appendChild(sliderBtn);

      const currentColor = listColor.filter((color) =>
        color.id.includes(ele.dotClass.slice(5))
      );

      sliderElement.style.borderBottom = `solid 3.5px ${currentColor[0].color}`;
      sliderContainer.appendChild(sliderElement);
    });

    var slider = tns({
      container: ".my-slider",
      items: 2,
      slideBy: "page",
      arrowKeys: true,
      mouseDrag: true,
      controls: false,
      responsive: {
        640: {
          items: 4,
        },
        1200: {
          items: 4,
          controls: true,
        },
      },
    });
  };

  touchStartFunc = (e) => {
    this.selectDot = true;
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", (e) => this.touchMoveFunc(e));
    document.addEventListener("touchend", (e) => this.touchEndFunc(e));
  };

  touchMoveFunc = (e) => {
    const scrollHeight = window.scrollY;
    const target = e.target;
    const tripMap = document.querySelector(".trip__map");
    if (this.selectDot) {
      target.style.left = `${e.touches[0].pageX - 5}px`;
      target.style.top = `${
        e.touches[0].pageY - tripMap.getClientRects()[0].top - scrollHeight
      }px`;
    }
  };

  touchEndFunc = (e) => {
    this.selectDot = false;
    document.body.style.overflow = "initial";
    document.removeEventListener("touchmove", (e) => this.touchMoveFunc(e));
    document.removeEventListener("touchend", (e) => this.touchEndFunc(e));
  };
}

const app = new App();

app.init();
