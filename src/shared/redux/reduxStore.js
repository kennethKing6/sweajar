import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { newReportReducer } from "./reducers/newReportReducer";

export const reduxStore = configureStore({
  reducer: {
    userStore: userReducer,
    newReportStore: newReportReducer,
  },
});
