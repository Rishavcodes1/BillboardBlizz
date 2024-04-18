const hideToast = (toastToShow, blackContainer) => {
    let container = document.querySelector(`${blackContainer}`);
    let toast = document.querySelector(`${toastToShow}`);
    let body = document.getElementsByTagName("body")[0];
    container.classList.add("d-none")
    toast.style.transform = "translateY(15vh)";
    body.style.overflow = "auto";
};

export default hideToast;
