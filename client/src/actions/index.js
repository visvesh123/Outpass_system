import axios from "axios";
import web from "../apis/web";

export const fetchStudent = () => async (dispatch, getState) => {
  const response = await web.get("/profile", {
    headers: { Authorization: localStorage.getItem("jwtTokenAdmin") },
  });
  dispatch({ type: "FETCH_STUDENT", payload: response.data.user });
  // console.log(response.data.user);
};

export const fetchStudentById = (ids) => async (dispatch, getState) => {
  const response = await web.get(`/profile/${ids}`, {
    headers: { Authorization: localStorage.getItem("jwtTokenAdmin") },
  });
  dispatch({ type: "FETCH_STUDENT", payload: response.data.user });
  // console.log(response.data.user);
};

export const fetchStudentVacStatus = (htno) => async (dispatch, getState) => {
  const response = await web.get(`/vaccination/1`, {
    headers: { Authorization: localStorage.getItem("jwtTokenAdmin") },
  });
  dispatch({ type: "FETCH_STUDENT_VAC", payload: response.data });
  // console.log(response.data);
};

export const updateAppliedLeave = (data) => async (dispatch, getState) => {
  const response = await web.put(`/updateleave`, data, {
    headers: { Authorization: localStorage.getItem("jwtTokenAdmin") },
  });
  dispatch({ type: "UPDATE_APPLIED_LEAVE", payload: response.data });
  // console.log(response.data);
};

export const updateApprovedLeave = (data) => async (dispatch, getState) => {
  const response = await web.put(`/updateapprovedleave`, data, {
    headers: { Authorization: localStorage.getItem("jwtTokenAdmin") },
  });
  dispatch({ type: "UPDATE_APPROVED_LEAVE", payload: response.data });
  console.log("Approve", response.data);
};

export const applyLeave = (userData) => (dispatch) => {
  web
    .post("/createpass", userData)
    .then((res) => {
      // Save to localStorage
      dispatch({ type: "APPLY_LEAVE", payload: userData });
    })
    .catch((err) =>
      dispatch({
        type: "GET_ERRORS",
        payload: "error",
      })
    );
};

export const fetchAppliedLeaves = () => async (dispatch, getState) => {
  const response = await web.get("/appliedleaves", {
    headers: { Authorization: localStorage.getItem("jwtTokenAdmin") },
  });
  dispatch({
    type: "FETCH_APPLIED_LEAVES",
    payload: response.data.applied_leaves,
  });
  console.log(response.data);
};

export const fetchApprovedLeaves = () => async (dispatch, getState) => {
  const response = await web.get("/approvedleaves", {
    headers: { Authorization: localStorage.getItem("jwtTokenAdmin") },
  });
  dispatch({
    type: "FETCH_APPROVED_LEAVES",
    payload: response.data.approved_leaves,
  });
  console.log(response.data);
};

export const sendMail = (data) => (dispatch) => {
  web
    .post("/mail", data, {
      headers: { Authorization: localStorage.getItem("jwtToken") },
    })
    .then((res) => {
      dispatch({ type: "SEND_MAIL", payload: res.data });
    });
};

export const fetchVisible = (val) => {
  return {
    type: "SET_VISIBLE",
    payload: val,
  };
};
