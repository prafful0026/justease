import axios from "axios";
import {
  CASE_REGISTER_FAIL,
  CASE_REGISTER_REQUEST,
  CASE_REGISTER_SUCCESS,
  CASE_LIST_FAIL,
  CASE_LIST_REQUEST,
  CASE_LIST_SUCCESS,
  CASE_DELETE_REQUEST,
  CASE_DELETE_SUCCESS,
  CASE_DELETE_FAIL,
  CASE_ACCEPT_REQUEST,
  CASE_ACCEPT_SUCCESS,
  CASE_ACCEPT_FAIL,
} from "../constants/caseConstants.js";

export const createCase = ({
  caseId,
  caseCategory,
  caseDescription,
  email,
  lawyerId,
  userId,
  contactNo,
  lawyerName,
  userName,
}) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_REGISTER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(
      "/api/case",
      {
        caseId,
        caseCategory,
        caseDescription,
        email,
        lawyerId,
        userId,
        contactNo,
        lawyerName,
        userName,
      },
      config
    );
    dispatch({
      type: CASE_REGISTER_SUCCESS,
    });
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CASE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCases = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/case", config);
    dispatch({
      type: CASE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCase = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/case/${id}`, config);
    dispatch({
      type: CASE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CASE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const acceptCase = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_ACCEPT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const cases = "hi";

    await axios.put(`/api/case/${id}`, cases, config);
    dispatch({
      type: CASE_ACCEPT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CASE_ACCEPT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
