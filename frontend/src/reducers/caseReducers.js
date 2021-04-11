
import {
    CASE_REGISTER_FAIL,
    CASE_REGISTER_REQUEST,
    CASE_REGISTER_SUCCESS,
  } from "../constants/caseConstants.js";

export const caseCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CASE_REGISTER_REQUEST:
        return { loading: true };
      case CASE_REGISTER_SUCCESS:
        return { loading: false,success:true };
      case CASE_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  