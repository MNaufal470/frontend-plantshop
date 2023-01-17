import { createSlice } from "@reduxjs/toolkit";

let initialState = localStorage.getItem("recently")
  ? JSON.parse(localStorage.getItem("recently"))
  : { recently: [] };
const recentlyReducer = createSlice({
  name: "recently",
  initialState: { ...initialState },
  reducers: {
    triggerRecently(state, action) {
      let item = action.payload.item;
      if (state.recently.length === 0) {
        state.recently = [item];
        localStorage.setItem("recently", JSON.stringify(state));
      } else {
        let findIndex = state.recently.findIndex(
          (product) => product._id === item._id
        );
        if (findIndex !== -1) {
          state.recently = state.recently;
          localStorage.setItem("recently", JSON.stringify(state));
        } else {
          if (state.recently.length === 4) {
            state.recently.pop();
            state.recently = state.recently.concat(item);
            localStorage.setItem("recently", JSON.stringify(state));
          } else {
            state.recently = state.recently.concat(item);
            localStorage.setItem("recently", JSON.stringify(state));
          }
        }
      }
    },
  },
});

export const recentlyActions = recentlyReducer.actions;
export default recentlyReducer.reducer;
