import {  createStore,combineReducers } from "redux";
import { CurrentPageReducer } from "../reducers/CurrentPage"
import LoginPageReducer from "../reducers/LoginPageReducer";
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
   
    storage:storageSession,
    whiteList:['LoginPageReducer']

  };
const rootReducer = combineReducers({
    CurrentPageReducer,
   LoginPageReducer
  

})
const perReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(perReducer);
export default store;