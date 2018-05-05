import { actionTypes } from "../actions/app";

const initialState = {
  tenants: [],
  assets: [],
  contracts: []
};

export function CaseReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.tenantsSnapshotRecieved:
      return { ...state, tenants: payload };
    case actionTypes.assetsSnapshotRecieved:
      return { ...state, assets: payload };
    default:
      return state;
  }
}
