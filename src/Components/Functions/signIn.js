import fetchData from "./fetchData";

const signIn = async (url, method, dataToSend, role) => {
  let result = await fetchData(url, method, dataToSend);
  if (result.error == false) {
    localStorage.setItem(role, JSON.stringify(result));
    return 1;
  } else if (result.error == true) {
    return result;
  }
};

export default signIn;
