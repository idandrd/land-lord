export const actionTypes = {
  initFirebase: "INIT_FIREBASE",
  tenantsSnapshotRecieved: "TENANTS_SNAPSHOT_RECEIVED",
  assetsSnapshotRecieved: "ASSETS_SNAPSHOT_RECEIVED",
  contractsSnapshotRecieved: "CONTRACTS_SNAPSHOT_RECEIVED",
  ownersSnapshotRecieved: "OWNERS_SNAPSHOT_RECEIVED",
  tasksSnapshotRecieved: "TASKS_SNAPSHOT_RECEIVED"
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
  }),
  contractsSnapshotRecieved: val => ({
    type: actionTypes.contractsSnapshotRecieved,
    payload: val
  }),
  ownersSnapshotRecieved: val => ({
    type: actionTypes.ownersSnapshotRecieved,
    payload: val
  }),
  tasksSnapshotRecieved: val => ({
    type: actionTypes.tasksSnapshotRecieved,
    payload: val
  })
};
