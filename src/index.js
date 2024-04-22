import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Main from "./Main";
import "./Components/utility.css";
import "./Components/Panels/Common/Panel.css";
import { store } from "./Components/StateMangement/Store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("id"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main></Main>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
