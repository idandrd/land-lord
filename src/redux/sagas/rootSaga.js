import { fork } from "redux-saga/effects";
import { appSaga } from "./app";
import { tenantFormSaga } from "./tenantForm";
import { assetFormSaga } from "./assetForm";
import { contractFormSaga } from "./contractForm";

export function* rootSaga() {
  yield fork(appSaga);
  yield fork(tenantFormSaga);
  yield fork(assetFormSaga);
  yield fork(contractFormSaga);
}
