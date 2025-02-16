import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    userAccount: userReducer,
});

export default rootReducer;