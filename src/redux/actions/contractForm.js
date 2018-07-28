export const actionTypes = {
  setTenantIsBusiness: "SET_TENANT_IS_BUSINESS",
  setTenantName: "SET_TENANT_NAME",
  setTenantNum: "SET_TENANT_NUM",
  setTenantType: "SET_TENANT_TYPE",
  setTenantComments: "SET_TENANT_COMMENTS",

  setContactName: "SET_CONTACT_NAME",
  setContactRole: "SET_CONTACT_ROLE",
  setContactPhone: "SET_CONTACT_PHONE",
  setContactEmail: "SET_CONTACT_EMAIL",
  addContact: "ADD_CONTACT",
  removeContact: "REMOVE_CONTACT",

  saveContract: "SAVE_CONTRACT",
  saveContractDone: "SAVE_CONTRACT_DONE",
  saveContractFailed: "SAVE_CONTRACT_FAILED"
};

export const TenantActions = {
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
  }),
  addContact: () => ({
    type: actionTypes.addContact
  })
};

export const ContactActions = {
  setContactName: (contactId, val) => ({
    type: actionTypes.setContactName,
    payload: { contactId, value: val }
  }),
  setContactRole: (contactId, val) => ({
    type: actionTypes.setContactRole,
    payload: { contactId, value: val }
  }),
  setContactPhone: (contactId, val) => ({
    type: actionTypes.setContactPhone,
    payload: { contactId, value: val }
  }),
  setContactEmail: (contactId, val) => ({
    type: actionTypes.setContactEmail,
    payload: { contactId, value: val }
  }),
  removeContact: contactId => ({
    type: actionTypes.removeContact,
    payload: contactId
  })
};

export const FormActions = {
  saveContract: contract => ({ type: actionTypes.saveContract, payload: contract }),
  saveContractDone: () => ({ type: actionTypes.saveContractDone }),
  saveContractFailed: err => ({
    type: actionTypes.saveContractFailed,
    payload: err
  })
};
