import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { createStore } from "redux";
import client from "./apollo";
import App from "./containers/App";
import Login from "./containers/Login";
import Register from "./containers/Register";
import slackrApp from "./reducers";
import PrivateRoute from "./PrivateRoute";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

const store = createStore(slackrApp);

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <HashRouter>
      <Switch>
        <PrivateRoute path="/messages" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
