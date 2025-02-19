import { createSlice } from '@reduxjs/toolkit';

interface ActivityIndicatorState {
  isLoading: boolean;
  buttonLoading: boolean;
}

const initialState: ActivityIndicatorState = {
  isLoading: false,
  buttonLoading: false,
};

const activityIndicatorSlice = createSlice({
  name: 'activityIndicator',
  initialState,
  reducers: {
    startLoader: (state) => {
      state.isLoading = true;
    },
    stopLoader: (state) => {
      state.isLoading = false;
      state.buttonLoading = false;
    },
    buttonLoader: (state) => {
      state.buttonLoading = true;
    },
  },
});

export const { startLoader, stopLoader, buttonLoader } = activityIndicatorSlice.actions;
export default activityIndicatorSlice.reducer; 