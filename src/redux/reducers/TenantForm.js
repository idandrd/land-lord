import { actionTypes } from "../../actions/tenantForm";

const initialState = {
  tenantIsBusiness: true,
  tenantName: "",
  tenantNum: "",
  tenantType: "",
  tenantComments: ""
};

export function TenantFormReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setTenantIsBusiness:
      return { ...state, tenantIsBusiness: action.payload };
    case actionTypes.setTenantName:
      return { ...state, tenantName: action.payload };
    case actionTypes.setTenantNum:
      return { ...state, tenantNum: action.payload };
    case actionTypes.setTenantType:
      return { ...state, tenantType: action.payload };
    case actionTypes.setTenantComments:
      return { ...state, tenantComments: action.payload };
    default:
      return state;
  }
}
