import * as type from '../types/userTypes';

const data = {
    signedUser:null
};

/**
 *
 * @param {object} state
 * @param {object} action
 * @param {string} action.type
 * @param {string} action.data
 */
export const userReducer = (state = data, action) => {
  switch (action.type) {
    case type.SAVE_SIGNED_IN_USER:
      const currentState = {...data, signedUser: action.data};
      state = currentState;
      break;
    default:
      return data;
  }
  return state;
};
