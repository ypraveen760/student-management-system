import { createSlice } from "@reduxjs/toolkit";

const saveToLocal = (state) => {
  try {
    const initialState = JSON.stringify(state);
    localStorage.setItem("students", initialState);
  } catch (err) {
    console.error("Coudnt save to local Storage", err);
  }
};

const loadFromLocal = () => {
  try {
    const initialState = localStorage.getItem("students");
    return initialState ? JSON.parse(initialState) : [];
  } catch (err) {
    console.error("Coud not load from local storage", err.message);
    return [];
  }
};

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: loadFromLocal(),
  },
  reducers: {
    addStudent: (state, action) => {
      const { name, email, dob, gender, courseType, course } = action.payload;
      state.students.push({ name, email, dob, gender, courseType, course });
      saveToLocal(state.students);
    },
    removeStudent: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.students.length) {
        state.students.splice(index, 1);
        saveToLocal(state.course);
      }
    },
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;
export default studentSlice.reducer;
