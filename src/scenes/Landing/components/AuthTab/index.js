import React, { Component } from "react";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Login from "components/Login";
import Register from "components/Register";

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
      <div className={this.props.className} style={this.props.style}>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => this.toggle("login")}
              className={classnames({
                active: this.state.activeTab === "login"
              })}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => this.toggle("register")}
              className={classnames({
                active: this.state.activeTab === "register"
              })}
            >
              Register
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent
          activeTab={this.state.activeTab}
          style={{ paddingTop: 35, color: "white" }}
        >
          <TabPane tabId="login">
            <Login {...this.props} />
          </TabPane>
          <TabPane tabId="register">
            <Register {...this.props} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default AuthTab;
