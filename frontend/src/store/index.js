import { createStore, compose, combineReducers, applyMiddleware } from "redux";

import thunkMiddleware from "redux-thunk";
import { authReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const middleware = [thunkMiddleware]; // khai báo middleware
// tạo store
const store = createStore(
  rootReducer, // toàn bộ reducers đã kết hợp
  compose(
    applyMiddleware(...middleware), //Add middleware vào store (ở đây có thunkMiddleware)
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
