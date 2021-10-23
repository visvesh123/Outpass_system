import React, { useState, useEffect } from "react";
import mu from "../Components/NavBar/logo.png";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Tab,
  Tabs,
} from "react-bootstrap";
import ApprovalTable from "../Components/Approval/ApprovalTable";
import DescriptionTable from "../Components/Approval/DescriptionTable";
import {
  fetchAppliedLeaves,
  fetchStudentById,
  fetchStudentVacStatus,
} from "../actions";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const ApprovalPage = (props) => {

  const history = useHistory()
  const dispatch = useDispatch();
  useEffect(() => {
    props.fetchAppliedLeaves();
    // dispatch(fetchAppliedLeaves)
    var int = setInterval(() => {
      props.fetchAppliedLeaves();
      console.log("hello");
    }, 1000);
  }, []);

  const [ids, setids] = useState("");
  const [records, setRecords] = useState("");
  const [dt, setDt] = useState("");

  let x;

  const leaves = useSelector((state) => state.applied_leaves);

  function handleClick(){
    history.push('/admin-login')
    localStorage.removeItem('isAuthenticated')
  }

  const handchange = (value, rec, asn) => {
    setids(value);
    setRecords(rec);
    setDt(asn);
    console.log(value);
    props.fetchStudentById(value);
    props.fetchStudentVacStatus(value);
  };

  for (let val of props.applied_leaves) {
    if (val.HTNO === ids && val.TOKEN === records && val.ASN_DATE === dt) {
      x = val;
    }
  }

  console.log(x);

  const desc = !x ? null : (
    <DescriptionTable
      data={x}
      student={props.student}
      vac={props.vac}
      val={ids}
    />
  );

  //  Subscribe to messages on channel



  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={mu} width={160} height={50} style={{ marginLeft: 20 }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center">
              <Nav.Link href="/admin-login" onClick = { handleClick }>Sign Out</Nav.Link>
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="pending" title=" Pending Leave Approvals">
          {desc}
          <ApprovalTable data={leaves} change={handchange} />
        </Tab>
        <Tab eventKey="visitors" title=" Vsitor Pass Approvals" disabled>
        
        </Tab>
        <Tab eventKey="past" title="Past Leave Approvals" disabled></Tab>
        <Tab eventKey="stats" title="Statistics" disabled></Tab>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);

  return {  
    leave: state.leave, 
    applied_leaves: state.applied_leaves,
    student: state.student,
    vac: state.vaccination,
  };
};

export default connect(mapStateToProps, {
  fetchAppliedLeaves: fetchAppliedLeaves,
  fetchStudentById: fetchStudentById,
  fetchStudentVacStatus: fetchStudentVacStatus,
})(ApprovalPage);
