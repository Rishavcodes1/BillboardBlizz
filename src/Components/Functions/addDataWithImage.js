const addDataWithImage = async (url, method, dataToSend) => {
  let result = await fetch(`${url}`, {
    method: `${method}`,
    body: dataToSend,
  });
  result = await result.json();
  return result;
};

export default addDataWithImage;
