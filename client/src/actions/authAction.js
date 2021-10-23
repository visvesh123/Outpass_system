import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";


// Student Login


export const setCurrentUser = (decoded) => {
    return {
      type: "SET_CURRENT_USER",
      payload: decoded,
    };
  };

export const loginUser = (userData) => (dispatch) => {
    axios
      .post("outpass/login", userData)
      .then((res) => { 
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls  
        localStorage.setItem("jwtTokenAdmin", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch((err) =>
        dispatch({
          type: "GET_ERRORS",
          payload: "error",
        })
      );
  };
 

  // Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtTokenAdmin");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};