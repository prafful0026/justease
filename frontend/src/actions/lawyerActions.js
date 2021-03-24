import {
  LAWYER_DETAILS_FAIL,
  LAWYER_DETAILS_REQUEST,
  LAWYER_DETAILS_SUCCESS,
  LAWYER_LIST_FAIL,
  LAWYER_LIST_REQUEST,
  LAWYER_LIST_SUCCESS,
} from "../constants/lawyerConstants.js";
import Axios from "axios";

export const listLawyers = () => async (dispatch) => {
  try {
    dispatch({ type: LAWYER_LIST_REQUEST });
    const { data } = await Axios.get("/api/lawyers");
    dispatch({
      type: LAWYER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LAWYER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listLawyerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LAWYER_DETAILS_REQUEST });
    const { data } = await Axios.get(`/api/lawyers/${id}`);
    dispatch({
      type: LAWYER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LAWYER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

