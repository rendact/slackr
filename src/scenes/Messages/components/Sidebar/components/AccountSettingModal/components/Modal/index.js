import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  Media,
  Nav,
  TabPane,
  TabContent,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import image from "images/dummy-profile.png";
import renderPasswordMatch from "components/reduxFormComponents/renderPasswordMatch";
import AvatarTab from "../AvatarTab";
import GeneralTab from "../GeneralTab";
import PasswordTab from "../PasswordTab";

class AccountModal extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (tab !== this.state.activeTab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader>Account Name Setting</ModalHeader>
        <ModalBody>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === "1" ? "active" : ""}
                  onClick={() => this.toggle("1")}
                >
                  General
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === "2" ? "active" : ""}
                  onClick={() => this.toggle("2")}
                >
                  Password
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === "3" ? "active" : ""}
                  onClick={() => this.toggle("3")}
                >
                  Profile Picture
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent
              activeTab={this.state.activeTab}
              style={{ padding: "40px 10px" }}
            >
              <GeneralTab {...this.props} {...this.context} {...this.state} />
              <PasswordTab {...this.props} {...this.context} {...this.state} />
              <AvatarTab {...this.props} {...this.context} {...this.state} />
            </TabContent>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle} color="primary">
            Done
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AccountModal;
