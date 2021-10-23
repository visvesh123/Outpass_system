import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Input, Checkbox, Button } from "antd";
import "./StudentLogin.css";
import Logo from "./logo.png";
import { Card, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";

import { loginUser} from '../../actions/authAction';


class StudentLogin extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed(this);
  }


  onFinish(values) {
    // console.log("Success:", values);
    const { username, password } = values; 
    console.log(this.props);
    
    this.props.loginUser({ username, password });
  
  }

  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/form');
    }
  }

  componentWillReceiveProps(nextProps) { 
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/form');
    }
  }

  render() {

    // console.log(this.props.item) 
    return ( 
      <div>
        <h2 style={{ textAlign: "center", marginTop: "15px" }}>Outpass</h2>

        <div className="resetcard">
          <Card style={{ width: "100%" }}>
            <img className="logo-reset" src={Logo} alt="Mahindra University" />
            <br />
            <Card.Body>
              <Card.Title>Login</Card.Title>
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
                    {this.props.error == "error" && (
                          <div
                            className="alert-danger"
                            style={{ margin: 20 + "px" }}
                          >
                            Incorrect details!
                          </div>
                        )}
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
    error: state.error,
  };
};

export default connect(mapStateToProps , {loginUser: loginUser})(StudentLogin);
