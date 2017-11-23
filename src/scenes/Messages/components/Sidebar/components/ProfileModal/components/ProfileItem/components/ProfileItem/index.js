import React from "react";
import { NavItem } from "reactstrap";

export default ({ onClick }) => (
  <NavItem>
    <a href="#" className="nav-link" onClick={onClick}>
      Profile & account
    </a>
  </NavItem>
);
