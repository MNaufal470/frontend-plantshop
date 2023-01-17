import { createSlice } from "@reduxjs/toolkit";

let initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], cartSubtotal: 0, itemsCount: 0 };

const cartReducer = createSlice({
  name: "cart",
  initialState: { ...initialState },
  reducers: {
    addItem(state, action) {
      let payload = action.payload;
      let quantity = payload.quantity;
      let item = payload.item;
      if (state.cartItems.length === 0) {
        state.cartItems = [{ ...item, amount: quantity }];
        state.cartSubtotal = quantity * item.price;
        state.itemsCount = 1;
        localStorage.setItem("cart", JSON.stringify(state));
      } else {
        let existedItemIndex = state.cartItems.findIndex(
          (product) => product._id === item._id
        );

        let updatedProducts;
        let SubtotalPrice;
        let totalCount;
        if (existedItemIndex !== -1) {
          let existedProduct = state.cartItems[existedItemIndex];

          const updateProduct = {
            ...existedProduct,
            amount: existedProduct.amount + quantity,
          };
          updatedProducts = [...state.cartItems];
          updatedProducts[existedItemIndex] = updateProduct;
          SubtotalPrice = state.cartSubtotal + updateProduct.price * quantity;
          totalCount = state.itemsCount;
        } else {
          updatedProducts = state.cartItems.concat({
            ...item,
            amount: quantity,
          });
          SubtotalPrice = state.cartSubtotal + item.price * quantity;
          totalCount = state.itemsCount + 1;
        }
        state.cartItems = updatedProducts;
        state.cartSubtotal = SubtotalPrice;
        state.itemsCount = totalCount;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    decreaseItem(state, action) {
      let item = action.payload.item;
      let FindIndexItem = state.cartItems.findIndex(
        (product) => item._id === product._id
      );
      let updatedProduct = [...state.cartItems];
      let existedProduct = state.cartItems[FindIndexItem];
      let updateProduct = {
        ...existedProduct,
        amount: existedProduct.amount - 1,
      };
      updatedProduct[FindIndexItem] = updateProduct;
      state.cartItems = updatedProduct;
      state.cartSubtotal = state.cartSubtotal - item.price;
      state.itemsCount = state.itemsCount;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem(state, action) {
      let item = action.payload.item;
      let product = state.cartItems.find((product) => product._id === item._id);
      let total = state.cartSubtotal - product.price * product.amount;
      let itemsCount = state.itemsCount - 1;
      state.cartItems = state.cartItems.filter(
        (product) => product._id !== item._id
      );
      state.cartSubtotal = total;
      state.itemsCount = itemsCount;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    emptyCart(state, action) {
      state.cartItems = [];
      state.cartSubtotal = 0;
      state.itemsCount = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const cartReducerActions = cartReducer.actions;
export default cartReducer.reducer;
