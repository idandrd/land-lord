export const actionTypes = {
  saveOwner: "SAVE_OWNER",
  saveOwnerDone: "SAVE_OWNER_DONE",
  saveOwnerFailed: "SAVE_OWNER_FAILED"
};

export const FormActions = {
  saveOwner: owner => ({ type: actionTypes.saveOwner, payload: owner }),
  saveOwnerDone: () => ({ type: actionTypes.saveOwnerDone }),
  saveOwnerFailed: err => ({
    type: actionTypes.saveOwnerFailed,
    payload: err
  })
};
