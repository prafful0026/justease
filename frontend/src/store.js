import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  lawyerListReducer,
  lawyerDetailsReducer,
} from "./reducers/lawyerReducers.js";
const reducer = combineReducers({
  lawyerList: lawyerListReducer,
  lawyerDetails: lawyerDetailsReducer,
});
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
