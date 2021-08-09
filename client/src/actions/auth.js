import { AUTH, INVALID } from '../constants/actionTypes';
import * as api from '../api/index.js';

// function to make an api call to backend for signing in the user 
export const signin = (formData, router) => async (dispatch) => {
  try {
    // received data
    const { data } = await api.signIn(formData);
    // if some error is there
    if (data?.message) {
      dispatch({ type: INVALID, payload: data?.message })
    }
    else {
      // if user is successfully logged in
      dispatch({ type: AUTH, data });
      router.push('/');
    }

  } catch (error) {
    console.log(error);
  }
};

// function to make an api call to backend to register the user
export const signup = (formData, router) => async (dispatch) => {
  try {

    // received data of newly created user
    const { data } = await api.signUp(formData);
    // if some error is occured
    if (data?.message) {
      dispatch({ type: INVALID, payload: data?.message })
    }
    // if user is succesfully registered
    else {
      dispatch({ type: AUTH, data });
      router.push('/');
    }

  } catch (error) {
    console.log(error);
  }
};
