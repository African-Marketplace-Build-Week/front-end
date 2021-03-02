import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";

//Store Here -------------------
const store = createStore(userReducer, applyMiddleware(thunk, logger));


ReactDOM.render(
  <Router>
      <Provider store={store}>
        <App />
      </Provider>
  </Router>,
  document.getElementById("root")
);
