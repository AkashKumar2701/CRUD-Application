import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    // Fetching specific post  by search query
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };

    // Fetching specific post
    case FETCH_POST:
      return { ...state, post: action.payload.post };

    // adding currently created post to posts 
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    // updating the current post
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    
    // removing deleted post
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    
    // updating the currentl likes post
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    
    // updating the current post by adding comments 
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    
    default:
      return state;
  }
};

