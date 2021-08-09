import { LOGOUT, AUTH, INVALID, VALID } from '../constants/actionTypes';

const authReducer = (state = { authData: null, isInvalid: false, message: '' }, action) => {
  switch (action.type) {

    // if user's info is invalid
    case INVALID:
      return { ...state, isInvalid: true, message: action.payload };

    // if user's info is valid
    case VALID:
      return { ...state, isInvalid: false, message: action.payload };

    // updating the state and storing the user in the localstorage for further references
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, isInvalid: false, message: '' };
    
    // on logout clearing the entire local storage
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, isInvalid: false, message: '' };
    default:
      return state;
  }
};

export default authReducer;
