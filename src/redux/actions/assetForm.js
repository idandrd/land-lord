export const actionTypes = {
  setAssetName: "SET_ASSET_NAME",
  setAssetCity: "SET_ASSET_CITY",
  setAssetAddress: "SET_ASSET_ADDRESS",
  setAssetYear: "SET_ASSET_YAER",
  setAssetFloors: "SET-ASSET_FLOORS",

  saveAsset: "SAVE_ASSET",
  saveAssetDone: "SAVE_ASSET_DONE",
  saveAssetFailed: "SAVE_ASSET_FAILED"
};

export const AssetActions = {
  setAssetName: val => ({
    type: actionTypes.setAssetName,
    payload: val
  }),
  setAssetCity: val => ({
    type: actionTypes.setAssetCity,
    payload: val
  }),
  setAssetAddress: val => ({
    type: actionTypes.setAssetAddress,
    payload: val
  }),
  setAssetYear: val => ({
    type: actionTypes.setAssetYear,
    payload: val
  }),
  setAssetFloors: val => ({
    type: actionTypes.setAssetFloors,
    payload: val
  })
};

export const FormActions = {
  saveAsset: asset => ({ type: actionTypes.saveAsset, payload: asset }),
  saveAssetDone: () => ({ type: actionTypes.saveAssetDone }),
  saveAssetFailed: err => ({
    type: actionTypes.saveAssetFailed,
    payload: err
  })
};
