import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  lawyerListReducer,
  lawyerDetailsReducer,
  lawyerReviewReducer,
  lawyerDeleteReducer,
  lawyerVerifyReducer,
  lawyerTopRatedReducer
} from "./reducers/lawyerReducers.js";
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/userReducers.js";
import {
  caseCreateReducer,
  caseListReducer,
  caseDeleteReducer,
  caseAcceptReducer,
} from "./reducers/caseReducers.js";
const reducer = combineReducers({
  lawyerList: lawyerListReducer,
  lawyerDetails: lawyerDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  lawyerReview: lawyerReviewReducer,
  caseCreate: caseCreateReducer,
  caseList: caseListReducer,
  caseDelete:caseDeleteReducer,
  caseAccept:caseAcceptReducer,
  lawyerDelete: lawyerDeleteReducer,
  lawyerVerify: lawyerVerifyReducer,
  lawyerTopRated:lawyerTopRatedReducer
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
