import React from "react";
import Login from "./Login";
import adminLoginImage from "../../../../Assets/admin-login-image.png";

export default function AdminLogin() {
  document.title = "Admin login";
  return <Login image={adminLoginImage} role={"admin"}></Login>;
}
