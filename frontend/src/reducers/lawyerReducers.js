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
  LAWYER_DELETE_REQUEST,
  LAWYER_DELETE_SUCCESS,
  LAWYER_DELETE_FAIL,
  LAWYER_VERIFY_REQUEST,
  LAWYER_VERIFY_SUCCESS,
  LAWYER_VERIFY_FAIL,
  LAWYER_TOP_REQUEST,
  LAWYER_TOP_SUCCESS,
  LAWYER_TOP_FAIL,   
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
export const lawyerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LAWYER_DELETE_REQUEST:
      return { loading: true };
    case LAWYER_DELETE_SUCCESS:
      return { loading: false,success:true };
    case LAWYER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lawyerVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case LAWYER_VERIFY_REQUEST:
      return { loading: true };
    case LAWYER_VERIFY_SUCCESS:
      return { loading: false,success:true };
    case LAWYER_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lawyerTopRatedReducer = (state = { lawyers: [] }, action) => {
  switch (action.type) {
    case LAWYER_TOP_REQUEST:
      return { loading: true, lawyers: [] }
    case LAWYER_TOP_SUCCESS:
      return { loading: false, lawyers: action.payload }
    case LAWYER_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}