const authenticateTextarea = () => {
  let textarea = document.getElementsByTagName("textarea")[0];
  let isEmpty = 0;
  if (textarea.value == "") {
    textarea.style.borderColor = "#DC3545";
    isEmpty = 1;
  } else {
    textarea.style.borderColor = "#c2c2c2";
  }
  return isEmpty;
};
export default authenticateTextarea;
