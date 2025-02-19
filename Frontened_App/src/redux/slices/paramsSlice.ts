import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParamsState {
  params: any;
}

const initialState: ParamsState = {
  params: null,
};

const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    addParams: (state, action: PayloadAction<any>) => {
      state.params = action.payload;
    },
    clearParams: (state) => {
      state.params = null;
    },
  },
});

export const { addParams, clearParams } = paramsSlice.actions;
export default paramsSlice.reducer; 