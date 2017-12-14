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
    if (tab !== this.state.activeTab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    return (
      <div>
        <Nav tabs className="tab-group">
          <NavItem className={classnames({
                active: this.state.activeTab === "login",
                tab: true
              })}>
            <NavLink
              onClick={() => this.toggle("login")}
              
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem className={classnames({
                active: this.state.activeTab === "register",
                tab: true
              })}>
            <NavLink
              onClick={() => this.toggle("register")}
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
