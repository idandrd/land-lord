import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { TenantFormReducer } from "./reducers/TenantForm";

const rootReducer = combineReducers({
  TenantForm: TenantFormReducer
});

export const getStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
