import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { connect , useSelector  , useDispatch} from "react-redux";
import { fetchStudentById  , fetchVisible} from "../../actions";


const { Column, ColumnGroup } = Table;

const ApprovalTable = (props) => {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.visible)
  const [id, setId] = useState("");

  useEffect(() => {
    props.fetchStudentById(id);
  }, []);

  const hello = props.data;
  const student = props.student;

  return (
    <>
      <h2>Applied Leaves </h2>
      <Table dataSource={hello}>
        <Column title="Token ID" dataIndex="TOKEN" key="TOKEN" />
        <ColumnGroup title="Info">
          <Column title="HTNO" dataIndex="HTNO" key="HTNO" />
          <Column
            title="STUDENT NAME"
            dataIndex="STUDENT_NAME"
            key="STUDENT_NAME"
          />
        </ColumnGroup>
        <Column title="Applied On" dataIndex="ASN_DATE" key="ASN_DATE" />
        <Column title="From" dataIndex="FROM" key="FROM" />
        <Column title="To" dataIndex="TO" key="TO" />
        <Column title="Reason for Leave" dataIndex="REASON" key="REASON" />

        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                type="link"
                onClick={() => {
                  props.change(record.HTNO, record.TOKEN, record.ASN_DATE);
                  window.scroll(0, 0);
                  dispatch(fetchVisible(true))
                }}
              >
                View More
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};

export default connect(mapStateToProps, { fetchStudentById: fetchStudentById })(
  ApprovalTable
);
