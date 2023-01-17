import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const getCategories = async () => {
//   const { data } = await axios.get("/api/categories");
//   localStorage.setItem("categories", JSON.stringify(data));
//   return data;
// };

// let initialState = localStorage.getItem("categories")
//   ? JSON.parse(localStorage.getItem("categories"))
//   : getCategories();

const categories = createSlice({
  name: "categories",
  initialState: { categories: [], loading: false },
  reducers: {
    getCategories(state, action) {
      state.categories = action.payload;
    },
    changeLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
export const categoriesAction = categories.actions;
export default categories.reducer;
