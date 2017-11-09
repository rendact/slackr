import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./containers/App";
import Login from "./containers/Login";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/messages" component={App} />
      <Route path="/login" component={Login} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
registerServiceWorker();
