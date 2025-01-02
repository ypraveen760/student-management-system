import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import passwordReducer from "./passwordSlice";
import studentReducer from "./studentSlice";

const store = configureStore({
  reducer: {
    course: courseReducer,
    password: passwordReducer,
    students: studentReducer,
  },
});

export default store;
