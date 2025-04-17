import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user-slice";
import projectsSlice from "./projects-slice";
import activityReducer from "./activity-slice";
import workspaceSlice from "./worskpace-slice";
import notificationReducer from "./notification-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    projects: projectsSlice.reducer,
    activities: activityReducer,
    workspaces: workspaceSlice.reducer,
    notifications: notificationReducer,
  },
});

export default store;
