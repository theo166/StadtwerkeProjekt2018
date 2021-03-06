import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { store } from "./helpers/store";
import { Router } from "react-router";
import { history } from "./helpers";

//App component is wrapped inside Redux Provider and Router
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
