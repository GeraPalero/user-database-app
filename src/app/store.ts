import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./features/users/usersSlice";
import { toastsReducer } from "./features/toasts/toastsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    toasts: toastsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
