import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/bookSlices";
import categoriesReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
