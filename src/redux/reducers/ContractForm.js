import { actionTypes } from "../actions/contractForm";

const initialState = {
  tenantId: "",
  assetId: "",
  unitId: "",
  signingDate: "",
  firstCheckDate: "",
  amountOfChecksRecieved: 0
};

export function ContractFormReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.setContractTenantId:
      return { ...state, tenantId: payload };
    case actionTypes.setContractAssetId:
      return { ...state, assetId: payload };
    case actionTypes.setContractUnitId:
      return { ...state, unitId: payload };
    case actionTypes.setContractSigningDate:
      return { ...state, signingDate: payload };
    case actionTypes.setContractFirstCheckDate:
      return { ...state, firstCheckDate: payload };
    case actionTypes.setContractAmountOfChecksRecieved:
      return { ...state, amountOfChecksRecieved: payload };
    default:
      return state;
  }
}
