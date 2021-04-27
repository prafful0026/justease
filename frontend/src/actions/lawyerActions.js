import axios from "axios";

import {
  LAWYER_DETAILS_FAIL,
  LAWYER_DETAILS_REQUEST,
  LAWYER_DETAILS_SUCCESS,
  LAWYER_LIST_FAIL,
  LAWYER_LIST_REQUEST,
  LAWYER_LIST_SUCCESS,
  LAWYER_REVIEW_SUCCESS,
  LAWYER_REVIEW_REQUEST,
  LAWYER_REVIEW_FAIL,
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

export const listLawyers = (keyword="") => async (dispatch) => {
  try {
    dispatch({ type: LAWYER_LIST_REQUEST });
    const { data } = await axios.get(`/api/lawyers?keyword=${keyword}`);
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
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    const { data } = await axios.get(`/api/lawyers/${id}`);
    // console.log(data)
    dispatch({
      type: LAWYER_DETAILS_SUCCESS,
      payload: data,
    })
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

export const createLawyerReview =   (lawyerId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type:LAWYER_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/lawyers/${lawyerId}/reviews`, review, config)

    dispatch({
      type:LAWYER_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type:LAWYER_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const deleteLaywer = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LAWYER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/lawyers/${id}`, config);
    dispatch({
      type: LAWYER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LAWYER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyLaywer = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LAWYER_VERIFY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const lawyer="hi"
    await axios.put(`/api/lawyers/verify/${id}`,lawyer, config);
    dispatch({
      type: LAWYER_VERIFY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LAWYER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listTopLawyers = () => async (dispatch) => {
  try {
    dispatch({ type: LAWYER_TOP_REQUEST })

    const { data } = await axios.get(`/api/lawyers/lawyer/top`)

    dispatch({
      type: LAWYER_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LAWYER_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}