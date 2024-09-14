import { User } from "../../../model/User";
import { reduxStore } from "../reduxStore";
import * as type from "../types/newViolationTypes";

export class NewReportReduxActions {
  /**
   *
   * @param {User} user
   */
  static addCustomViolation() {
    reduxStore.dispatch({
      type: type.NEW_VIOLATION_TYPE,
      data: type.NEW_VIOLATION_TYPE,
    });
  }
  static selectFromCategoryViolation() {
    reduxStore.dispatch({
      type: type.NEW_CATEGORY_TYPE,
      data: type.NEW_CATEGORY_TYPE,
    });
  }
  static selectSwearjar() {
    reduxStore.dispatch({
      type: type.NEW_SWEARJAR_TYPE,
      data: type.NEW_SWEARJAR_TYPE,
    });
  }
  /**
   *
   * @returns {"new_report/violation" | "new_report/category" | "new_report/swearjar"}
   */
  static getNewReportActionState() {
    return reduxStore.getState().newReportStore.newReportAction;
  }
}
