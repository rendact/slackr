import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import AuthTab from "./components/AuthTab";

class Home extends Component {
  render() {
    return (
    	<div className="wrapper">
	      <div className="form">
	        <AuthTab />
	      </div>
      </div>
    );
  }
}

export default Home;
