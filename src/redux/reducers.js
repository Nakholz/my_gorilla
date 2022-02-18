import {
  SET_USER_NAME,
  SET_USER_PASSWORD,
  SET_TOKEN,
  GET_TOKEN,
  SET_GUEST_LIST,
  DELETE_GUEST,
  UPDATE_GUEST,
  ADD_GUEST,
} from "./actions";

const initialState = {
  name: "",
  password: "",
  token: "",
  guestList: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    case SET_USER_PASSWORD:
      return { ...state, password: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case GET_TOKEN:
      return { ...state, token: action.payload };
    case SET_GUEST_LIST:
      return { ...state, guestList: action.payload };
    case DELETE_GUEST: {
      const id = action.payload;
      return {
        ...state,
        guestList: state.guestList.filter((item) => item.id !== id),
      };
    }
    case UPDATE_GUEST:
      const { id, nvalue } = action.payload;
      return {
        ...state,
        guestList: state.guestList.map((item) => {
          if (item.id == id) {
            item.firstname = nvalue.firstname;
            item.lastname = nvalue.lastname;
            item.willCome = nvalue.willCome;
          }
          return item;
        }),
      };
    case ADD_GUEST:
      const nguest = action.payload;
      return {
        ...state,
        guestList: [...state.guestList, nguest],
      };

    default:
      return state;
  }
}

export default userReducer;
