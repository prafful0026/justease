import {
  LAWYER_LIST_FAIL,
  LAWYER_LIST_REQUEST,
  LAWYER_LIST_SUCCESS,
  LAWYER_DETAILS_SUCCESS,
  LAWYER_DETAILS_REQUEST,
  LAWYER_DETAILS_FAIL,
} from "../constants/lawyerConstants.js";

export const lawyerListReducer = (state = { lawyers: [] }, action) => {
  switch (action.type) {
    case LAWYER_LIST_REQUEST:
      return { loading: true, lawyers: [] };
    case LAWYER_LIST_SUCCESS:
      return { loading: false, lawyers: action.payload };
    case LAWYER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const lawyerDetailsReducer = (state = { lawyer: {reviews:[]} }, action) => {
  switch (action.type) {
    case LAWYER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case LAWYER_DETAILS_SUCCESS:
      return { loading: false, lawyer: action.payload };
    case LAWYER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// export default lawyerListReducer;
