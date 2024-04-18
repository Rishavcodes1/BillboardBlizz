import React from "react";
import Login from "./Login";
import storeLoginImage from "../../../../Assets/store-login-image.png";

export default function StoreLogin() {
  document.title = "Store login";
  return <Login image={storeLoginImage} role={"store"}></Login>;
}
