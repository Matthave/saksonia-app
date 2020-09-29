export const dotsFilter = (e, listColor) => {
  const classListArray = [...e.target.classList];
  const allDots = document.querySelectorAll(".dot");
  const currentDots = document.querySelectorAll(`.dot__${classListArray[1]}`);
  allDots.forEach((ele) => (ele.style.display = "none"));
  currentDots.forEach((ele) => (ele.style.display = "initial"));
  if (classListArray[1] === "all") {
    allDots.forEach((ele) => (ele.style.display = "initial"));
  }

  const tripLists = document.querySelectorAll(".trip__list");
  const currentList = document.querySelector(`.${classListArray[1]}`);
  tripLists.forEach((ele) => (ele.style.backgroundColor = "#fff"));

  const currentColor = listColor.filter((ele) => ele.id === classListArray[1]);
  currentList.style.backgroundColor = currentColor[0].color;
};
