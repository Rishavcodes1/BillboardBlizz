const togglePassword = () => {
  let passwordField = document.querySelectorAll(`.password-container input`)[0];
  let text = document.querySelectorAll(
    ".password-container span.font-small"
  )[0];

  if (passwordField.type == "text") {
    text.innerText = "show";
    passwordField.type = "password";
  } else {
    text.innerText = "hide";
    passwordField.type = "text";
  }
};
export default togglePassword;
