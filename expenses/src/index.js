import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import store from "../src/store/store";
import './App.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
