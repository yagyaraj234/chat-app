import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  username: null,
  messages: [],
  selectedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.status = true;
      state.username = action.payload;
    },
    setMessages: (state, action) => {
      const message = action.payload;
      state.messages=message;
    },
    setFriend: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setUser, setMessages, setFriend } = authSlice.actions;
