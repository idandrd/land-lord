export const Routes = {
  tasks: "/tasks",
  contracts: "/contracts",
  editContract: "/contracts/edit/:id",
  newContract: "/contracts/new",
  viewContract: "/contracts/:id",
  tenants: "/tenants",
  editTenant: "/tenants/edit/:id",
  newTenant: "/tenants/new",
  assets: "/assets",
  editAsset: "/assets/edit/:id",
  newAsset: "/assets/new",
  owners: "/owners",
  newOwner: "/owners/new"
};

export const TaskType = {
  RegularCheck: "regularCheck"
};

export const TaskStatus = {
  Active: "active",
  Done: "done"
};
