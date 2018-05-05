import { take, put, call } from "redux-saga/effects";
import { firebaseService } from "../../service/fireBase";
import { actionTypes, FormActions } from "../actions/assetForm";

export function* assetFormSaga() {
  while (true) {
    const action = yield take(actionTypes.saveAsset);
    const asset = action.payload;
    try {
      yield call(firebaseService.saveAsset, asset);
      yield put(FormActions.saveAssetDone());
    } catch (err) {
      console.log(err);
      yield put(FormActions.saveAssetFailed(err));
    }
  }
}
