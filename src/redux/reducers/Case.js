import { actionTypes } from "../actions/app";

const initialState = {
  tenants: [],
  assets: [],
  contracts: []
};

export function CaseReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.tenantsSnapshotRecieved:
      return { ...state, tenants: payload };
    case actionTypes.assetsSnapshotRecieved:
      return { ...state, assets: payload };
    case actionTypes.contractsSnapshotRecieved:
      return { ...state, contracts: payload };
    default:
      return state;
  }
}

const getElementById = elementName => (state, id) =>
  state[elementName].find(element => element.id === id);

export class CaseSelectors {
  static getTenant = getElementById("tenants");
  static getAsset = getElementById("assets");
  static getContract = getElementById("contracts");
  static getPopulatedContracts = state => {
    const populated = state.contracts.map(contract => ({
      ...contract,
      asset: CaseSelectors.getAsset(state, contract.assetId),
      tenant: CaseSelectors.getTenant(state, contract.tenantId)
    }));
  };
}
