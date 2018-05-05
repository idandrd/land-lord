export const actionTypes = {
  fetchTenants: "FETCH_TENANTS",
  tenantsFetched: "TENANTS_FETCHED",
  fetchTenantsFailed: "FETCH_TENANTS_FAILED"
};

export const Actions = {
  fetchTenants: () => ({ type: actionTypes.fetchTenants }),
  tenantsFetched: tenants => ({
    typs: actionTypes.tenantsFetched,
    payload: tenants
  }),
  fetchTenantsFailed: err => ({
    type: actionTypes.fetchTenantsFailed,
    payload: err
  })
};
