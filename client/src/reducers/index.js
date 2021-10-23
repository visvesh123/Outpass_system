import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";
import applyLeaveReducer from "./applyLeaveReducer";
import appliedLeavesReducer from "./appliedLeavesReducer";
import vacReducer from "./vacReducer";
import updateAppliedLeaveReducer from './updateAppliedLeaveReducer';
import sendMailReducer from "./sendMailReducer";
import setVisibleReducer from './setVisibleReducer';
import approvedLeavesReducer from "./approvedLeavesReducer";
import updateApprovedLeaveReducer from "./updateApprovedLeaveReducer";



export default combineReducers({
    auth : authReducer,
    error : errorReducer,
    student : studentReducer,
    leave : applyLeaveReducer,
    applied_leaves : appliedLeavesReducer,
    vaccination : vacReducer,
    update_applied_leave : updateAppliedLeaveReducer,
    mail : sendMailReducer,
    visible : setVisibleReducer,
    approved_leaves : approvedLeavesReducer,
    update_approved_leave : updateApprovedLeaveReducer
   
}) 