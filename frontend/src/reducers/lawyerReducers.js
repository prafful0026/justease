import {
  LAWYER_LIST_FAIL,
  LAWYER_LIST_REQUEST,
  LAWYER_LIST_SUCCESS,
  LAWYER_DETAILS_SUCCESS,
  LAWYER_DETAILS_REQUEST,
  LAWYER_DETAILS_FAIL,
  LAWYER_DETAILS_RESET,
  LAWYER_REVIEW_SUCCESS,
  LAWYER_REVIEW_REQUEST,
  LAWYER_REVIEW_FAIL,
  LAWYER_REVIEW_RESET,

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
      return { ...state ,loading: true, };
    case LAWYER_DETAILS_SUCCESS:
      return { loading: false, lawyer: action.payload };
    case LAWYER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
      case LAWYER_DETAILS_RESET:
      return { lawyer: {} }
    default:
      return state;
  }
};

export const lawyerReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case LAWYER_REVIEW_REQUEST:
      return { loading: true }
    case LAWYER_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case LAWYER_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case LAWYER_REVIEW_RESET:
      return { }
    default:
      return state
  }
}

// export default lawyerListReducer;
