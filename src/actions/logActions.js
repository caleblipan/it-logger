import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS
} from "./types";

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

export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading(true);

    const res = await fetch(
      "https://ukwjw-3001.sse.codesandbox.io/logs?q=" + text
    );
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

export const addLog = (log) => async (dispatch) => {
  try {
    const res = await fetch("https://ukwjw-3001.sse.codesandbox.io/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch("https://ukwjw-3001.sse.codesandbox.io/logs/" + id, {
      method: "DELETE"
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(
      "https://ukwjw-3001.sse.codesandbox.io/logs/" + log.id,
      {
        method: "PUT",
        body: JSON.stringify(log),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
