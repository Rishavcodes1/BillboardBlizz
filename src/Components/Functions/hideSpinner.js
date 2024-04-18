const hideSpinner = (parentContainer, textToShow, spinnerToHide) => {
  console.log(parentContainer, textToShow, spinnerToHide);
  let text = document.querySelectorAll(`${parentContainer} ${textToShow}`)[0];
  console.log(text);
  let spinner = document.querySelectorAll(
    `${parentContainer} ${spinnerToHide}`
  )[0];

  text.classList.remove("d-none");
  spinner.classList.add("d-none");
};
export default hideSpinner;
