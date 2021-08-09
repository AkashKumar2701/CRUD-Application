import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';

// function to make an api call to backend to get a specific post's data
export const getPost = (id) => async (dispatch) => {
  try {
    // start loading while data is fetched and received
    dispatch({ type: START_LOADING });

    // received data from backend
    const { data } = await api.fetchPost(id);

    // dispatching action to reducer to update the state
    dispatch({ type: FETCH_POST, payload: { post: data } });
    // end loading after all task are performed
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
// function to make an api call to backend to get all the posts
export const getPosts = (page) => async (dispatch) => {
  try {
        // start loading while data is fetched and received
    dispatch({ type: START_LOADING });
    // received data
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    // dispatching action to reducer to update the state
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// function to make an api call to backend to get a post by search filter and tag filter
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // fetched data after applying filters
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// function to make an api call to backend to create a new post 
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // data of newly created post
    const { data } = await api.createPost(post);

    // update state using reducer
    dispatch({ type: CREATE, payload: data });

    // push the url to that specific post
    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};
// function to make an api call to backend to update an existing post

export const updatePost = (id, post) => async (dispatch) => {
  try {
    // updated post data
    const { data } = await api.updatePost(id, post);

    // updating the data in the state
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// function to make an api call to backend to like a post
export const likePost = (id) => async (dispatch) => {
  // the user who has liked the post
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    // send the current user id and token
    const { data } = await api.likePost(id, user?.token);

    // updating the state
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// function to make an api call to backend to comment on a post
export const commentPost = (value, id) => async (dispatch) => {
  try {
    // updated data after comenting on post
    const { data } = await api.comment(value, id);

    // updating the state in global store
    dispatch({ type: COMMENT, payload: data });
    return data.comments;

  } catch (error) {
    console.log(error);
  }
};

// function to make an api call to backend to delete a specific post
export const deletePost = (id) => async (dispatch) => {
  try {
    // delete the post from DB
    await api.deletePost(id);

  // updating the state
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
