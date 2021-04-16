import {
  CASE_REGISTER_FAIL,
  CASE_REGISTER_REQUEST,
  CASE_REGISTER_SUCCESS,
  CASE_LIST_FAIL,
  CASE_LIST_REQUEST,
  CASE_LIST_SUCCESS,
  CASE_LIST_RESET,
  CASE_ACCEPT_REQUEST,
  CASE_ACCEPT_SUCCESS,
  CASE_ACCEPT_FAIL,
  CASE_DELETE_REQUEST,
  CASE_DELETE_SUCCESS,
  CASE_DELETE_FAIL,
} from "../constants/caseConstants.js";

export const caseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CASE_REGISTER_REQUEST:
      return { loading: true };
    case CASE_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case CASE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const caseListReducer = (state = { cases: [] }, action) => {
  switch (action.type) {
    case CASE_LIST_REQUEST:
      return { loading: true };
    case CASE_LIST_SUCCESS:
      return { loading: false, cases: action.payload };
    case CASE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CASE_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const caseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CASE_DELETE_REQUEST:
      return { loading: true };
    case CASE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CASE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const caseAcceptReducer = (state = {}, action) => {
  switch (action.type) {
    case CASE_ACCEPT_REQUEST:
      return { loading: true };
    case CASE_ACCEPT_SUCCESS:
      return { loading: false, success: true };
    case CASE_ACCEPT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
