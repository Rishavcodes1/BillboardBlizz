const showSpinner = (parentContainer, textToHide, spinnerToShow) => {
    console.log(parentContainer, textToHide, spinnerToShow)
  let text = document.querySelectorAll(`${parentContainer} ${textToHide}`)[0];
  console.log(text)
  let spinner = document.querySelectorAll(
    `${parentContainer} ${spinnerToShow}`
  )[0];

  text.classList.add("d-none");
  spinner.classList.remove("d-none");
};
export default showSpinner;
