import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user-slice";
import projectsSlice from "./projects-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    projects: projectsSlice.reducer,
  },
});

export default store;
