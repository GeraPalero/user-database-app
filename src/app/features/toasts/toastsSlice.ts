import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Toast = {
  id: number;
  type: "successful" | "error" | "warning";
  message: string;
  duration: number;
  timeOutId: number | null;
};

type ToastsState = {
  queue: Toast[];
  quantity: number;
};

const initialState: ToastsState = {
  queue: [],
  quantity: 0,
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.queue.push(action.payload);
      state.quantity += 1;
    },
    removeToast: (state, action: PayloadAction<number>) => {
      state.queue.filter((toast) => toast.id != action.payload);
      state.quantity -= 1;
    },
    setTimeOutID: (state, action: PayloadAction<{ id: number; timeOutId: number }>) => {
      state.queue.map((toast) => {
        if (toast.id === action.payload.id) {
          return {
            ...toast,
            timeOutId: action.payload.timeOutId,
          };
        } else {
          return toast;
        }
      });
    },
  },
});

export const toastsReducer = toastsSlice.reducer;
export const toastsActions = toastsSlice.actions;
