import { take, put, call } from "redux-saga/effects";
import { firebaseService } from "../../service/fireBase";
import { actionTypes, FormActions } from "../actions/contractForm";

export function* contractFormSaga() {
  while (true) {
    const { payload } = yield take(actionTypes.saveContract);
    try {
      yield call(firebaseService.saveContract, payload);
      // yield put(FormActions.saveContractDone);
    } catch (err) {
      console.log(err);
      // yield put(FormActions.saveContractFailed(err));
    }
  }
}
