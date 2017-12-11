import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Login from "components/Login";

class AuthTab extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      activeTab: "login"
    };
  }

  toggle(tab) {
    if (tab !== this.state.avtiveTab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem onClick={() => this.toggle("login")}>
            <NavLink>Login</NavLink>
          </NavItem>
          <NavItem onClick={() => this.toggle("register")}>
            <NavLink>Register</NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="login">
            <Login />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default AuthTab;
