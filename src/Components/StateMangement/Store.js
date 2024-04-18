import { createStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers/reducers_index";

export const store = createStore(rootReducer);
