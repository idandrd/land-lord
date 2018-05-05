export const actionTypes = {
  initFirebase: "INIT_FIREBASE",
  tenantsSnapshotRecieved: "TENANTS_SNAPSHOT_RECEIVED",
  assetsSnapshotRecieved: "ASSETS_SNAPSHOT_RECEIVED"
};

export const AppActions = {
  initFirebase: () => ({
    type: actionTypes.initFirebase
  }),
  tenantsSnapshotRecieved: val => ({
    type: actionTypes.tenantsSnapshotRecieved,
    payload: val
  }),
  assetsSnapshotRecieved: val => ({
    type: actionTypes.assetsSnapshotRecieved,
    payload: val
  })
};
