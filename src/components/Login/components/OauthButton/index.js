import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import lock from "utils/auth";

export default class OauthButton extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}
  render() {
    return (
        
          <Button className="pull-right" onClick={() => lock.show()}>
            Auth0 Login
          </Button>
       
    );
  }
}
