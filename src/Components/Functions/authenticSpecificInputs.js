const authenticSpecificInputs = (parentContainer, inputs) => {
  let inputTags = document.querySelectorAll(`${parentContainer} ${inputs}`);
  let isEmpty = 0;
  for (let input of inputTags) {
    if (input.value == "") {
      input.style.borderColor = "#DC3545";
      isEmpty = 1;
    } else {
      input.style.borderColor = "#c2c2c2";
    }
  }
  return isEmpty;
};

export default authenticSpecificInputs;
