import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//REDUX
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const middleWare = [thunk];
const store = createStore(
  Reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

ReactDOM.render(
  <Provider store= {store}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
   </Provider>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 