import React, { useEffect } from "react";
import LeaveForm from "../Components/LeaveForm/LeaveForm";
import SecNavbar from "../Components/NavBar/SecNavBar";
import Instructions from "../Components/LeaveForm/Instructions";
import mu from "../Components/NavBar/logo.png";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { connect } from "react-redux";
import { fetchStudent } from "../actions/index";
import { logoutUser} from '../actions/authAction'

import { Row, Col, Layout } from "antd";

const { Footer, Header } = Layout;

const OutPassForm = (props) => {
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const wait = async (milliseconds = 2000) => {
    await sleep(milliseconds);
  };

  useEffect(() => {
    props.fetchStudent();
    wait(2000);
  }, []);

  const item = props.student;

  //  console.log("item is " + item)

  function handleLogout(){
      props.logoutUser();
  }

  return (
    <div>
      {/* <SecNavbar/> */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={mu} width={160} height={50} style={{ marginLeft: 20 }} />
          </Navbar.Brand>
          <Nav>
            <h2 style={{ textAlign: "center"  , marginLeft: 40 , marginRight : 40}}>Leave Application  Portal</h2>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login" onClick = {handleLogout}>Sign Out</Nav.Link>
                 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Col span={12} offset={6}>
          <LeaveForm item={item} />
        </Col>
      </Row>
      <Instructions />
      <Footer style={{ textAlign: "center" }}>MU ©2021</Footer>
    </div>
  );
};
 
const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};

export default connect(mapStateToProps, { fetchStudent: fetchStudent ,logoutUser })(
  OutPassForm
);
