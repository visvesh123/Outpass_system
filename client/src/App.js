import React, { useEffect } from "react";
import "./App.css";
import LeaveForm from "./Pages/OutPassForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ApprovalPage from "./Pages/ApprovalPage";
import OutPassSec from "./Pages/OutPassSec";

import StudentLogin from "./Components/Login/StudentLogin";
import AdminLogin from "./Components/Login/AdminLogin";
import PrivateRoute from "./Components/PrivateRoute";
import SuccessPage from "./Pages/SuccessPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import TopNavBar from "./Components/VisitorsPass/Login/NavBar/TopNavBar";



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDEWNIscPxbEi721Qe1d0Eb6wM9iZZA2Yg",
  authDomain: "outpassmu.firebaseapp.com",
  projectId: "outpassmu",
  storageBucket: "outpassmu.appspot.com",
  messagingSenderId: "1082978620385",
  appId: "1:1082978620385:web:63d342defffb6eafb9f8a0",
  measurementId: "G-DX6HPNB9S1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={StudentLogin} />
          <Route exact path="/admin-login" component={AdminLogin} />
          <PrivateRoute exact path="/form" component={LeaveForm} />
          <ProtectedRoute exact path="/approval" component={ApprovalPage} />
          <Route exact path="/outpass-sec" component={OutPassSec} />
          <Route exact path="/success" component={SuccessPage} />

          <Route exact path="/visitor-form" component={TopNavBar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
