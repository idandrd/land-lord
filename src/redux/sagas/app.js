import { eventChannel } from "redux-saga";
import { take, put, call, fork } from "redux-saga/effects";
import { firebaseService } from "../../service/fireBase";
import { actionTypes, AppActions } from "../actions/app";

export function* appSaga() {
  while (true) {
    yield take(actionTypes.initFirebase);
    yield call(firebaseService.initFirebase);
    yield call(firebaseService.initCase, "amir123");
    yield fork(tenantsListenerSaga);
    yield fork(assetsListenerSaga);
    yield fork(contractsListenerSaga);
    yield fork(tasksListenerSaga);
  }
}

function* tenantsListenerSaga() {
  const chan = yield call(tenantsListener);
  try {
    while (true) {
      const msg = yield take(chan);
      yield put(AppActions.tenantsSnapshotRecieved(msg));
    }
  } finally {
    console.log("unsubscribed from tenants channel");
  }
}

function* assetsListenerSaga() {
  const chan = yield call(assetsListener);
  try {
    while (true) {
      const msg = yield take(chan);
      yield put(AppActions.assetsSnapshotRecieved(msg));
    }
  } finally {
    console.log("unsubscribed from assets channel");
  }
}

function* contractsListenerSaga() {
  const chan = yield call(contractsListener);
  try {
    while (true) {
      const msg = yield take(chan);
      yield put(AppActions.contractsSnapshotRecieved(msg));
    }
  } finally {
    console.log("unsubscribed from contracts channel");
  }
}

function* tasksListenerSaga() {
  const chan = yield call(tasksListener);
  try {
    while (true) {
      const msg = yield take(chan);
      yield put(AppActions.tasksSnapshotRecieved(msg));
    }
  } finally {
    console.log("unsubscribed from tasks channel");
  }
}

function tenantsListener() {
  return eventChannel(emitter => {
    const unsubscribe = firebaseService.listenForTenants(emitter);
    return () => unsubscribe();
  });
}

function assetsListener() {
  return eventChannel(emitter => {
    const unsubscribe = firebaseService.listenForAssets(emitter);
    return () => unsubscribe();
  });
}

function contractsListener() {
  return eventChannel(emitter => {
    const unsubscribe = firebaseService.listenForContracts(emitter);
    return () => unsubscribe();
  });
}

function tasksListener() {
  return eventChannel(emitter => {
    const unsubscribe = firebaseService.listenForTasks(emitter);
    return () => unsubscribe();
  });
}
