const showToast = (toastToShow, blackContainer) => {
  let container = document.querySelector(`${blackContainer}`);
  let toast = document.querySelector(`${toastToShow}`);
  let body = document.getElementsByTagName("body")[0];
  container.classList.remove("d-none");
  toast.style.transform = "translateY(0rem)";
  body.style.overflow = "hidden";
  setTimeout(() => {
    body.style.overflow = "auto";
  }, 3000);
};

export default showToast;
