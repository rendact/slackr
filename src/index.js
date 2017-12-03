import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { createStore } from "redux";
import client from "./apollo";
import Messages from "scenes/Messages";
import slackrApp from "./reducers";
import PrivateRoute from "components/Router/PrivateRoute";
import Register from "scenes/Register";
import Login from "scenes/Login";
import Home from "scenes/Landing";
import Verify from "scenes/Verify";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const store = createStore(slackrApp);

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <PrivateRoute path="/messages/:id?" component={Messages} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/verify/:username/:code" component={Verify} />
          <Route component={Home} />
        </Switch>
      </HashRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
