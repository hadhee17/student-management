import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(USERS_URL);
    return response.data.slice(0, 7).map((user) => ({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone.split(" ")[0],
    }));
  }
);

const initialState = {
  list: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare({ name, email, phone }) {
        return {
          payload: { id: nanoid(), name, email, phone },
        };
      },
    },
    updateStudent(state, action) {
      const { id, name, email, phone } = action.payload;
      const existingStudent = state.list.find((student) => student.id === id);
      if (existingStudent) {
        existingStudent.name = name;
        existingStudent.email = email;
        existingStudent.phone = phone;
      }
    },
    deleteStudent(state, action) {
      const { id } = action.payload;
      state.list = state.list.filter((student) => student.id !== id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addStudent, updateStudent, deleteStudent } =
  studentsSlice.actions;

export const selectAllStudents = (state) => state.students.list;
export const selectStudentById = (state, studentId) =>
  state.students.list.find((student) => student.id === studentId);

export default studentsSlice.reducer;
