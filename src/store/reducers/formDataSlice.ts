import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubmitForm } from '../../types/types';

type InitialState = { data: SubmitForm[] };

const initialState: InitialState = { data: [] };

export const dataSlice = createSlice({
  name: 'FormData',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<SubmitForm>) {
      state.data.push(action.payload);
    },
  },
});

export default dataSlice.reducer;
export const { setData } = dataSlice.actions;
