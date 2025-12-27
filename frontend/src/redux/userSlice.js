import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: null,
    selectedUser: null,
    activeUsers: [],
    typingUsers: [],
    loading: true,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
      state.loading = false;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.loading = false;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    setTypingUser: (state, action) => {
      if (!state.typingUsers.includes(action.payload)) {
        state.typingUsers.push(action.payload);
      }
    },
    removeTypingUser: (state, action) => {
      state.typingUsers = state.typingUsers.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  setUserData,
  setOtherUsers,
  setSelectedUser,
  setActiveUsers,
  setTypingUser,
  removeTypingUser,
} = userSlice.actions;
export default userSlice.reducer;
