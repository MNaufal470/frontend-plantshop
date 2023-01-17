import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import categoryReducer from "./reducers/categoryReducer";
import chatReducer from "./reducers/chatReducer";
import recentlyReducer from "./reducers/recentlyReducer";
import userReducers from "./reducers/userReducers";
import wishlistReducer from "./reducers/wishlistReducer";
const store = configureStore({
  reducer: {
    userInfo: userReducers,
    categories: categoryReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    recently: recentlyReducer,
    chat: chatReducer,
  },
});

export default store;
