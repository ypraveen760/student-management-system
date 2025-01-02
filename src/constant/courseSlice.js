import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const initialState = localStorage.getItem("course");
    return initialState ? JSON.parse(initialState) : [];
  } catch (err) {
    console.error("Coud not load from local storage", err.message);
    return [];
  }
};

export const saveToLocalStorage = (state) => {
  try {
    const initialState = JSON.stringify(state);
    localStorage.setItem("course", initialState);
  } catch (err) {
    console.error("Coudnt save to local Storage", err);
  }
};

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    course: loadFromLocalStorage(),
  },
  reducers: {
    addCourse: (state, action) => {
      const { courseType, course } = action.payload;
      state.course.push({ courseType, course });
      saveToLocalStorage(state.course);
    },
    updateCourse: (state, action) => {
      const { index, updatedCourse } = action.payload;

      state.course[index] = updatedCourse;
      saveToLocalStorage(state.course);
    },
    removeCourse: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.course.length) {
        state.course.splice(index, 1);
        saveToLocalStorage(state.course);
      }
    },
  },
});

export const { addCourse, updateCourse, removeCourse } = courseSlice.actions;
export default courseSlice.reducer;
