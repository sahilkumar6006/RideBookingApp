import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  type: 'Alert' | 'Message' | null;
  message: string | null;
  isVisible: boolean;
  onSuccess?: () => void;
}

const initialState: AlertState = {
  type: null,
  message: null,
  isVisible: false,
  onSuccess: undefined,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Omit<AlertState, 'isVisible'>>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.onSuccess = action.payload.onSuccess;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.type = null;
      state.message = null;
      state.onSuccess = undefined;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer; 