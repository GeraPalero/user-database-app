import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Toast = {
  id: number;
  type: "successfull" | "error" | "warning";
  message: string;
  duration: number;
  timeOutId: number | null;
};

export type ToastPayload = {
  type: "successfull" | "error" | "warning";
  message: string;
  duration: number;
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
    addToast: (state, action: PayloadAction<ToastPayload>) => {
      const newToast: Toast = {
        ...action.payload,
        id: Date.now(),
        timeOutId: null,
      };
      state.queue.push(newToast);
      state.quantity += 1;
    },
    removeToast: (state, action: PayloadAction<number>) => {
      state.queue = state.queue.filter((toast) => toast.id != action.payload);
      state.quantity -= 1;
    },
    setTimeOutID: (state, action: PayloadAction<{ id: number; timeOutId: number }>) => {
      state.queue = state.queue.map((toast) => {
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
    removeTimeOutID: (state, action: PayloadAction<number>) => {
      state.queue = state.queue.map((toast) => {
        if (toast.id === action.payload) {
          return {
            ...toast,
            timeOutId: null,
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
