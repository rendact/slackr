import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { withRouter } from "react-router-dom";

class OtherMenuDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown
        style={{ marginLeft: "auto" }}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle>
          <span className="fa fa-ellipsis-v" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            onClick={() => {
              this.props.history.push("/pages");
            }}
          >
            <span className="fa fa-files-o" /> Manage Files
          </DropdownItem>
          <DropdownItem>
            <span className="fa fa-book" /> Help
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withRouter(OtherMenuDropdown);
