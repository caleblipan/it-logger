import { GET_LOGS, SET_LOADING, LOGS_ERROR } from "./types";

export const getLogs = () => async (dispatch) => {
  try {
    setLoading(true);

    const res = await fetch("https://ukwjw-3001.sse.codesandbox.io/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
