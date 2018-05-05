import { Map } from "immutable";
import * as _ from "lodash";
import { actionTypes } from "../actions/tenantForm";

const emptyContact = {
  name: "",
  role: "",
  phone: "",
  email: ""
};
const initialState = {
  tenant: {
    isBusiness: true,
    name: "",
    idNum: "",
    type: "",
    comments: "",
    contacts: Map().set(_.uniqueId(), emptyContact)
  }
};

export function TenantFormReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.setTenantIsBusiness:
      return { ...state, tenant: { ...state.tenant, isBusiness: payload } };
    case actionTypes.setTenantName:
      return { ...state, tenant: { ...state.tenant, name: payload } };
    case actionTypes.setTenantNum:
      return { ...state, tenant: { ...state.tenant, idNum: payload } };
    case actionTypes.setTenantType:
      return { ...state, tenant: { ...state.tenant, type: payload } };
    case actionTypes.setTenantComments:
      return { ...state, tenant: { ...state.tenant, comments: payload } };

    case actionTypes.addContact:
      return {
        ...state,
        tenant: {
          ...state.tenant,
          contacts: state.tenant.contacts.set(_.uniqueId(), { ...emptyContact })
        }
      };

    case actionTypes.setContactName:
      return changeContactProperties(state, payload.contactId, {
        name: payload.value
      });
    case actionTypes.setContactRole:
      return changeContactProperties(state, payload.contactId, {
        role: payload.value
      });
    case actionTypes.setContactPhone:
      return changeContactProperties(state, payload.contactId, {
        phone: payload.value
      });
    case actionTypes.setContactEmail:
      return changeContactProperties(state, payload.contactId, {
        email: payload.value
      });

    case actionTypes.removeContact:
      return {
        ...state,
        tenant: {
          ...state.tenant,
          contacts: state.tenant.contacts.delete(payload)
        }
      };
    default:
      return state;
  }
}

const changeContactProperties = (state, contactId, props) => {
  const contact = state.tenant.contacts.get(contactId);
  const contacts = state.tenant.contacts.set(contactId, {
    ...contact,
    ...props
  });
  return { ...state, tenant: { ...state.tenant, contacts } };
};
