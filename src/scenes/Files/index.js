import React, { Component } from "react";
import {
  Container,
  Navbar,
  Button,
  Nav,
  NavItem,
  Tab,
  TabPane,
  TabContent,
  Row,
  Col,
  NavLink,
  Card,
  CardTitle,
  CardText
} from "reactstrap";
import classnames from "classnames";
import "./files-management.css";

class FilesContainer extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Container>
        <Navbar color="faded" expands="md" light>
          <Nav>
            <NavItem>
              <Button>
                <span className="fa fa-arrow-left" /> Back
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
        <div className="files-management-wrapper">
          <h2 className="files-management-header">
            <span className="fa fa-files-o" /> Files
          </h2>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Everyone
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                My Files
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div className="files-management-content">
                <div className="file-item-wrapper">
                  <div className="actions">
                    <button className="share">
                      <span className="fa fa-share" />
                    </button>
                    <button className="delete">
                      <span className="fa fa-trash" />
                    </button>
                  </div>
                  <div className="file-item-thumb">
                    <img src={require("images/dummy-profile.png")} />
                  </div>
                  <div className="file-item-info">
                    <span className="file-item-author">ihfazhillah</span>
                    <span className="file-item-timestamp">
                      Yesterday at 10:06 AM
                    </span>
                    <div className="file-item-title">Screenshot.png</div>
                    <span className="file-item-channel">channel name</span>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2">
              {" "}
              <div className="files-management-content">hello world</div>
            </TabPane>
          </TabContent>
        </div>
      </Container>
    );
  }
}

export default FilesContainer;
