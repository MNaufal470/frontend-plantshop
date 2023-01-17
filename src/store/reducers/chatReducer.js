import { createSlice } from "@reduxjs/toolkit";

const chatReducer = createSlice({
  name: "chat",
  initialState: { chatRooms: {}, socket: false, receive: false },
  reducers: {
    setChatRooms(state, action) {
      let currentState = { ...state.chatRooms };
      if (state.chatRooms[action.payload.user]) {
        currentState[action.payload.user].push({
          client: action.payload.message,
        });
        state.chatRooms = {
          ...currentState,
        };
        return;
      } else {
        state.chatRooms = {
          ...currentState,
          [action.payload.user]: [{ client: action.payload.message }],
        };
        return;
      }
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setReceive(state, action) {
      state.receive = true;
    },
    offReceive(state, action) {
      state.receive = false;
    },
    removeChatroom(state, action) {
      state.chatRooms = delete state.chatRooms[action.payload.socketId];
    },
  },
});

export const chatAction = chatReducer.actions;
export default chatReducer.reducer;
