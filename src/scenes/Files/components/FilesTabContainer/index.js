import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
import FileItem from "../FileItem";
import myUserId from "constans/myUserId";

class FilesTabContainer extends Component {
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
    const { allFiles } = this.props;
    return (
      <Container>
        <Navbar color="faded" expands="md" light>
          <Nav>
            <NavItem>
              <Button
                onClick={() => {
                  this.props.history.push("/messages");
                }}
              >
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
                {allFiles.loading ? (
                  <p>Loading</p>
                ) : (
                  allFiles.viewer.allMessages.edges.map((file, id) => (
                    <FileItem
                      key={id}
                      img={file.node.attachment.blobUrl}
                      author={file.node.author.fullname}
                      timestamp={file.node.createdAt}
                      title={file.node.attachment.name}
                      channel={file.node.channel.name}
                      userId={file.node.author.id}
                      messageId={file.node.id}
                      fileId={file.node.attachment.id}
                    />
                  ))
                )}
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="files-management-content">
                {allFiles.loading ? (
                  <p>Loading</p>
                ) : (
                  allFiles.viewer.allMessages.edges.map((file, id) => {
                    if (file.node.author.id === myUserId()) {
                      return (
                        <FileItem
                          key={id}
                          img={file.node.attachment.blobUrl}
                          author={file.node.author.fullname}
                          timestamp={file.node.createdAt}
                          title={file.node.attachment.name}
                          channel={file.node.channel.name}
                          messageId={file.node.id}
                          fileId={file.node.attachment.id}
                          userId={file.node.author.id}
                        />
                      );
                    }
                  })
                )}
              </div>
            </TabPane>
          </TabContent>
        </div>
      </Container>
    );
  }
}

export default withRouter(FilesTabContainer);
