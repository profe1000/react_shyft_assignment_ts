import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Todoreducer, Todoreducerb } from "./reducers/TodoReducer";


const reducer = combineReducers({
  Todo: Todoreducer,
  TodoB: Todoreducerb,
});

const initialState = {};  
const middleware = [thunk]; //there can be multiple middlewares here

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // passing middleware
);