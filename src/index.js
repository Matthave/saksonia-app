import "./SASS/style.scss";

class App {
  constructor() {
    this.burgerToggle = false;
  }

  init = () => {
    const burgerIcon = document.querySelector(".burger__container");
    burgerIcon.addEventListener("click", () => this.burgerClickFunc());
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
}

const app = new App();

app.init();
