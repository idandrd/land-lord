export const actionTypes = {
  setContractTenantId: "setContractTenantId",
  setContractAssetId: "setContractAssetId",
  setContractUnitId: "setContractUnitId",
  setContractSigningDate: "setContractSigningDate",
  setContractFirstCheckDate: "setContractFirstCheckDate",
  setContractAmountOfChecksRecieved: "setContractAmountOfChecksRecieved",

  saveContract: "saveContract",
  saveContractDone: "saveContractDone",
  saveContractFailed: "saveContractFailed"
};

export const ContractActions = {
  setContractTenantId: val => ({
    type: actionTypes.setContractTenantId,
    payload: val
  }),
  setContractAssetId: val => ({
    type: actionTypes.setContractAssetId,
    payload: val
  }),
  setContractUnitId: val => ({
    type: actionTypes.setContractUnitId,
    payload: val
  }),
  setContractSigningDate: val => ({
    type: actionTypes.setContractSigningDate,
    payload: val
  }),
  setContractFirstCheckDate: val => ({
    type: actionTypes.setContractFirstCheckDate,
    payload: val
  }),
  setContractAmountOfChecksRecieved: val => ({
    type: actionTypes.setContractAmountOfChecksRecieved,
    payload: val
  })
};

export const FormActions = {
  saveContract: contract => ({
    type: actionTypes.saveContract,
    payload: contract
  }),
  saveContractDone: () => ({ type: actionTypes.saveContractDone }),
  saveContractFailed: err => ({
    type: actionTypes.saveContractFailed,
    payload: err
  })
};
