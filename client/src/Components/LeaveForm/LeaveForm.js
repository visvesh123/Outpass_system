import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Space,
  DatePicker,
  Statistic,
  message
} from "antd";

import { applyLeave } from "../../actions";
import { connect } from "react-redux";
import { Redirect  , useHistory} from "react-router-dom";


const { Option } = Select;
const { RangePicker } = DatePicker;
const residences = [
  {
    value: "dorms",
    label: "Dormitories",
    children: [
      {
        value: "Satpura",
        label: "Satpura",
      },
      {
        value: "Niligiri",
        label: "Niligiri",
      },
      {
        value: "Aravali",
        label: "Aravali",
      },
      {
        value: "Ajanta",
        label: "Ajanta",
      },
      {
        value: "Himalaya",
        label: "Himalaya",
      },
      {
        value: "Shivalik",
        label: "Shivalik",
      },
      {
        value: "Vindhya",
        label: "Vindhya",
      },
    ],
  },
  {
    value: "ph1",
    label: "Hostel block phase-1",
  },
  {
    value: "ph2",
    label: "Hostel block phase-2",
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const LeaveForm = (props) => {
  const [form] = Form.useForm();
  const [dateVal, setDateVal] = useState();
  const [toVal, setToVal] = useState();


  const history = useHistory()
  //  console.log(props.item)

  var name = props.item[0];

  if (name) {
    var names = name.STUDENT_NAME;
    var id = name.HTNO;
    var batch = name.BATCH;
  }

  const onFinish = (values) => {
   
     var p ;
    if(values.residence[1] === undefined){
        p = values.residence[0]
    }
    else{
       p = values.residence[0] + " " +  values.residence[1]
    }
    console.log("Received values of form: ", values, dateVal._d, toVal._d);
    var data = {
      HTNO: id,
      STUDENT_NAME: names,
      BLOCK: p,
      ROOM: values.room_no,
      FROM: dateVal._d,
      TO: toVal._d,
      REASON: values.reason,
      BATCH: batch,
    };
    props.applyLeave(data);
  
    message.success("Leave applied Succesfully , Please wait for the response through mail" )
    history.push('/success')
  };


  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select 
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const dateFormat = "YYYY/MM/DD";

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <>
      <Row>
        <Col md={12} sm={18}>
          <Statistic title="Full Name" value={String(names)} precision={2} />
        </Col>
        <Col md={12} sm={18}>
          <Statistic title="Id number" value={String(id)} precision={2} />
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: [],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item></Form.Item>

        <Form.Item
          name="residence"
          label="Hostel Block "
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your Block name!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>

        <Form.Item
          name="room_no"
          label="Room number"
          rules={[
            {
              required: true,
              message: "Please input Room number!",
            },
          ]}
        >
          <InputNumber
            addonAfter={suffixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item name="From" label="Duration (From)">
          <Space direction="vertical" size={18}>
            <DatePicker
              format={dateFormat}
              onChange={(val) => setDateVal(val)}
            />
          </Space>
        </Form.Item>

        <Form.Item name="To" label="Duration (To) ">
          <Space direction="vertical" size={18}>
            <DatePicker format={dateFormat} onChange={(val) => setToVal(val)} />
          </Space>
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            //   addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason for Leave"
          rules={[
            {
              message: "Please enter reason",
            },
          ]}
        >
          <Input
            //   addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        {/* <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item> */}

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>I have read the read the instructions below.</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default connect(null, { applyLeave: applyLeave })(LeaveForm);
