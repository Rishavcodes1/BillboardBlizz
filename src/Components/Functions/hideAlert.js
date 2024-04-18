const hideAlert = (alertToHide) => {
  let alert = document.querySelector(`${alertToHide}`);
  alert.classList.add("d-none");
};
export default hideAlert;
