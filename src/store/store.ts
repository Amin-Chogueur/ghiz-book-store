import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/bookSlices";
import categoriesReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoriesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
