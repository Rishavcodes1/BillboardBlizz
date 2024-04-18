const showAlert = (alertToShow, message) => {
    let alert = document.querySelector(`${alertToShow}`)
    alert.innerText = message
    alert.classList.remove("d-none")
};
export default showAlert;
