import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messageList: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messageList = action.payload;
    },
    addMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
  },
});

export const { setMessages,addMessage } = messageSlice.actions;
export default messageSlice.reducer;
