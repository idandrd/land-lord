import { take, put, call } from "redux-saga/effects";
import { firebaseService } from "../../service/fireBase";
import { actionTypes, FormActions } from "../actions/ownerForm";

export function* ownerFormSaga() {
  while (true) {
    const action = yield take(actionTypes.saveOwner);
    const owner = action.payload;
    console.log("************************************* GOT ACTION")
    try {
      yield call(firebaseService.saveOwner, owner);
      yield put(FormActions.saveOwnerDone());
    } catch (err) {
      console.log(err);
      yield put(FormActions.saveOwnerFailed(err));
    }
  }
}
