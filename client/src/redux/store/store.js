import { createStore, combineReducers } from "redux";
import { CurrentPageReducer } from "../reducers/CurrentPage"

const rootReducer = combineReducers({
    CurrentPageReducer
})

export const store = createStore(rootReducer);