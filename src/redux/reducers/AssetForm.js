import { Map } from "immutable";
import * as _ from "lodash";
import { actionTypes } from "../actions/assetForm";

const emptyUnit = {
  name: "",
  size: "",
  parkings: "",
  owner: ""
};
const initialState = {
  asset: {
    name: "",
    city: "",
    address: "",
    year: "",
    floors: 1
  },
  units: Map().set(_.uniqueId(), emptyUnit)
};

export function AssetFormReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.setAssetName:
      return { ...state, asset: { ...state.asset, name: payload } };
    case actionTypes.setAssetCity:
      return { ...state, asset: { ...state.asset, city: payload } };
    case actionTypes.setAssetAddress:
      return { ...state, asset: { ...state.asset, address: payload } };
    case actionTypes.setAssetYear:
      return { ...state, asset: { ...state.asset, year: payload } };
    case actionTypes.setAssetFloors:
      return { ...state, asset: { ...state.asset, floors: payload } };
    default:
      return state;
  }
}
