import React, { useEffect, useState } from "react";
import { Card, Descriptions, message } from "antd";
import { connect, useSelector, useDispatch } from "react-redux";

import { Button } from "react-bootstrap";
import {
  fetchStudentById,
  updateAppliedLeave,
  sendMail,
  fetchVisible,
} from "../../actions";
import moment from "moment";

const { Meta } = Card;

const DescriptionTable = (props) => {
  const visible = useSelector((state) => state.visible);

  if (props.val === "") {
    return <div>click view more</div>;
  } else {
    var x = props.data;
    var student = props.student;
    var vac = props.vac[0];
    if (!vac) return null;

    console.log(x);
    console.log(student[0]);
    console.log(vac[0]);

    function handleClick(status) {
      console.log("clicked" + status);
      props.updateAppliedLeave({
        token: x.TOKEN,
        status: status,
        htno: x.HTNO,
        asn: x.ASN_DATE,
      });
      props.sendMail({
        type: status,
        desc: x.REASON,
        mail: student[0].STUDENT_EMAIL,
        from: x.FROM,
        to: x.TO,
        token: x.TOKEN,
        warden: "qqq",
      });

      status === "approved"
        ? message.success(`Leave approved for ${x.HTNO}`)
        : message.warning(`Leave rejected for ${x.HTNO}`);
      props.fetchVisible(false);
    }

    function cov(ts_ms) {
      var date_ob = new Date(ts_ms /1000);

      // year as 4 digits (YYYY)
      var year = date_ob.getFullYear();

      // month as 2 digits (MM)
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // date as 2 digits (DD)
      var date = ("0" + date_ob.getDate()).slice(-2);

      // hours as 2 digits (hh)
      return date + "/" + month + "/" + year
    }

    return (
      <>
        <div style={{ marginBottom: 40 }}>
          <Descriptions
            title="Details of Student "
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Applied At">
              {" "}
              {visible ? cov(x.ASN_DATE)  : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Token ID">
              {visible ? x.TOKEN : ""}
            </Descriptions.Item>
            <Descriptions.Item label="HTNO">
              {visible ? x.HTNO : ""}
            </Descriptions.Item>
            <Descriptions.Item label="STUDENT NAME">
              {visible ? x.STUDENT_NAME : ""}
            </Descriptions.Item>

            <Descriptions.Item label="From">
              {visible ? moment(x.FROM).format("LLLL") : ""}
            </Descriptions.Item>
            <Descriptions.Item label="TO">
              {" "}
              {visible ? moment(x.TO).format("LLLL") : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Vaccination status">
              <strong>
                {" "}
                {visible ? vac.VAC_NAME : ""}
                {`( ${visible ? vac.DOSE : ""} Doses)`}
              </strong>
            </Descriptions.Item>

            <Descriptions.Item label="Hostel Block and Room ">
              {" "}
              {visible ? x.BLOCK : ""} , {visible ? x.ROOM : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Student's contact">
              {" "}
              {visible ? student[0].STUDENT_MOBILE : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Parent's Contact / Email">
              {visible ? student[0].PARENTS_MOBILE : ""} ,{" "}
              {visible ? student[0].PARENTS_EMAIL : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Reason">
              {" "}
              {visible ? x.REASON : ""}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Picture">
              {visible ? (
                <img
                  width={150}
                  src={`https://musecportal.s3.ap-south-1.amazonaws.com/2018/${x.HTNO}.JPG`}
                  alt="new"
                />
              ) : (
                ""
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div>
          <Button variant="success" onClick={() => handleClick("approved")}>
            Approve Leave
          </Button>{" "}
          <Button variant="danger" onClick={() => handleClick("rejected")}>
            Reject Leave
          </Button>{" "}
        </div>
        <hr />
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};

export default connect(mapStateToProps, {
  fetchStudentById: fetchStudentById,
  updateAppliedLeave: updateAppliedLeave,
  sendMail,
  fetchVisible,
})(DescriptionTable);
