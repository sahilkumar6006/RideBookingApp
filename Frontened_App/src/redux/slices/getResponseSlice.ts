import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GetResponseState {
  [key: string]: any;
}

const initialState: GetResponseState = {};

const getResponseSlice = createSlice({
  name: 'getResponse',
  initialState,
  reducers: {
    addGetResponse: (
      state,
      action: PayloadAction<{ path: string; response: any }>
    ) => {
      const { path, response } = action.payload;
      state[path] = response;
    },
    clearGetResponse: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    clearAllGetResponses: () => initialState,
  },
});

export const { addGetResponse, clearGetResponse, clearAllGetResponses } =
  getResponseSlice.actions;
export default getResponseSlice.reducer; 