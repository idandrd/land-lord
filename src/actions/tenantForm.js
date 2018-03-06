export const actionTypes = {
  setTenantIsBusiness: "SET_TENANT_IS_BUSINESS",
  setTenantName: "SET_TENANT_NAME",
  setTenantNum: "SET_TENANT_NUM",
  setTenantType: "SET_TENANT_TYPE",
  setTenantComments: "SET_TENANT_COMMENTS"
};

export const Actions = {
  setTenantIsBusiness: val => ({
    type: actionTypes.setTenantIsBusiness,
    payload: val
  }),
  setTenantName: val => ({
    type: actionTypes.setTenantName,
    payload: val
  }),
  setTenantNum: val => ({
    type: actionTypes.setTenantNum,
    payload: val
  }),
  setTenantType: val => ({
    type: actionTypes.setTenantType,
    payload: val
  }),
  setTenantComments: val => ({
    type: actionTypes.setTenantComments,
    payload: val
  })
};
