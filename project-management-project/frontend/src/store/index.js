import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user-slice";
import projectsSlice from "./projects-slice";
import activitySlice from "./activity-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    projects: projectsSlice.reducer,
    activities: activitySlice.reducer,
  },
});

export default store;
