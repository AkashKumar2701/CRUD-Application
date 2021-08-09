import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';

// combining all the reducers
export const reducers = combineReducers({ posts, auth });
