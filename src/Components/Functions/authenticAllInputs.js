const authenticAllInputs = () => {
  let inputTags = document.getElementsByTagName("input");
  let isEmpty = 0;
  for (let input of inputTags) {
    if (input.value == "") {
      input.style.borderColor = "#DC3545";
      isEmpty = 1;
    } else {
      input.style.borderColor = "#c2c2c2";
    }
  }
  return isEmpty
};
export default authenticAllInputs;
