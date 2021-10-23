import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Input, Checkbox, Button } from "antd";
import "./StudentLogin.css";
import Logo from "./logo.png";
import { Card, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



class AdminLogin extends Component {


  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed(this);
  }

  onFinish(values) {
    var auth = getAuth();
    console.log("Success:", values);
    const { username, password } = values;
  signInWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem("isAuthenticated", "true");
    this.props.history.push('/approval')
  console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message; 
  });
  }

  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/approval");
    // }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push("/approval");
    // }
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", marginTop: "15px" }}>Outpass System</h2>

        <div className="resetcard">
          <Card style={{ width: "100%" }}>
            <img className="logo-reset" src={Logo} alt="Mahindra University" />
            <br />
            <Card.Body>
              <Card.Title>Admin Login for outpass Approval</Card.Title>
              <Card.Text>
                <Col>
                  <Form
                    // {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Card.Text>

              <br />
              <br />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);

  return {
    auth: state.auth,
    error: state.errors,
  };
};

export default AdminLogin;
