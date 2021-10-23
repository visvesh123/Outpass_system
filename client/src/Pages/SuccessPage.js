import React from "react";
import "antd/dist/antd.css";
import { Result, Button } from "antd";
import { useHistory} from 'react-router-dom'
import mu from "../Components/NavBar/logo.png";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logoutUser} from '../actions/authAction'
import {connect} from 'react-redux'

function SuccessPage(props) {

  const history = useHistory()

  function handleLogout(){
    props.logoutUser();
}

  return (
    <div>
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
      <Result
        status="success"
        title="Successfully Submitted the Form!"
        subTitle="You will receive a email about your request."
        extra={[
          <Button type="primary" key="console" onClick = {()=> history.push('/form')}>
            Apply for new Outpass
          </Button>
         
        ]}
      />
    </div>
  );
}

export default connect(null, {logoutUser})(SuccessPage);
 