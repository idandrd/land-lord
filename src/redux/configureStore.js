import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { rootSaga } from "./sagas/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";
import { TenantFormReducer } from "./reducers/TenantForm";
import { AssetFormReducer } from "./reducers/AssetForm";
import { ContractFormReducer } from "./reducers/ContractForm";
import { CaseReducer } from "./reducers/Case";

const rootReducer = combineReducers({
  Case: CaseReducer,
  TenantForm: TenantFormReducer,
  AssetForm: AssetFormReducer,
  ContractForm: ContractFormReducer
});

const sagaMiddleware = createSagaMiddleware();

export const getStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
