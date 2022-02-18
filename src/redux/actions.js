export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_PASSWORD = "SET_USER_PASSWORD";
export const SET_TOKEN = "SET_TOKEN";
export const GET_TOKEN = "GET_TOKEN";
export const SET_GUEST_LIST = "SET_GUEST_LIST";
export const DELETE_GUEST = "DELETE_GUEST";
export const UPDATE_GUEST = "UPDATE_GUEST";
export const ADD_GUEST = "ADD_GUEST";

export const setName = (name) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: SET_USER_PASSWORD,
    payload: password,
  });
};

export const setToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const setGuestList = (guestList) => (dispatch) => {
  dispatch({
    type: SET_GUEST_LIST,
    payload: guestList,
  });
};

export const deleteGuest = (id) => (dispatch) => {
  dispatch({
    type: DELETE_GUEST,
    payload: id,
  });
};

export const updateGuest = (id, nvalue) => (dispatch) => {
  dispatch({
    type: UPDATE_GUEST,
    payload: { id, nvalue },
  });
};

export const addGuest = (nguest) => (dispatch) => {
  dispatch({
    type: ADD_GUEST,
    payload: nguest,
  });
};
