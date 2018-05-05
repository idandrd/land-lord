import { take, put, call } from "redux-saga/effects";
import { firebaseService } from "../../service/fireBase";
import { actionTypes, FormActions } from "../actions/tenantForm";

export function* tenantFormSaga() {
  while (true) {
    const action = yield take(actionTypes.saveTenant);
    const tenant = action.payload;
    try {
      yield call(firebaseService.saveTenant, tenant);
      yield put(FormActions.saveTenantDone());
    } catch (err) {
      console.log(err);
      yield put(FormActions.saveTenantFailed(err));
    }
  }
}
