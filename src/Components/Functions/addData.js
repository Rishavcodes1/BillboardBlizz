import fetchData from "./fetchData";

const addData = async (url, method, dataToSend) => {
  let result = await fetchData(url, method, dataToSend);
  if (result.error == false) {
    return result
  }
  return 0
};
export default addData;
