import React from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.Component {
  isAuthenticated() {
    if (localStorage.getItem("graphcoolToken")) return true;
    return false;
  }
  render() {
    let { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )}
      />
    );
  }
}

export default PrivateRoute;
