import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";

export default createStore(rootReducer, applyMiddleware(promise(),thunk));
