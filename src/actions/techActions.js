import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR
} from "./types";

export const getTechs = () => async (dispatch) => {
  try {
    setLoading(true);

    const res = await fetch("https://ukwjw-3001.sse.codesandbox.io/techs");
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.data
    });
  }
};

export const addTech = (tech) => async (dispatch) => {
  try {
    const res = await fetch("https://ukwjw-3001.sse.codesandbox.io/techs", {
      method: "POST",
      body: JSON.stringify(tech),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    dispatch({
      type: ADD_TECH,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.data
    });
  }
};

export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch("https://ukwjw-3001.sse.codesandbox.io/techs/" + id, {
      method: "DELETE"
    });

    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.data
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
