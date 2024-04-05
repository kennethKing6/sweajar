import * as type from "../types/newViolationTypes";

const data = {
  newReportAction: type.NEW_SWEARJAR_TYPE, // Default state of the
};

/**
 *
 * @param {object} state
 * @param {object} action
 * @param {string} action.type
 * @param {string} action.data
 */
export const newReportReducer = (state = data, action) => {
  switch (action.type) {
    case type.NEW_SWEARJAR_TYPE:
      const swearjarState = { ...data, newReportAction: action.data };
      state = swearjarState;
      break;
    case type.NEW_CATEGORY_TYPE:
      const categoryState = { ...data, newReportAction: action.data };
      state = categoryState;
      break;
    case type.NEW_VIOLATION_TYPE:
      const violationState = { ...data, newReportAction: action.data };
      state = violationState;
      break;
    default:
      return data;
  }
  return state;
};
