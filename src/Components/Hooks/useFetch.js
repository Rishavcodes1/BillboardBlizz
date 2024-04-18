import { useEffect, useState } from "react";

const useFetch = (url, method, dataToSend) => {
  const [data, setdata] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let result = await fetch(`${url}`, {
        method: `${method}`,
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      result = await result.json();
      if (result.error == false) {
        result["statusCode"] = 200;
      } else if (result.error == true) {
        result["statusCode"] = 401;
      }
      setdata((data) => result);
    }
    fetchData();
    return () => {};
  }, [url]);

  return data;
};

export default useFetch;
