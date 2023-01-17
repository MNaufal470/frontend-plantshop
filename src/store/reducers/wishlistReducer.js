import { createSlice, current } from "@reduxjs/toolkit";

let initialState = localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : { wishlist: [] };

const wishlistReducer = createSlice({
  name: "wishlist",
  initialState: { ...initialState },
  reducers: {
    WishlistTrigger(state, action) {
      let item = action.payload.item;
      if (state.wishlist.length === 0) {
        state.wishlist = [
          { ...item, addDate: new Date().toISOString().split("T")[0] },
        ];
        localStorage.setItem("wishlist", JSON.stringify(state));
      } else {
        let updatedProduct;
        let findIndex = current(state.wishlist).findIndex(
          (product) => product._id === item._id
        );
        if (findIndex !== -1) {
          updatedProduct = current(state.wishlist).filter(
            (product) => product._id !== item._id
          );
        } else {
          updatedProduct = current(state.wishlist).concat({
            ...item,
            addDate: new Date().toISOString().split("T")[0],
          });
        }
        state.wishlist = updatedProduct;
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
  },
});

export const wishlistActions = wishlistReducer.actions;
export default wishlistReducer.reducer;
