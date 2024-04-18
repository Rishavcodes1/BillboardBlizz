const authenticSelect = () => {
  let select = document.getElementsByTagName("select")[0];
  let isEmpty = 0;
  if (select.value == "default") {
    select.style.borderColor = "#DC3545";
    isEmpty = 1;
  } else {
    select.style.borderColor = "#c2c2c2";
  }
  return isEmpty;
};
export default authenticSelect;
