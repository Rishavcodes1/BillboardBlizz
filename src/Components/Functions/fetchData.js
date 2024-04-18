const fetchData = async (url, method, dataToSend) => {
  let result;
  if (method == "POST") {
    result = await fetch(`${url}`, {
      method: `${method}`,
      headers: {
        "Content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    result = await result.json();
  } else if (method == "GET") {
    result = await fetch(`${url}`, {
      method: `${method}`,
      headers: {
        "Content-type": "application/json",
        accept: "application/json",
      },
    });
    result = await result.json();
  }
  return result;
};

export default fetchData;
